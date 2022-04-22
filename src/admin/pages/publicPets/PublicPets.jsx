import "./publicPets.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import PetCreated from "../../../components/petCreated/petCreated"

const PublicPets = () =>{

  return (
    <div >
      <Navbar/>
      <div className="container">
         <AdminSidebar /> 
         <div className="petList">
            <PetCreated/>
         </div>
      </div>
    </div>
  )
        
}

export default PublicPets 