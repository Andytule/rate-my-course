import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const EditACourse = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [hover, setHover] = React.useState(-1);
    const [details, setDetails] = useState({ courseName: '', courseCode: '', term: '', level: '', rating: 0, schoolName: '', comments: '', tipsAndTricks: '' })
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate('/')
        }
    })


    useEffect(() => {
        if (location.state?.course_name === undefined) {
            navigate('/ViewRatings')
        } else {
            setDetails({
                courseName: location.state.course_name,
                courseCode: location.state.course_code,
                term: location.state.term,
                level: location.state.level,
                rating: location.state.rating / 2,
                schoolName: location.state.school_name,
                comments: location.state.comments,
                tipsAndTricks: location.state.tips_and_tricks,
            })
            setSelected(parseInt(location.state.id))
        }

    }, [location, navigate, selected])

    const updateCourseRating = () => {
        if (details.courseName && details.courseCode && details.term && details.level && details.schoolName && details.comments && details.tipsAndTricks) {
            const editingCourse = {
                ...details,
                id: selected
            }
            axios.delete(`https://king-prawn-app-vjz2f.ondigitalocean.app/deleteRating.php/${selected}`)
                .then((res) => {
                    if (res.data.status) {
                        axios.post('https://king-prawn-app-vjz2f.ondigitalocean.app/addReview.php', editingCourse)
                            .then((res) => {
                                if (res.data.status) {
                                    setDetails({ courseName: '', courseCode: '', term: '', level: '', rating: 0, schoolName: '', comments: '', tipsAndTricks: '' })
                                    navigate('/ViewRatings')
                                } else {
                                    setMessage('Failed to delete Rating')
                                    setOpen(true)
                                }
                            })
                    } else {
                        setMessage('Failed to delete Rating')
                        setOpen(true)
                    }
                })
        } else {
            setMessage('Invalid Feedback input')
        }
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const submitHandler = e => {
        e.preventDefault()
        updateCourseRating()
    }

    return (
        <>
            <Grid container justifyContent='center'>
                <Typography
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        color: "inherit",
                        textDecoration: "none",
                        fontFamily: "Roboto",
                        fontWeight: 400,
                        fontSize: '1.5rem',
                    }}
                    variant="h5"
                >Edit Course Feedback</Typography>
            </Grid>

            <form onSubmit={submitHandler}>
                <Grid alignItems='center' container justifyContent='center' columnSpacing={4}>
                    <Grid container direction='column' item justifyContent='center' xs={4}>
                        <TextField label='Course Name' margin='normal' variant='standard' value={details.courseName} onChange={e => setDetails({ ...details, courseName: e.target.value })} />
                        <TextField label='Course Code' margin='normal' variant='standard' value={details.courseCode} onChange={e => setDetails({ ...details, courseCode: e.target.value })} />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Term</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={details.term}
                                onChange={e => setDetails({ ...details, term: e.target.value })}
                                label="Term"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Fall 2022'}>Fall 2022</MenuItem>
                                <MenuItem value={'Winter 2023'}>Winter 2023</MenuItem>
                                <MenuItem value={'Spring 2023'}>Spring 2023</MenuItem>
                                <MenuItem value={'Summer 2023'}>Summer 2023</MenuItem>
                                <MenuItem value={'Fall 2023'}>Fall 2023</MenuItem>
                                <MenuItem value={'Winter 2024'}>Winter 2024</MenuItem>
                                <MenuItem value={'Spring 2024'}>Spring 2024</MenuItem>
                                <MenuItem value={'Summer 2024'}>Summer 2024</MenuItem>
                                <MenuItem value={'Fall 2024'}>Fall 2024</MenuItem>
                                <MenuItem value={'Winter 2025'}>Winter 2025</MenuItem>
                                <MenuItem value={'Spring 2025'}>Spring 2025</MenuItem>
                                <MenuItem value={'Summer 2025'}>Summer 2025</MenuItem>
                                <MenuItem value={'Fall 2025'}>Fall 2025</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={details.level}
                                onChange={e => setDetails({ ...details, level: e.target.value })}
                                label="Level"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'College'}>College</MenuItem>
                                <MenuItem value={'University'}>University</MenuItem>
                                <MenuItem value={'Other'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="hover-feedback"
                                value={details.rating}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(e, newValue) => setDetails({ ...details, rating: newValue })}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {details.rating !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : details.rating]}</Box>
                            )}
                        </Box>
                        <TextField label='School Name' margin='normal' variant='standard' value={details.schoolName} onChange={e => setDetails({ ...details, schoolName: e.target.value })} />
                    </Grid>
                    <Grid container direction='column' item justifyContent='center' xs={4}>
                        <TextField label='Comments' id="standard-multiline-static" margin='normal' variant='standard' value={details.comments} multiline rows={5} onChange={e => setDetails({ ...details, comments: e.target.value })} />
                        <TextField label='Tips & Tricks' id="standard-multiline-static" margin='normal' variant='standard' value={details.tipsAndTricks} multiline rows={5} onChange={e => setDetails({ ...details, tipsAndTricks: e.target.value })} />
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <br></br>
                    <Button color='primary' variant='contained' type='submit'>
                        Edit Feedback
                    </Button>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                />
            </form>
        </>
    )
}

export default EditACourse