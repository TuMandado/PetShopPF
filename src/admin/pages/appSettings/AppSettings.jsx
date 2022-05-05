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

const AppSettings = () => {
  var dispatch = useDispatch();

  return (
    <div>
      <Navbar />
      <div className="container">
        <AdminSidebar />
        <div className="home">
          {/* <FeaturedInfo /> */}
          <div className="homeWidgets">
            {/* <WidgetLg/> */}
            {/* <WidgetSm /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
