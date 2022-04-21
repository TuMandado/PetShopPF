import "./newProduct.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import ProductCreated from "../../../components/productCreated/ProductCreated";

export default function NewProduct() {
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
