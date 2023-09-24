import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Forums = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("id")) {
      navigate('/')
    }
  })
  return <div>Forums</div>
};

export default Forums
