import React from 'react'

const ErrorMessage = ({ message, type = "error" }) => {

	if (!message) return null;

	const colors = {
	  error: "bg-red-100 text-red-700 border-red-400",
	  warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
	  info: "bg-blue-100 text-blue-700 border-blue-400",
	  success: "bg-green-100 text-green-700 border-green-400",
	};
  
  return (
	<div className={`mt-2 p-3 border rounded-md ${colors[type]}`}>
		{message}
  	</div>

  )
}

export default ErrorMessage