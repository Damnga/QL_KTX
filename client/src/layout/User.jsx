import React from 'react'
import Header_user from '../component/Header_user/Header_user';
import { Outlet } from 'react-router-dom';
const User = () => {
  return (
    <div>
        <Header_user />
        <Outlet/>
    </div>
  )
}

export default User