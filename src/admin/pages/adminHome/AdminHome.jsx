import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";

import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";

import "./adminHome.css";

const AdminHome = () => {
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
