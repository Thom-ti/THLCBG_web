import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/UserNavbar'

const UserLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <UserNavbar />
        <div className="flex-1 min-h-0 overflow-auto justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout