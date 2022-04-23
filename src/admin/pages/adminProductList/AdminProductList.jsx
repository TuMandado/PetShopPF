import "../adminProductList/adminProductList.css";
import React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Loader } from '../../../page/loader/Loader'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { deleteThisProduct } from "../../../redux/actions/adminActions";

const ProductList = () => {

  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.clientReducer.backup)
  const [totalProducts, setTotalProducts] = useState([]);


  useEffect(() => {
    setTotalProducts(allProducts.map(el=>{
      return({
       id: el.uid,
       animalCategory: el.data.animalCategory,
       brand: el.data.brand,
       category: el.data.category, 
       image: el.data.image,
       name: el.data.name,
       price: el.data.price,
       subCategory: el.data.subCategory,
      })
    }))
  }, [allProducts, dispatch]);

  const handleDelete = (id)=> {
    dispatch(deleteThisProduct(id));
    setTotalProducts(totalProducts.filter((item) => item.id !== id));
    // setTimeout( ()=>{
    //   window.location.reload();
    // },1500)
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
             rows={totalProducts}
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
