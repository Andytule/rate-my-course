import React from 'react'
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api'

const ViewRatings = () => {
    const navigate = useNavigate();
    if (Session.get('id') === undefined) {
        navigate('/Login')
    }

    return (
        <div>
            View Ratings
        </div>
    )
}

export default ViewRatings