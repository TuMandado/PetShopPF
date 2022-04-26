import "./userList.css";
import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { deleteThisUser, getTotalUsers } from "../../../redux/actions/adminActions";
import UserLog from "../../../assets/user.png"

const UserList = () => {

  const dispatch = useDispatch();
  // const allUsers = useSelector((state)=> state.users);
  const allUsers = useSelector(state => state.adminReducer.users)
  const [totalUsers, setTotalUsers] = useState([]);

  const handleDelete = (id) => {
    dispatch(deleteThisUser(id));
    setTotalUsers(totalUsers.filter((item)=> item.id !== id));
  };

  useEffect (()=>{
      dispatch(getTotalUsers())

  },[])

  useEffect(() => {
    if (allUsers.length){
      setTotalUsers(allUsers.map(el=>{
         return({
          id: el.uid,
          user: el.data.name,
          email: el.data.email,
          createdAt: el.data.createdAt,
          updatedAt: el.data.updatedAt, 
          image: el.data.image,
          role: el.data.role,
         })
      }))
    }
  },[dispatch]);

  if (!totalUsers.length) {
    setTimeout(() => {
         setTotalUsers(allUsers.map(el=>{
            return({
              id: el.uid,
              user: el.data.nickname,
              email: el.data.email,
              createdAt: el.data.createdAt,
              updatedAt: el.data.updatedAt, 
              image: el.data.image,
              role: el.data.role,
              activo: el.data.delete? "no": "si"
             })
         }))
    }, 2000)
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
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div >
       <Navbar/>
       <div className="container">
         <AdminSidebar />   
         <div className="userList">
         <DataGrid
           rows={totalUsers}
           disableSelectionOnClick
           columns={columns}
           pageSize={8}
           rowsPerPageOptions={[8]}
           checkboxSelection
         />
         </div>
       </div>
    </div>
  )
}

  
export default UserList


