import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminSignUpMutation } from '../services/adminAuthApi';
import ErrorMessage from './ErrorMessage';
import "./Login_SignUp_Form.css";

const SignUpForm = () => {

	const navigate = useNavigate()
	const [adminSignUp, {isLoading, error, isSuccess}] = useAdminSignUpMutation();
	const [uploading, setUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [imageName, setImageName] = useState("");
	const [formInput, setFormInput] = useState({
		firstname: "",
		lastname: "",
		username: "",
		contactNo: "",
		email: "",
		image_url: "",
		password: "",
		confirmPassword: ""
	})



	const handleOnchange = (event) => {
		const {name, value} = event.currentTarget;
		setFormInput((prevFormInput)=> ({
			...prevFormInput,
			[name]: value
		}))
	}



	const getCloudImageNameForDisplay = (fileName) => {
		setImageName(fileName)
	}



	const optimizeImage = (url) => {
		const [baseUrl, fileName] = url.split('/upload/');
		getCloudImageNameForDisplay(fileName)
		return `${baseUrl}/upload/c_scale,w_auto,q_auto,f_auto/${fileName}`
	}



	const handleFileChange = async(e) => {
		const {files} = e.currentTarget
		let file = files[0]

		if (!file) return;

		setUploading(true);

		const cloudName = import.meta.env.VITE_CLOUD_NAME
		const preset = import.meta.env.VITE_PRESET


		const fileData = new FormData()
		fileData.append("file", file);
		fileData.append("upload_preset", preset);
		fileData.append("cloud_name", cloudName);

		try{
			const imgResp = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
				method: "POST",
				body: fileData
			})

			const result = await imgResp.json();

			if (result?.secure_url){
				const optimizedImg = optimizeImage(result?.secure_url)
				setFormInput((prevFormInput)=> ({
					...prevFormInput,
					image_url: optimizedImg
				}))
				setUploading(false);
			} else{
				console.error("Upload failed:", result);
				setErrorMessage("Image upload failed. Please try again.")
			}	

		} catch(error){
			setErrorMessage("Image upload failed. Please try again.")
			console.error("Image upload error:", error);
		} finally{
			setUploading(false);
		}
	}


	


	const handleSubmit = async(event) => {
		event.preventDefault();

		if(error){
			setErrorMessage(error.data.error)
			console.error(error.data.error)
		}
		
		if (uploading) {
			setErrorMessage("Please wait for the image to finish uploading.");
			return;
		  }
		  

		if (!formInput.image_url) {
			setErrorMessage("No Profile Image Uploaded")
			console.error("No Profile Image Uploaded")
			return;
		}
	
		try{
			await adminSignUp(formInput).unwrap();

			setFormInput({
				firstname: "",
				lastname: "",
				username: "",
				contactNo: "",
				email: "",
				image_url: "",
				password: "",
				confirmPassword: ""
			})

			setImageName("");
			setErrorMessage("");
		} catch (error){
			setErrorMessage(error.data?.error || "An error occurred during signup.")
			console.error("Error in Sign Up:", error)
		}
	}


	useEffect(() => {
	  if(isSuccess){
		navigate("/dashboard/")
	  }
	
	}, [isSuccess])
	


	

  return (
	<div className="container w-120 bg-stone-100 rounded-xl p-10 border border-zinc-900">
		<div className='formTitle capitalize'>
			<p className='text-5xl font-medium'>Sign Up</p>
		</div>

		{errorMessage && <p className='mt-3'>{ <ErrorMessage message={errorMessage} /> }</p>}

		<form onSubmit={handleSubmit} method='POST' className='mt-6'>
			<div className='flex justify-between gap-4'>
				<input type="text" name="firstname" onChange={handleOnchange} value={formInput.firstname} id="firstnamename" className="log login-input" placeholder="First name *"/>
				<input type="text" name="lastname" onChange={handleOnchange} value={formInput.lastname} id="lastname" className="log login-input" placeholder="Last name *"/>
			</div>

			<div className='flex justify-between gap-4'>
				<input type="text" name="username" onChange={handleOnchange} value={formInput.username} id="username" className="log login-input" autoComplete="username" placeholder="Username *"/>
				<input type="text" name="contactNo" onChange={handleOnchange} value={formInput.contactNo} id="contactNo" className="log login-input" placeholder="Contact Number *"/>
			</div>

			<div>
				<input type="email" name="email" onChange={handleOnchange} value={formInput.email} id="email" className="log login-input" placeholder="Email Address *"/>
			</div>

			<p className="upload-desc mt-8 py-1 bg-zinc-600 text-stone-100 w-38 rounded-2xl">We allow .jpg .png .jpeg</p>
			<div className='flex justify-between align-middle mt-2 w-full'>
				<div className="relative w-48 h-8">
					<button type="button" id='profileImgBtn' disabled={uploading} className="btn-upload w-full h-full bg-zinc-900 text-stone-100 rounded-2xl shadow-md hover:bg-stone-700 transition-colors">Upload Profile Picture</button>
					<input type="file" onChange={handleFileChange} id="profileImg" name='image_url' className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
				</div>

				<div className='w-48'>
					<a> {uploading && "uploading..."} </a>
				</div>
			</div>
			
			<div className='w-full mt-2'>
				<a id="fileName"> {imageName} </a>
			</div>
			


			<div className='flex justify-between gap-4 mt-3'>
				<input type="password" name="password" onChange={handleOnchange} value={formInput.password} id="password" className="log login-input" autoComplete="current-password" placeholder="Password *"/>
				<input type="password" name="confirmPassword" onChange={handleOnchange} value={formInput.confirmPassword} id="confirmPassword" className="log login-input" autoComplete="current-password" placeholder="Confirm Password *"/>
			</div>

			<button className="submit mt-15 text-center bg-zinc-900 text-stone-100 rounded-4xl uppercase cursor-pointer" type="submit" disabled={isLoading}>{isLoading? "Loading..." : "Sign Up"}</button>
		</form>

		<div className='form-txt w-full mt-7'>
				<p>You have an account?</p>
		</div>

		<Link to="/login/">
			<div>
				<p className='underline cursor-pointer'>Log In</p>
			</div>
		</Link>
		

	</div>
  )
}

export default SignUpForm