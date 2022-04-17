import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./user.css";
import { userRows } from "../../dummyData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";



export default function User() {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const id = useParams().userId;
  const token = useSelector(state => state.token);
  const users = useSelector(state => state.users);
  const [allUsers, setAllUsers] = useState(userRows);
  const [data, setData] = useState();
  const [input, setInput] = useState({
    nickname: "",
    given_name: "",
    family_name: "",
    newEmail: ""
  })



  useEffect(() => {

    if (users.length) {
      setAllUsers(allUsers.concat(users));
      setData(allUsers.find(obj => obj.id == id));
    };
  }, [users])



  const handleChange = function (e) {
    e.preventDefault()

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()
    const body = {
      ...input,
      email: data.email
    }
    

    alert("Ha sido modificado con exito")
    navigate("/")
  }


  return (
    <div >
        <Navbar/>
        <div className="container">
           <AdminSidebar /> 
           <div className="user">
             <div className="userTitleContainer">
               <h1 className="userTitle">Usuario</h1>
               {/* <Link to="/newUser">
                 <button className="userAddButton">Crear</button>
               </Link> */}
             </div>
             <div className="userContainer">
               <div className="userShow">
                 <div className="userShowTop">
                   <img
                     src={data && data.picture} alt="" className="userShowImg" />
                   <div className="userShowTopTitle">
                     <span className="userShowUserTitle">nombre de usuario</span>
                     <span className="userShowUsername">{data && data.nickname}</span>
                   </div>
                 </div>
                 <div className="userShowBottom">
                   <span className="userShowTitle">Detalle de cuenta</span>
                   <div className="userShowInfo">
                     <PermIdentity className="userShowIcon" />
                     <span className="userShowInfoTitle">{data && data.nickname}</span>
                   </div>
                   <div className="userShowInfo">
                     <CalendarToday className="userShowIcon" />
                     <span className="userShowInfoTitle">{data && data.createdAt}</span>
                   </div>
                   <span className="userShowTitle">Contacto</span>
                   <div className="userShowInfo">
                     <MailOutline className="userShowIcon" />
                     <span className="userShowInfoTitle">{data && data.email}</span>
                   </div>
                   <span className="userShowTitle">Direccion</span>
                   <div className="userShowInfo">
                     <LocationSearching className="userShowIcon" />
                     <span className="userShowInfoTitle">{data && data.shipping_address} </span>
                   </div>
                 </div>
               </div>
               <div className="userUpdate">
                 <span className="userUpdateTitle">Editar</span>
                 <form onSubmit={handleSubmit} className="userUpdateForm">
                   <div className="userUpdateLeft">
                     <div className="userUpdateItem">
                       <label>Nombre de Usuario</label>
                       <input
                         onChange={handleChange}
                         name="nickname"
                         type="text"
                         placeholder="annabeck99"
                         className="userUpdateInput"
                       />
                     </div>
                     <div className="userUpdateItem">
                       <label>Nombre</label>
                       <input
                         onChange={handleChange}
                         name="given_name"
                         type="text"
                         placeholder="Anna Becker"
                         className="userUpdateInput"
                       />
                     </div>
                     <div className="userUpdateItem">
                       <label>Apellido</label>
                       <input
                         onChange={handleChange}
                         name="family_name"
                         type="text"
                         placeholder="Anna Becker"
                         className="userUpdateInput"
                       />
                     </div>
                     <div className="userUpdateItem">
                       <label>Email</label>
                       <input
                         onChange={handleChange}
                         name="newEmail"
                         type="email"
                         placeholder="annabeck99@gmail.com"
                         className="userUpdateInput"
                       />
                     </div>
                   </div>
                   <div className="userUpdateRight">
                     <div className="userUpdateUpload">
                       <label htmlFor="file">
                         <Publish className="userUpdateIcon" />
                       </label>
                       <input type="file" id="file" style={{ display: "none" }} />
                     </div>
                     <input type="submit" className="userUpdateButton" value="modificar" />
                   </div>
                 </form>
               </div>
             </div>
           </div>
        </div>
    </div>
  );
}
