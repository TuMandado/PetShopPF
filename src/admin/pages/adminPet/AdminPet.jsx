import React from "react"
import Navbar from '../../../components/navbar/Navbar'
import AdminSidebar from '../../components/adminSidebar/AdminSidebar'
import PetDetails from '../../../components/petDetails/petDetails'

const AdminPet = () => {
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

