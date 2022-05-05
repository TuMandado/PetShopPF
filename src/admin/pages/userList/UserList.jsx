import "./userList.css";
import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavAdmin from "../../../components/navbar/NavAdmin";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { getTotalUsers, offUser, onUser } from "../../../redux/actions/adminActions";
import UserLog from "../../../assets/user.png"

const UserList = () => {
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

  const dispatch = useDispatch();
  // const allUsers = useSelector((state)=> state.users);
  const allUsers = useSelector(state => state.adminReducer.users)
  const [totalUsers, setTotalUsers] = useState([]);


  useEffect (()=>{
      dispatch(getTotalUsers())
  },[])

  useEffect(() => {
      setTotalUsers(allUsers.map(el=>{
         return({
          id: el.uid,
          user: el.data.displayName,
          email: el.data.email,
          createdAt: el.data.createdAt,
          updatedAt: el.data.updatedAt, 
          image: el.data.photoUrl,
          role: el.data.role,
          activo: el.data.disabled? "no": "si"
         })
    }))
  },[allUsers, dispatch]);

  const handleDelete = (uid)=> {
    dispatch(offUser(uid)) 
    setTimeout(() => {
    dispatch(getTotalUsers())
    }, 200)
   
  };
  const handleOk = (uid)=> {
    dispatch(onUser(uid)) 
    setTimeout(() => {
    dispatch(getTotalUsers())
    }, 200)
  };

  if (!totalUsers.length) {
    setTimeout(() => {
         setTotalUsers(allUsers.map(el=>{
            return({
              id: el.uid,
              user: el.data.displayName,
              email: el.data.email,
              createdAt: el.data.createdAt,
              updatedAt: el.data.updatedAt, 
              image: el.data.photoUrl,
              role: el.data.role,
              activo: el.data.disabled? "no": "si"
             })
         }))
    }, 500)
  }
  
  const columns = [
    { field: "id", headerName: "ID", width: 95 },
    {
      field: "user",
      headerName: "Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.image || UserLog} alt="" />
            {params.row.user}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Rol",
      width: 120,
    },
    {
      field: "activo",
      headerName: "Activo",
      width: 120,
    },
    {
      field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            {params.row.activo==="si"?
              <>
              <HighlightOffOutlinedIcon
                className="userListOff"
                onClick={() => handleDelete(params.row.id)}
              />
              </>
              :
              <>
              < CheckCircleOutlineOutlinedIcon
                className="userListOn"
                onClick={() => handleOk(params.row.id)}
              />
              </>}
          </>
        );
      },
    },
  ];

  return (
    <div >
       <NavAdmin/>
       <div className="container">
         <AdminSidebar />   
         <div className="userList">
         <DataGrid
           rows={totalUsers}
           disableSelectionOnClick
           columns={columns}
           pageSize={8}
           rowsPerPageOptions={[8]}
         />
         </div>
       </div>
    </div>
  )
}

  
export default UserList


