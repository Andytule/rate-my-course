import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

const RateACourse = () => {
    const navigate = useNavigate();
    const [hover, setHover] = React.useState(-1);
    const [details, setDetails] = useState({ courseName: '', courseCode: '', term: '', level: '', rating: 0, schoolName: '', comments: '', tipsAndTricks: '' })

    if (Session.get('id') === undefined) {
        navigate('/Login')
    }

    useEffect(() => {
        console.log(details)
    }, [details])

    return (
        <div>
            <form>
                <TextField label='Course Name' margin='normal' variant='standard' onChange={e => setDetails({ ...details, courseName: e.target.value })} />
                <TextField label='Course Code' margin='normal' variant='standard' onChange={e => setDetails({ ...details, courseCode: e.target.value })} />

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

                <TextField label='Comments' id="standard-multiline-static" margin='normal' variant='standard' multiline rows={5} onChange={e => setDetails({ ...details, comments: e.target.value })} />
                <TextField label='Comments' id="standard-multiline-static" margin='normal' variant='standard' multiline rows={5} onChange={e => setDetails({ ...details, tipsAndTricks: e.target.value })} />
            </form>

        </div>
    )
}

export default RateACourse