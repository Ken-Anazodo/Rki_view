import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RequireNoAuth from './components/auth/RequireNoAuth';
import { RequireAuth } from './components/auth/RequireAuth';
import { Navigate, Route, Routes} from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <div>
       <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />

          <Route element={<RequireNoAuth />}>
            <Route path="/login/" element={ <Login />} /> 
            <Route path="/signup/" element={ <SignUp />} /> 
          </Route>
    
          <Route element={<RequireAuth />}>
           <Route path="/Dashboard/" element={<Dashboard />} />
          </Route>
      </Routes>
    </div>
  )
}

export default App
