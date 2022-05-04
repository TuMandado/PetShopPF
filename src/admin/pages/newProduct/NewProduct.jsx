import "./newProduct.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import ProductCreated from "../../../components/productCreated/ProductCreated";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function NewProduct() {
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
    <Navbar/>
    <div className="container">
       <AdminSidebar /> 
       <div className="petList">
          <ProductCreated/>
       </div>
    </div>
  </div>
  );
}
