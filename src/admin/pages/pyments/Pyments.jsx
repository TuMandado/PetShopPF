import "./pyments.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import NavAdmin from "../../../components/navbar/NavAdmin";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { getAllCartsData } from '../../../redux/actions/cartActions';
import { Link } from "react-router-dom";


const Pyments = () => {
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
  const allPaying = useSelector((state) => state.cartReducer.allCartsData);
  const allUsers = useSelector(state => state.adminReducer.users);
  const [totalPaying, setTotalPaying] = useState([]);

  // const nickName= (allUsers.find(obj => obj.id == el.data.userUid)).nickName
  // allUsers.find(obj => obj.id == id)
  
  useEffect(() => {
    dispatch(getAllCartsData())
  }, []);

  useEffect(() => {
    setTotalPaying(allPaying.map(el=>{
      const nick= allUsers.find(obj => obj.uid == el.data.userUid);
      console.log("🎪=>", nick.data.displayName);
      return({
        fecha: el.data.createdAt,
        usuarioId: el.data.userUid,
        id: el.uid,
        estado: el.data.status,
        productos: el.data.items.map(e=> e.title),
        total: el.data.total,
        displayName: nick.data.displayName,
        salestatus: el.data.salestatus
      })
    }))
  }, [allPaying, dispatch]);

  useEffect(() => {
    console.log("allUsers 🎆:", allUsers);
    console.log("allPaying ♦:", allPaying);
    console.log("totalPaying 🚩:", totalPaying);
  }, [totalPaying]);

    const columns = [
        { field: "id", headerName: "ID de Orden", width: 180 },
        { field: "displayName", headerName: "Nombre de Usuario", width: 240 },
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
        { field: "salestatus", headerName: "Estado de venta", width: 200 },
        { field: "estado", headerName: "Estado de pago", width: 200 },
        { field: "total", headerName: "Importe $", width: 138 },
        // { field: "nickname", headerName: "Nombre", width: 200 },  
    
        {
          field: "action",
          headerName: "Accion",
          width: 138,
          renderCell: (params) => {
            return (
              <>
                <Link to={"/ventas/" + params.row.id}>
                  <button className="userListEdit">ver</button>
                </Link>
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
          <div className="productList">
          <DataGrid
            rows={totalPaying}
            rowHeight={140}
            disableSelectionOnClick
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
          />
          </div>
    </div>
  </div>
  )
}

export default Pyments
