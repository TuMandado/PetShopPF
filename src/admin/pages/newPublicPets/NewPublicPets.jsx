import "./newPublicPets.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Pets from "../../../components/pets/Pets";

const NewPublicPets = () => {
  return (
    <div >
    <Navbar/>
    <div className="container">
       <AdminSidebar /> 
       <div className="petList">
          <Pets/>
       </div>
    </div>
  </div>
  )
}

export default NewPublicPets
