import React from 'react'
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api'

const Surveys = () => {
    const navigate = useNavigate();
    if (Session.get('id') === undefined) {
        navigate('/Login')
    }

    return (
        <div>
            Surveys
        </div>
    )
}

export default Surveys