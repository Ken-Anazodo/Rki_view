import React from 'react'
import Navbar from '../components/Navbar';
import Login_SignUp_Content from '../components/Login_SignUp_Content'
import Footer from '../components/Footer';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  return (
	<div className='login-container h-full w-screen'>
      <div className="grid grid-rows-[50px_1fr_auto] h-full w-full">
        <Navbar />
        <Login_SignUp_Content form={<SignUpForm />} bgImg='bg-[url(/src/assets/images/img1.jpg)]'/>
        <Footer />
      </div>
  </div>
  )
}

export default SignUp