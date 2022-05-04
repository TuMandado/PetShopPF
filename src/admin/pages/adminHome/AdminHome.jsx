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
  var dispatch = useDispatch();
  var user = useSelector((state) => state.clientReducer.user);
  var users = useSelector((state) => state.adminReducer.users);
  var allVisits = useSelector((state) => state.adminReducer.allVisits);
  var allAnalytics = useSelector((state) => state.adminReducer.allAnalytics);
  var allPaying = useSelector((state) => state.cartReducer.allCartsData);
  var [visitsVsDays, setVisitsVsDays] = useState([]);
  var [visitDurationAverage, setVisitDurationAverage] = useState([]);
  var [visitDurationTotal, setVisitDurationTotal] = useState([]);
  var [userRegisteredPerDay, setUserRegisteredPerDay] = useState([]);
  var [payingPerDay, setPayingPerDay] = useState([]);
  var [hoverTimeVsProducts, setHoverTimeVsProducts] = useState([]);
  // const [hoverTimeVsProduct, setHoverTimeVsProduct] = useState([]);

  // If user role is not Admin, redirect to the home page
  useEffect(() => {
    if (
      user &&
      Object.keys(user).length > 0 &&
      user.role.toLowerCase() !== "admin"
    ) {
      window.location.href = "/";
    }
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllCartsData());
    dispatch(getTotalAnalytics());
    dispatch(getTotalVisits());
    dispatch(getTotalUsers());
  }, []);

  // ------------------------------------------------------------
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
      });
      // Count the number of visits per day
      let visitsPerDay = {};
      days.forEach((day) => {
        if (visitsPerDay[day]) {
          visitsPerDay[day]++;
        } else {
          visitsPerDay[day] = 1;
        }
      });
      setVisitsVsDays(visitsPerDay);
    }
  }, [allVisits]);

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
          visitsDuration[dayKey] += visit.data.duration
            ? visit.data.duration
            : 0;
        } else {
          visitsDuration[dayKey] = visit.data.duration
            ? visit.data.duration
            : 0;
        }
      });
      // Get the average duration per day
      let visitsDurationAverage = {};
      Object.keys(visitsDuration).forEach((day) => {
        visitsDurationAverage[day] =
          visitsDuration[day] / Object.keys(visitsDuration).length;
      });
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
          visitsDuration[dayKey] += visit.data.duration
            ? visit.data.duration
            : 0;
        } else {
          visitsDuration[dayKey] = visit.data.duration
            ? visit.data.duration
            : 0;
        }
      });
      // Get the total duration per day
      let visitsDurationTotal = {};
      Object.keys(visitsDuration).forEach((day) => {
        visitsDurationTotal[day] = visitsDuration[day];
      });
      setVisitDurationTotal(visitsDurationTotal);
    }
  }, [allVisits]);

  // ------------------------------------------------------------
  // When users are fetched, count the number of users registered per day
  // The user structure is like this :
  // {
  //   "uid": "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  //   "data": {
  //     "createdAt": {
  //       "seconds": 1599098983,
  //       "nanoseconds": 52352000
  //     },
  useEffect(() => {
    if (users && users.length > 0) {
      let days = [];
      // Get all the days from all users
      users.forEach((user) => {
        let date = new Date(user.data.createdAt.seconds * 1000);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        days.push(`${day}/${month}/${year}`);
      });
      // Count the number of users registered per day
      let usersRegisteredPerDay = {};
      days.forEach((day) => {
        if (usersRegisteredPerDay[day]) {
          usersRegisteredPerDay[day]++;
        } else {
          usersRegisteredPerDay[day] = 1;
        }
      });
      setUserRegisteredPerDay(usersRegisteredPerDay);
    }
  }, [users]);

  // Console users registered per day
  useEffect(() => {
    console.log("usersRegisteredPerDay : ", userRegisteredPerDay);
  }, [userRegisteredPerDay]);

  // ------------------------------------------------------------
  // The allPaying structure is like this :
  // {
  //   "uid": "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  //   "data": {
  //     "createdAt": "Mon Apr 18 2022 20:22:06 GMT-0300 (hora estándar de Argentina)"
  //      "userId": "354345345345345345345345345345345",
  //      "total": "10",
  // }
  // When all payments are fetched, count the add total per day
  useEffect(() => {
    if (allPaying && allPaying.length > 0) {
      payingPerDay = [];
      // Group all payments by day and get the total
      allPaying.forEach((paying) => {
        let date = new Date(paying.data.createdAt);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let dayKey = `${day}/${month}/${year}`;
        if (payingPerDay[dayKey]) {
          payingPerDay[dayKey] += paying.data.total ? paying.data.total : 0;
        } else {
          payingPerDay[dayKey] = paying.data.total ? paying.data.total : 0;
        }
      });
      setPayingPerDay(payingPerDay);
    }
  }, [allPaying]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <AdminSidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart
            data={userData}
            title="Analisis de Mercado"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            {/* <WidgetLg/> */}
            {/* <WidgetSm /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
