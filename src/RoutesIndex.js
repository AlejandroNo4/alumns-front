import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import App from './App';
import LogIn from './components/LogIn';

const RoutesIndex = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default RoutesIndex;
