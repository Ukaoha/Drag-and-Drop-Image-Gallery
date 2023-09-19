import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Pages/Auth/Registar';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import ResetPassword from './Pages/Auth/ResetPassword';
import ImageGallary from './Components/ImageGallery/ImageGallery';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route path='/imageGallary' element={<ImageGallary/>} />



      </Routes>


    </div>
  );
}

export default App;
