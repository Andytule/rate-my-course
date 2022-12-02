import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Forums, Login, Navbar, Profile, RateACourse, Surveys, ViewRatings, EditACourse } from './components'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='RateACourse' element={<RateACourse />}/>
          <Route path='ViewRatings' element={<ViewRatings />}/>
          <Route path='Surveys' element={<Surveys />}/>
          <Route path='Forums' element={<Forums />}/>
          <Route path='Profile' element={<Profile />}/>
          <Route path='EditACourse' element={<EditACourse />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
