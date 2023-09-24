import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Surveys: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('id')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      Surveys
    </div>
  );
};

export default Surveys;
