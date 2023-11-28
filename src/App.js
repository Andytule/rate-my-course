import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Forums, Login, Navbar, Profile, RateACourse, Surveys, ViewRatings, EditACourse, CreateThread } from './components';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/rate-my-course' element={<Login />} />
          <Route path='RateACourse' element={<RateACourse />} />
          <Route path='ViewRatings' element={<ViewRatings />} />
          <Route path='Surveys' element={<Surveys />} />
          <Route path='Forums' element={<Forums />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='EditACourse' element={<EditACourse />} />
          <Route path='CreateThread' element={<CreateThread />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
