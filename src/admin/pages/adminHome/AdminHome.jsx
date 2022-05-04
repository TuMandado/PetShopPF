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
  const allPaying = useSelector((state) => state.cartReducer.allCartsData);
  const [visitsVsDays, setVisitsVsDays] = useState([]);
  const [visitDurationAverage, setVisitDurationAverage] = useState([]);
  const [visitDurationTotal, setVisitDurationTotal] = useState([]);
  // const [hoverTimeVsProduct, setHoverTimeVsProduct] = useState([]);

  // If user role is not Admin, redirect to the home page
  useEffect(() => {
    if (user && Object.keys(user).length > 0 && user.role.toLowerCase() !== "admin") {
      window.location.href = "/";
    }
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllCartsData())
    dispatch(getTotalAnalytics())
    dispatch(getTotalVisits())
    dispatch(getTotalUsers())
  }, []);

  // // Console all visits
  // useEffect(() => {
  //   if (allVisits && allVisits.length > 0) {
  //     console.log("allVisits :", allVisits);
  //   }
  // }, [allVisits]);

  // When all visits are fetched, count the number of visits per day
  // The visit structure is like this :
  // {
  //   "uid": "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  //   "data": {
  //     "date": {
  //       "seconds": 1599098983,
  //       "nanoseconds": 52352000
  //     },
  //     "duration": 0,
  //     "userId": "354345345345345345345345345345345",
  //   }
  useEffect(() => {
    if (allVisits && allVisits.length > 0) {
      let days = [];
      // Get all the days from all visits
      allVisits.forEach((visit) => {
        let date = new Date(visit.data.date.seconds * 1000);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        days.push(`${day}/${month}/${year}`);
      }
      );
      // Count the number of visits per day
      let visitsPerDay = {};
      days.forEach((day) => {
        if (visitsPerDay[day]) {
          visitsPerDay[day]++;
        }
        else {
          visitsPerDay[day] = 1;
        }
      }
      );
      setVisitsVsDays(visitsPerDay);
    }
  }, [allVisits]);

  // // Console visitsVsDays
  // useEffect(() => {
  //   if (visitsVsDays && Object.keys(visitsVsDays).length > 0) {
  //     console.log("visitsVsDays :", visitsVsDays);
  //   }
  // }, [visitsVsDays]);

  // Console allAnalytics
  // useEffect(() => {
  //   if (allAnalytics && allAnalytics.length > 0) {
  //     console.log("allAnalytics :", allAnalytics);
  //   }
  // }, [allAnalytics]);

  // When all visits are fetched, count the visit duration average per day
  useEffect(() => {
    if (allVisits && allVisits.length > 0) {
      let visitsDuration = [];
      // Group all visits by day and get the duration average
      allVisits.forEach((visit) => {
        let date = new Date(visit.data.date.seconds * 1000);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let dayKey = `${day}/${month}/${year}`;
        if (visitsDuration[dayKey]) {
          visitsDuration[dayKey] += visit.data.duration ? visit.data.duration : 0;
        }
        else {
          visitsDuration[dayKey] = visit.data.duration ? visit.data.duration : 0;
        }
      }
      );
      // Get the average duration per day
      let visitsDurationAverage = {};
      Object.keys(visitsDuration).forEach((day) => {
        visitsDurationAverage[day] = visitsDuration[day] / Object.keys(visitsDuration).length;
      }
      );
      setVisitDurationAverage(visitsDurationAverage);
    }
  }, [allVisits]);

  // When all visits are fetched, count the visit duration total per day
  useEffect(() => {
    if (allVisits && allVisits.length > 0) {
      let visitsDuration = [];
      // Group all visits by day and get the duration total
      allVisits.forEach((visit) => {
        let date = new Date(visit.data.date.seconds * 1000);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let dayKey = `${day}/${month}/${year}`;
        if (visitsDuration[dayKey]) {
          visitsDuration[dayKey] += visit.data.duration ? visit.data.duration : 0;
        }
        else {
          visitsDuration[dayKey] = visit.data.duration ? visit.data.duration : 0;
        }
      }
      );
      // Get the total duration per day
      let visitsDurationTotal = {};
      Object.keys(visitsDuration).forEach((day) => {
        visitsDurationTotal[day] = visitsDuration[day];
      }
      );
      setVisitDurationTotal(visitsDurationTotal);
    }
  }, [allVisits]);

  // // Console visitDurationTotal
  // useEffect(() => {
  //   if (visitDurationTotal && Object.keys(visitDurationTotal).length > 0) {
  //     console.log("visitDurationTotal :", visitDurationTotal);
  //   }
  // }, [visitDurationTotal]);

  // // Console visitDurationAverage
  // useEffect(() => {
  //   if (visitDurationAverage && Object.keys(visitDurationAverage).length > 0) {
  //     console.log("visitDurationAverage :", visitDurationAverage);
  //   }
  // }, [visitDurationAverage]);








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
