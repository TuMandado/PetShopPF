import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./user.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router';
import FileBase from 'react-file-base64';
import { getDetailUser, putUser } from "../../../redux/actions/adminActions";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

export default function User() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const uid = useParams().userId;
  const userDetail = useSelector((state) => state.adminReducer.user);
  const [input, setInput] = useState({
    // nickname: "",
    // name: "",
    // surname: "",
    // email: "",
    // phone: "",
    // shippingAddress: "",
    // image: "",
    // delete: false
  })
  const getBaseFile = files => {
    setInput(prevInput => ({ ...prevInput, image: files.base64 }))  
}
  useEffect(() => {
   if (!userDetail.length) {
    dispatch(getDetailUser(uid));
   }
  },[])

  useEffect(() => { 
    console.log("user 🍗:", userDetail); 
        setInput({
            nickname: userDetail.nickname ? userDetail.nickname : '',
            name: userDetail.name ? userDetail.name : '',
            surname: userDetail.surname ? userDetail.surname : '',
            email: userDetail.email ? userDetail.email : '',
            shippingAddress: userDetail.shippingAddress ? userDetail.shippingAddress : '',
            phone: userDetail.phone ? userDetail.phone : '',
            image: userDetail.image ? userDetail.image : '',
            delete: userDetail.delete ? userDetail.delete : false
        })
  }, [userDetail])

  const handleChange = function (e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      delete: e.target.value== 1? true : false,
    })
   
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(putUser(uid, input))
    setInput({
      nickname: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      shippingAddress: "",
      image: "",
      delete: false
    })
    alert("Ha sido modificado con exito")
    navigate("/users")
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
              <img src={userDetail && userDetail.image} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUserTitle">nombre de usuario</span>
                <span className="userShowUsername">{userDetail.nickname? userDetail.nickname : userDetail.email}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">nombre</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{userDetail && userDetail.name}  {userDetail && userDetail.surname}</span>
              </div>
              <span className="userShowTitle">rol</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{userDetail && userDetail.role}</span>
              </div>
              <span className="userShowTitle"></span>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle"></span>
              </div>
              <span className="userShowTitle">Contacto</span>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{userDetail && userDetail.email}</span>
              </div>
              <span className="userShowTitle">Telefono</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{userDetail && userDetail.phone}</span>
              </div>
              <span className="userShowTitle">Direccion</span>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{userDetail && userDetail.shippingAddress} </span>
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
                    placeholder={userDetail.nickname ? userDetail.nickname : "nombre de usuario..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Nombre</label>
                  <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    placeholder={userDetail.name ? userDetail.name : "nombre..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Apellido</label>
                  <input
                    onChange={handleChange}
                    name="surname"
                    type="text"
                    placeholder={userDetail.surname? userDetail.surname : "apellido..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder={userDetail.mail? userDetail.mail : "mail..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Telefono</label>
                  <input
                    onChange={handleChange}
                    name="phone"
                    type="text"
                    placeholder={userDetail.phone? userDetail.phone : "telefono de contacto..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Direccion</label>
                  <input
                    onChange={handleChange}
                    name="shippingAddress"
                    type="text"
                    placeholder={userDetail.shippingAddress? userDetail.shippingAddress : "direccion de envio..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Imagen</label>
                  <FileBase
                      name='file'
                      type='file'
                      multiple={false}
                      onDone={getBaseFile}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Activo</label>
                    <select name='delete' id='active' onChange={handleChange}>
                        <option value= {0}  > Si </option>
                        <option value={1}  > No </option>
                    </select>
                </div>
                <div className="userUpdateUpload">
                  <input type="submit" className="userUpdateButton" value="modificar" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
 </div>
  );
}

