import "./adminProductList.css";
import React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Loader } from '../../../page/loader/Loader'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { productRows } from "../../dummyData";


const ProductList = () => {

  const allProducts = useSelector(state => state.clientReducer.backup)
  const [dat, setDat] = useState(allProducts);
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Producto",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock",
       headerName: "Stock", 
       width: 120
    },
    {
      field: "price",
      headerName: "$ Precio",
      width: 160,
    },
    {
      field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminProduct/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
    <div className="productList">
      {
         allProducts && allProducts.length
         ? <DataGrid
             rows={data}
             disableSelectionOnClick
             columns={columns}
             pageSize={10}
             rowsPerPageOptions={[10]}
             checkboxSelection
           />
         : <Loader />  
      }
    </div>
    </div>
    </div>
  );
}

export default ProductList
