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
import { toast } from "react-toastify";
import apiBaseUrl from "apiConfig";

/**
 * Comparator function for sorting an array of objects in descending order.
 *
 * @param {Object} a - The first object for comparison.
 * @param {Object} b - The second object for comparison.
 * @param {string} orderBy - The property to sort by.
 * @returns {number} - Result of the comparison.
 */
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

/**
 * Gets the comparator function based on the order and orderBy parameters.
 *
 * @param {string} order - The sorting order ('asc' or 'desc').
 * @param {string} orderBy - The property to sort by.
 * @returns {Function} - Comparator function.
 */
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Stabilizes the sorting of an array by preserving the original order of equal elements.
 *
 * @param {Array} array - The array to stabilize.
 * @param {Function} comparator - The comparator function.
 * @returns {Array} - The stabilized array.
 */
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

/**
 * Defines the head cells for the table, including sorting functionality.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered component.
 */
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

/**
 * Prop types for the EnhancedTableHead component.
 *
 * @type {Object}
 */
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

/**
 * Toolbar component for the table, including a search input.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered component.
 */
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

/**
 * Prop types for the EnhancedTableToolbar component.
 *
 * @type {Object}
 */
EnhancedTableToolbar.propTypes = {};

/**
 * React component for displaying and managing course ratings.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const ViewRatings = () => {
    const navigate = useNavigate();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState(-1);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ratingData, setRatingData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    /**
     * Effect hook to check if the user is authenticated. Redirects to the login page if not.
     */
    useEffect(() => {
        if (!sessionStorage.getItem('id')) {
            navigate('/');
        }
    }, []);

    /**
     * Effect hook to fetch ratings data on component mount.
     */
    useEffect(() => {
        getRatings();
    }, []);

    /**
     * Fetches course ratings data from the API and sets the state accordingly.
     */
    const getRatings = () => {
        axios.get(`${apiBaseUrl}/getRatings.php`).then((res) => {
            if (res.data.status === 1) {
                setRatingData(res.data.data.reverse());
                setFilteredData(res.data.data.reverse());

                // Display success toast
                toast.success('Course ratings fetched successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else {
                // Display error toast
                toast.error('Failed to fetch course ratings', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        });
    };

    /**
     * Handles the request to sort the table based on a specific property.
     *
     * @param {Event} event - The event that triggered the sorting request.
     * @param {string} property - The property to sort by.
     */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /**
     * Handles the click event on a table row, selecting or deselecting it.
     *
     * @param {Event} event - The event that triggered the click.
     * @param {number} id - The ID of the clicked row.
     */
    const handleClick = (event, id) => {
        if (id === selected) {
            setSelected(-1);
        } else {
            setSelected(id);
        }
    };

    /**
     * Handles the change in the current page when paginating through the table.
     *
     * @param {Event} event - The event that triggered the page change.
     * @param {number} newPage - The new page number.
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    /**
     * Handles the change in the number of rows per page.
     *
     * @param {Event} event - The event that triggered the change in rows per page.
     */
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /**
     * Handles the change in dense padding for table rows.
     *
     * @param {Event} event - The event that triggered the change in dense padding.
     */
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    /**
     * Handles the edit action for a selected row, navigating to the edit page.
     *
     * @param {Event} event - The event that triggered the edit action.
     */
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
            // Display error toast
            toast.error('Cannot edit this rating', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    /**
     * Handles the delete action for a selected row, sending a request to delete the rating.
     *
     * @param {Event} event - The event that triggered the delete action.
     */
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
            axios.delete(`${apiBaseUrl}/deleteRating.php/${selected}`).then((res) => {
                if (res.data.status) {
                    // Display success toast
                    toast.success('Deleted Rating', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    getRatings();
                } else {
                    // Display error toast for failed deletion
                    toast.error('Failed to delete Rating', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            });
        } else {
            // Display error toast for unauthorized deletion
            toast.error('Cannot Delete this rating', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    /**
     * Checks if a row is selected based on its ID.
     *
     * @param {number} id - The ID of the row to check.
     * @returns {boolean} - True if the row is selected, otherwise false.
     */
    const isSelected = (id) => selected === id;

    /**
     * Handles the search action, filtering the table data based on the search term.
     *
     * @param {string} searchTerm - The term to search for.
     */
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);

        const filtered = ratingData.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        setFilteredData(filtered);
    };

    /**
     * Determines the data to display in the table, either the filtered data or all data.
     */
    const rowsToDisplay = searchTerm ? filteredData : ratingData;

    /**
     * Calculates the number of empty rows to add to the table to maintain consistent height.
     */
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
        </Box>
    );
};

export default ViewRatings;

