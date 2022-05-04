import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";
import { getAllCartsData } from "../../../redux/actions/cartActions";
import { getTotalAnalytics } from "../../../redux/actions/adminActions";
import { getTotalVisits } from "../../../redux/actions/adminActions";
import { getTotalUsers } from "../../../redux/actions/adminActions";

import "./adminHome.css";

const AdminHome = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.clientReducer.user);
  const users = useSelector((state) => state.adminReducer.users);
  const allVisits = useSelector((state) => state.adminReducer.allVisits);
  const allAnalytics = useSelector((state) => state.adminReducer.allAnalytics);

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

  const allPaying = useSelector((state) => state.cartReducer.allCartsData);
  const [totalPaying, setTotalPaying] = useState([]);

  useEffect(() => {
    dispatch(getAllCartsData())
    dispatch(getTotalAnalytics())
    dispatch(getTotalVisits())
    dispatch(getTotalUsers())
  }, []);

  // useEffect(() => {
  //   setTotalPaying(allPaying.map(el=>{
  //     return({
  //       fecha: el.data.createdAt,
  //       usuarioId: el.data.userUid,
  //       id: el.uid,
  //       estado: el.data.status,
  //       productos: el.data.items.map(e=> e.title),
  //       total: el.data.total,
  //     })
  //   }))
  // }, [allPaying, dispatch]);

  // // Cosole allPaying
  // useEffect(() => {
  //   console.log("admin allPaying ♦:", allPaying);
  // }, [allPaying]);

  // // Console allAnalytics
  // useEffect(() => {
  //   console.log("admin allAnalytics ♦:", allAnalytics);
  // }, [allAnalytics]);

  // // Console allVisits
  // useEffect(() => {
  //   console.log("admin allVisits ♦:", allVisits);
  // }, [allVisits]);

  // // Console users
  // useEffect(() => {
  //   console.log("admin users ♦:", users);
  // }, [users]);

  // useEffect(() => {
  //   console.log("admin totalPaying 🚩:", totalPaying);
  // }, [totalPaying]);

  return (
     <div >
        <Navbar/>
        <div className="container">
          <AdminSidebar/> 
          <div className="home">
            <FeaturedInfo />
            <Chart data={userData} title="Analisis de Mercado" grid dataKey="Active User" />
            <div className="homeWidgets">
                {/* <WidgetLg/> */}
                {/* <WidgetSm /> */}
            </div>
          </div>
        </div>
     </div>
  );
}

export default AdminHome
