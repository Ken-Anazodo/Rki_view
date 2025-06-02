import React, {useEffect} from 'react';
import { useAdminDashboardQuery } from '../services/adminAuthApi';

const Dashboard = () => {

  const { data, isSuccess } = useAdminDashboardQuery()

  useEffect(() => {
    if (isSuccess) console.log(data)
  
   
  }, [data, isSuccess])
  

  return (
	<div>Dashboard</div>
  )
}

export default Dashboard