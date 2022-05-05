import "./newPublicPets.css";
import NavAdmin from "../../../components/navbar/NavAdmin";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Pets from "../../../components/pets/Pets";
import PetCreated from "../../../components/petCreated/petCreated";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const NewPublicPets = () => {
  const user = useSelector((state) => state.clientReducer.user);
  // If user role is not Admin, redirect to the home page
  useEffect(() => {
    console.log("user :",user);
    if (user && Object.keys(user).length > 0 && user.role.toLowerCase() !== "admin") {
      window.location.href = "/";
    }
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);
  return (
    <div >
    <NavAdmin/>
    <div className="container">
       <AdminSidebar /> 
       <div className="petList">
          <PetCreated/>
       </div>
    </div>
  </div>
  )
}

export default NewPublicPets
