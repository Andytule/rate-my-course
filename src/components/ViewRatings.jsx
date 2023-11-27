import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'courseName',
        numeric: false,
        disablePadding: true,
        label: 'Course Name',
    },
    {
        id: 'courseCode',
        numeric: true,
        disablePadding: false,
        label: 'Course Code',
    },
    {
        id: 'term',
        numeric: true,
        disablePadding: false,
        label: 'Term',
    },
    {
        id: 'level',
        numeric: true,
        disablePadding: false,
        label: 'Level',
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Rating',
    },
    {
        id: 'schoolName',
        numeric: true,
        disablePadding: false,
        label: 'School Name',
    },
    {
        id: 'comments',
        numeric: true,
        disablePadding: false,
        label: 'Comments',
    },
    {
        id: 'tipsAndTricks',
        numeric: true,
        disablePadding: false,
        label: 'Tips & Tricks',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ onRequestSearch }) {
    const handleSearch = (event) => {
        onRequestSearch(event.target.value);
    };

    return (
        <Toolbar>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                Course Ratings
            </Typography>
            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <TextField label="Search" variant="outlined" onChange={handleSearch} />
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {};

const ViewRatings = () => {
    const navigate = useNavigate();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState(-1);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ratingData, setRatingData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        getRatings();
    }, []);

    const getRatings = () => {
        axios.get('http://localhost:80/api/getRatings.php').then((res) => {
            if (res.data.status === 1) {
                setRatingData(res.data.data.reverse());
                setFilteredData(res.data.data.reverse());
            } else {
                setMessage('Invalid Login Credentials');
                setOpen(true);
            }
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, id) => {
        if (id === selected) {
            setSelected(-1);
        } else {
            setSelected(id);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleEdit = (event) => {
        if (
            parseInt(sessionStorage.getItem('role_id')) === 2 ||
            (selected !== -1 &&
                ratingData.find(
                    (rating) =>
                        rating.creator_id === parseInt(sessionStorage.getItem('id')) &&
                        rating.id === selected
                ))
        ) {
            navigate('/EditACourse', {
                state: ratingData.find((rating) => rating.id === selected),
            });
        } else {
            setMessage('Cannot Edit this rating');
            setOpen(true);
        }
    };

    const handleDelete = (event) => {
        if (
            parseInt(sessionStorage.getItem('role_id')) === 2 ||
            (selected !== -1 &&
                ratingData.find(
                    (rating) =>
                        rating.creator_id === parseInt(sessionStorage.getItem('id')) &&
                        rating.id === selected
                ))
        ) {
            axios.delete(`http://localhost:80/api/deleteRating.php/${selected}`).then((res) => {
                if (res.data.status) {
                    setMessage('Deleted Rating');
                    setOpen(true);
                    getRatings();
                } else {
                    setMessage('Failed to delete Rating');
                    setOpen(true);
                }
            });
        } else {
            setMessage('Cannot Delete this rating');
            setOpen(true);
        }
    };

    const isSelected = (id) => selected === id;

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        const filtered = ratingData.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        setFilteredData(filtered);
    };

    const rowsToDisplay = searchTerm ? filteredData : ratingData;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsToDisplay.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar onRequestSearch={handleSearch} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rowsToDisplay.length}
                        />
                        <TableBody>
                            {stableSort(rowsToDisplay, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                                {selected === row.id && (
                                                    <>
                                                        {(parseInt(sessionStorage.getItem("role_id")) === 2 || (selected !== -1 && ratingData.find((rating) => rating.creator_id === parseInt(sessionStorage.getItem("id")) && rating.id === selected))) && (
                                                            <>
                                                                <Tooltip title="Edit">
                                                                    <IconButton onClick={(event) => handleEdit(event)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete">
                                                                    <IconButton onClick={(event) => handleDelete(event)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.course_name}
                                            </TableCell>
                                            <TableCell align="right">{row.course_code}</TableCell>
                                            <TableCell align="right">{row.term}</TableCell>
                                            <TableCell align="right">{row.level}</TableCell>
                                            <TableCell align="right">{row.rating}</TableCell>
                                            <TableCell align="right">{row.school_name}</TableCell>
                                            <TableCell align="right">{row.comments}</TableCell>
                                            <TableCell align="right">{row.tips_and_tricks}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowsToDisplay.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            />
        </Box>
    );
};

export default ViewRatings;

