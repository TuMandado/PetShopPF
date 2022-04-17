import "./publicPets.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

const PublicPets = () =>{

  return (
    <div >
      <Navbar/>
      <div className="container">
         <AdminSidebar /> 
      </div>
    </div>
  )
        
}

export default PublicPets 