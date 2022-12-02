import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Surveys = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate('/')
        }
    })

    return (
        <div>
            Surveys
        </div>
    )
}

export default Surveys