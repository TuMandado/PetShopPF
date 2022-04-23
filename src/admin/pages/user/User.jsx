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
import { uploadUser } from "../../../firebase/Users";

export default function User() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const uid = useParams().userId;
  const userDetail = useSelector((state) => state.adminReducer.user);
  const [dataDetail, setDataDetail] = useState([]);
  const [input, setInput] = useState({
    nickname: "",
    name: "",
    burname: "",
    email: "",
    phone: "",
    shippingAddress: "",
    image: "",
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
    console.log("data 🍕:", dataDetail);
  },[userDetail])

  useEffect(() => {
    if (userDetail.length) {   
        setInput({
            nickname: userDetail ? userDetail.nickname : '',
            name: userDetail ? userDetail.name : '',
            burname: userDetail ? userDetail.burname : '',
            email: userDetail ? userDetail.email : '',
            stock: userDetail ? userDetail.stock : '',
            shippingAddress: userDetail ? userDetail.shippingAddress : '',
            phone: userDetail ? userDetail.phone : '',
            image: userDetail ? userDetail.image : '',

        })
    }
  }, [userDetail])

  // useEffect(() => {
     
  //   // setDataDetail(allUser.find(obj => obj.id == id));
  //   console.log("uid 💥:", uid);
  // },[])

  // setTimeout(() => {
  //   console.log("user 🍗:", userDetail);
  //   console.log("data 🍕:", dataDetail);
  // }, 2000)


  const handleChange = function (e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(putUser(uid, input))
    setInput({
      nickname: "",
      name: "",
      burname: "",
      email: "",
      phone: "",
      shippingAddress: "",
      image: "",
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
              <img src="https://wwwhatsnew.com/wp-content/uploads/2021/11/mascota.jpg" alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUserTitle">nombre de usuario</span>
                <span className="userShowUsername">{userDetail && userDetail.nickname} {userDetail && userDetail.surname}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">rol</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{userDetail && userDetail.role}</span>
              </div>
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
                    placeholder={userDetail.nickname ? userDetail.nickname : "nombre..." }
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
                    placeholder={userDetail.mail? userDetail.mail : "mail..." }
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Direccion</label>
                  <input
                    onChange={handleChange}
                    name="shippingAddress"
                    type="text"
                    placeholder={userDetail.mail? userDetail.mail : "mail..." }
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

