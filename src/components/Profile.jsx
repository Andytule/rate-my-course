import React from 'react'
import { useNavigate } from "react-router-dom";
import Session from 'react-session-api'

const Profile = () => {
    const navigate = useNavigate();
    if (Session.get('id') === undefined) {
        navigate('/Login')
    }

    return (
        <div>
            Profile
        </div>
    )
}

export default Profile