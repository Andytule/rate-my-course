import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate('/')
        }
    })

    const logoutHandler = () => {
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("role_id")
        navigate('/')
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
                >Profile</Typography>
            </Grid>

            <Grid container justifyContent='center'>
                <br></br>
                <Button color='primary' variant='contained' onClick={logoutHandler}>
                    Logout
                </Button>
            </Grid>
        </>
    )
}

export default Profile