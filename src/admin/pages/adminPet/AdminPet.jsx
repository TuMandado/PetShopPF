import React, { useEffect } from "react"
import Navbar from '../../../components/navbar/Navbar'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import PetDetails from '../../../components/petDetails/petDetails'
import { useSelector } from "react-redux"

const AdminPet = () => {
  const user = useSelector((state) => state.clientReducer.user);
  // If user role is not Admin, redirect to the home page
  useEffect(() => {
    console.log("user :",user);
    if (user && Object.keys(user).length > 0 && user.role !== "Admin") {
      window.location.href = "/";
    }
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);
  return (
    <div>
       <Navbar/>
        <div className="container">
          <AdminSidebar /> 
          <div>
            <PetDetails />
          </div>
        </div>
    </div>
  )
}

export default AdminPet

