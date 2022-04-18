import "./userList.css";
import React from 'react'
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

const UserList = () => {


  const dispatch = useDispatch();
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 95 },
    {
      field: "user",
      headerName: "Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.picture } alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
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
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
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
         {/* <DataGrid
           rows={data}
           disableSelectionOnClick
           columns={columns}
           pageSize={8}
           rowsPerPageOptions={[8]}
           checkboxSelection
         /> */}
         </div>
       </div>
    </div>
  )
}

  
export default UserList


