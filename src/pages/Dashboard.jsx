import React, {useEffect} from 'react';
import { useAdminDashboardQuery } from '../services/adminAuthApi';

const Dashboard = () => {

  const { data, isSuccess } = useAdminDashboardQuery()

  useEffect(() => {
    if (isSuccess) console.log(data)
  
   
  }, [data, isSuccess])
  

  return (
	  <div>
   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius pariatur, nam nesciunt neque a accusantium magni nobis libero at odio facere dolorem veritatis repudiandae sit, excepturi sapiente aut ullam quo!
    </div>
  )
}

export default Dashboard