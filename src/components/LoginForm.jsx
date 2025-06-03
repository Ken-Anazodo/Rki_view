import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Login_SignUp_Form.css";
import { useAdminLoginMutation } from '../services/adminAuthApi';
import { login } from '../features/auth/authentication';
import { useDispatch } from 'react-redux';
import ErrorMessage from './ErrorMessage';

const LoginForm = () => {

	const navigate = useNavigate()
	const [adminLogin, {isLoading, error, isSuccess}] = useAdminLoginMutation();
	const [errorMessage, setErrorMessage] = useState(null);
	const [formInput, setFormInput] = useState({
		username: "",
		password: ""
	})
	
	const dispatch = useDispatch()
	

	const handleOnChange = (event) => {
		const {name, value} = event.currentTarget;
		
		setFormInput((prevInput) => ({
			...prevInput,
			[name]:value
		}))
	}

	
	const handleSubmit = async(event) => {
		event.preventDefault();
		setErrorMessage(null);

		try{
			await adminLogin(formInput).unwrap();

			setFormInput({
				username: "",
				password: ""
			})

		}catch(error){
			setErrorMessage(error.data?.error || "An error occured in Log In");
		}
	}


	useEffect(() => {
		if (isSuccess){
			navigate("/dashboard/")
			dispatch(login())
		}
	  
	}, [isSuccess, navigate, dispatch])



  return (
	<div className="container w-120 bg-stone-100 rounded-xl p-12 border border-zinc-900">

		<div className='formTitle capitalize'>
			<p className='text-5xl font-medium'>Login</p>
		</div>

		{errorMessage && <div className='text-red-600 mt-3'> {<ErrorMessage message={errorMessage} />} </div> }

		<form onSubmit={handleSubmit} className='mt-9'>
			<div>
				<input onChange={handleOnChange} type="text" name="username" id="username" autoComplete="username" className="log login-input" placeholder="Username *" value={formInput.username} />
			</div>

			<div>
				<input onChange={handleOnChange} type="password" name="password" id="password" autoComplete="current-password" className="log login-input" placeholder="Password *" value={formInput.password}/>
			</div>

			<div className='form-txt w-full flex justify-end mt-2 cursor-pointer'>
				<p>Forgot your password?</p>
			</div>

			<div className="form-check mt-3 flex align-center ">
				<input type="checkbox" name="remember" id="remember" className="bg-transparent accent-zinc-800 mr-1" />
				<label htmlFor='remember' className="form-check-label">Remember Me</label>
			</div>

			<button className={`submit mt-15 text-center bg-zinc-900 text-stone-100 rounded-4xl uppercase cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}  disabled={isLoading} type="submit">{isLoading? "Loading..." : "Login"}</button>
		</form>

		<div className='form-txt w-full mt-7 cursor-pointer'>
				<p>You do not have an account?</p>
		</div>

		<Link to="/signup/">
			<div>
				<p className='underline cursor-pointer'>Sign Up</p>
			</div>
		</Link>

	</div>
  )
}

export default LoginForm