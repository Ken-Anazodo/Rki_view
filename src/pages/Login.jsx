import React from 'react';
import Navbar from '../components/Navbar';
import Login_SignUp_Content from '../components/Login_SignUp_Content';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
  return (
    <div className='login-container h-full w-screen'>
      <div className="grid grid-rows-[50px_1fr_auto] h-full w-full">
        <Navbar />
        <Login_SignUp_Content form={<LoginForm />} bgImg="bg-[url(/src/assets/images/img6.jpg)]"/>
        <Footer />
      </div>
  </div>
  )
}

export default Login