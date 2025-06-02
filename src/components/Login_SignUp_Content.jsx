import React from 'react';

const Login_SignUp_Content = ({form, bgImg}) => {
  return (
	<main className={`h-full w-full ${bgImg} grayscal bg-zinc-950 bg-cover bg-center bg-no-repeat flex justify-center items-center pt-18 pb-10`}>
		{form}
	</main>
  )
}

export default Login_SignUp_Content
