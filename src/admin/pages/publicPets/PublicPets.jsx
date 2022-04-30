import "./publicPets.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getTotalPets } from "../../../redux/actions";

const PublicPets = () =>{
  
  const dispatch = useDispatch()
  const allPets = useSelector((state) => state.clientReducer.pets);
  const [totalPets, setTotalPets] = useState([]);
  
  useEffect(() => {
    // dispatch(getReallyAllProducts())
    dispatch(getTotalPets())
  }, []);

  useEffect(() => {
    setTotalPets(allPets.map(el=>{
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

  const handleDelete = (id)=> {
    // dispatch(deleteThisProduct(id));
    setTotalPets(totalPets.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "pet",
      headerName: "Mascotas",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.photos } alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "state",
      headerName: "Estado",
      width: 160,
    },
    { field: "sexo",
       headerName: "Sexo", 
       width: 120
    },
    { field: "description",
       headerName: "Descripción", 
       width: 120
    },
    {
      field: "activo",
      headerName: "Activo",
      width: 160,
    },
    {
      field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminPet/" + params.row.id}>
              <button className="productListEdit">ver publicación</button>
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
         allPets && 
          <DataGrid
             rows={totalPets}
             disableSelectionOnClick
             columns={columns}
             pageSize={10}
             rowsPerPageOptions={[10]}
             checkboxSelection
           /> 
      }
    </div>
    </div>
    </div>
  ); 

}

export default PublicPets 