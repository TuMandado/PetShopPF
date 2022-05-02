import "./pyments.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { getAllCartsData } from '../../../redux/actions/cartActions';
import { Link } from "react-router-dom";


const Pyments = () => {

  const dispatch = useDispatch()
  const allPaying = useSelector((state) => state.cartReducer.allCartsData);
  const [totalPaying, setTotalPaying] = useState([]);
  
  useEffect(() => {
    dispatch(getAllCartsData())
  }, []);

  useEffect(() => {
    setTotalPaying(allPaying.map(el=>{
      return({
        fecha: el.data.createdAt,
        usuarioId: el.data.userUid,
        id: el.uid,
        estado: el.data.status,
        productos: el.data.items.map(e=> e.title),
        valor: 0,
      })
    }))
  }, [allPaying, dispatch]);

    const columns = [
        { field: "id", headerName: "ID de Orden", width: 180 },
        { field: "usuarioId", headerName: "ID de Usuario", width: 180 },
            
        // {
        //   field: "productos",
        //   headerName: "Lista",
        //   width: 400,
        //   renderCell: (params) => {
        //     return (
        //       <>
        //       <div className="productListItem">
        //           <lu>
        //          {params.row.productos.map( e=>{
        //             return(
        //               <li>{e}</li>
        //             )}
        //          )}
        //           </lu>
        //       </div>
        //       </>
        //     );
        //   },
        // },

        { field: "productos", headerName: "Productos", width: 200 },
        { field: "estado", headerName: "Estado", width: 138 },
        { field: "valor", headerName: "Importe $", width: 138 },
        // { field: "nickname", headerName: "Nombre", width: 200 },  
    
        {
          field: "action",
          headerName: "Accion",
          width: 138,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/pyments/" + params.row.id}>
                  <button className="userListEdit">ver</button>
                </Link>
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
          <DataGrid
            rows={totalPaying}
            rowHeight={140}
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
