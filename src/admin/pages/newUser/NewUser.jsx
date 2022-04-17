import "./newUser.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

export default function NewUser() {
  return (
    <div >
         <Navbar/>
         <div className="container">
            <AdminSidebar /> 
            <div className="newUser">
              <h1 className="newUserTitle">Nuevo Usuario</h1>
              <form className="newUserForm">
                <div className="newUserItem">
                  <label>Nombre</label>
                  <input type="text" placeholder="nombre" />
                </div>
                <div className="newUserItem">
                  <label>apellido</label>
                  <input type="text" placeholder="apellido" />
                </div>
                <div className="newUserItem">
                  <label>nombre de usuario</label>
                  <input type="text" placeholder="nombre de usuario" />
                </div>
                <div className="newUserItem">
                  <label>Email</label>
                  <input type="email" placeholder="xxxx@xxxxx.com" />
                </div>
                <div className="newUserItem">
                  <label>Contraseña</label>
                  <input type="password" placeholder="password" />
                </div>
                <div className="newUserItem">
                  <label>confirmar contraseña</label>
                  <input type="text" placeholder="********" />
                </div>
                <button className="newUserButton">Crear</button>
              </form>
             </div>
       </div>
    </div>
  );
}
