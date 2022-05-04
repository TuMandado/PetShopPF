import "./publicPets.css";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getAllTotalPets, deleteThisPet, okThisPet} from "../../../redux/actions/adminActions";

const PublicPets = () =>{
  
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
  
  const dispatch = useDispatch()
  const allPets = useSelector((state) => state.adminReducer.pets);
  const [totalPets, setTotalPets] = useState([]);
  
  useEffect(() => {
    // dispatch(getReallyAllProducts())
    dispatch(getAllTotalPets())
  }, [allPets]);

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

  const handleDelete = (uid)=> {
    // dispatch(deleteThisProduct(id));
    dispatch(deleteThisPet(uid)) 
    // setTotalPets(totalPets.filter((item) => item.id !== id));
  };
  const handleOk = (uid)=> {
    // dispatch(deleteThisProduct(id));
    dispatch(okThisPet(uid)) 
    // setTotalPets(totalPets.filter((item) => item.id !== id));
  };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   console.log("🎋:", e)
  //   // e.target.value == 1? dispatch(deleteThisPet(e.id)) :  dispatch(okThisPet(e.id))
  // }

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "pet",
      headerName: "Mascotas",
      width: 300,
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
      width: 130,
    },
    { field: "sexo",
       headerName: "Sexo", 
       width: 120
    },
    { field: "description",
       headerName: "Descripción", 
       type: 'date',
       width: 160,
    },
    {
      field: "activo",
      headerName: "Activo",
      alignItems: 'center',
      width: 120,
    },
    // {
    //   field: "activo",
    //   headerName: "Activ",
    //   alignItems: 'center',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //        <div className="userUpdateItem">
    //               <label>Activo</label>
    //                 <select name='disabled' id='active' onChange={handleChange}>
    //                     <option value= {0}  > Si </option>
    //                     <option value={1}  > No </option>
    //                 </select>
    //             </div>
    //     );
    //   }
    // },
    {
      field: "action",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/adminPet/" + params.row.id}>
              <button className="productListEdit">ver</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
            < Publish
              className="productListOk"
              onClick={() => handleOk(params.row.id)}
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
             loading={!totalPets}
             rowHeight={140}
             rows={totalPets}
             disableSelectionOnClick={false}
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