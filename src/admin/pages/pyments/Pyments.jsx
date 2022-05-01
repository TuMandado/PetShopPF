import React from 'react';
import "./pyments.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {userRows} from '../../dummyData';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";



const Pyments = () => {

  const dispatch = useDispatch()
  const allPaying = useSelector((state) => state.clientReducer.pets);
  const [totalPaying, setTotalPaying] = useState([]);
  
  useEffect(() => {
    // dispatch(getReallyAllProducts())
    dispatch(getTotalPets())
  }, []);

  useEffect(() => {
    setTotalPaying(allPaying.map(el=>{
      return({
       id: el.uid,
       category: el.data.category,
       state: el.data.state,
       category: el.data.category, 
       sexo: el.data.sexo,
       name: el.data.name,
       description: el.data.description,
       photos: el.data.photos,
       activo: el.data.delete? "no": "si",
      })
    }))
  }, [allPets, dispatch]);

    const columns = [
        { field: "id", headerName: "ID de Orden", width: 120 },
        {
          field: "userId",
          headerName: "id usuario",
          width: 160,
          renderCell: (params) => {
            return (
              <div className="productListItem">
                {params.row.transaction}
              </div>
            );
          },
       
        },
        { field: "status", headerName: "Estado", width: 200 },
        { field: "transaction", headerName: "Importe $", width: 200 },
        { field: "nickname", headerName: "Nombre", width: 200 },  
    ];  

  return (
    <div >
       <Navbar/>
       <div className="container">
          <AdminSidebar /> 
          <div className="productList">
          <DataGrid
            rows={totalPaying}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
          </div>
    </div>
  </div>
  )
}

export default Pyments
