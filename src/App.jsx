import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Navigate, Route, Routes} from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div>
       <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login/" element={ <Login />} /> 
          <Route path="/signup/" element={ <SignUp />} /> 
          <Route path="/Dashboard/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
