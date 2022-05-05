import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavAdmin from "../../../components/navbar/NavAdmin";
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
  // var allAnalytics = useSelector((state) => state.adminReducer.allAnalytics);
  var allPaying = useSelector((state) => state.cartReducer.allCartsData);
  var [visitsVsDays, setVisitsVsDays] = useState([]);
  var [visitDurationAverage, setVisitDurationAverage] = useState([]);
  var [visitDurationTotal, setVisitDurationTotal] = useState([]);
  var [userRegisteredPerDay, setUserRegisteredPerDay] = useState([]);
  var [payingPerDay, setPayingPerDay] = useState([]);
  // var [hoverTimeVsProducts, setHoverTimeVsProducts] = useState([]);
  var products = useSelector((state) => state.clientReducer.products);
  // const [hoverTimeVsProduct, setHoverTimeVsProduct] = useState([]);
  var [allPayingSum, setAllPayingSum] = useState(0);

  // allPaying is mounted add all allVisits[i].data.total to allPayingSum
  useEffect(() => {
    try {
      if (allPaying && allPaying.length > 0) {
        var sum = 0;
        for (var i = 0; i < allPaying.length; i++) {
          sum += allPaying[i].data.total;
        }
        setAllPayingSum(sum);
      }
    } catch (error) {
      console.log(error);
    }
  }, [allPaying]);

  // // Console log allPayingSum
  // useEffect(() => {
  //   console.log("allPayingSum :", allPayingSum);
  // }, [allPayingSum]);

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
    // dispatch(getTotalAnalytics());
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
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, [allVisits]);

  // When all visits are fetched, count the visit duration average per day
  useEffect(() => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, [allVisits]);

  // When all visits are fetched, count the visit duration total per day
  useEffect(() => {
    if (allVisits && allVisits.length > 0) {
      try {
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
      } catch (error) {
        console.log(error);
      }
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
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
  }, [users]);

  // Console users registered per day
  // useEffect(() => {
  //   console.log("usersRegisteredPerDay : ", userRegisteredPerDay);
  // }, [userRegisteredPerDay]);

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
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, [allPaying]);
  // ------------------------------------------------------------

  // The analytics structure is like this :
  // {
  //   "id": "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  //   "data": {
  //     "date": {
  //       "seconds": 1599098983,
  //       "nanoseconds": 52352000
  //     },
  //     "productId": "5645646546456456456456456456456",
  //     "time": "10",
  //     "type": "detail"// "cart"
  //   }
  // // Whean all analytics are fetched, count the total of all analytics per product, the product name is get from the productId
  // useEffect(() => {
  //   if (allAnalytics && allAnalytics.length > 0 && products && products.length > 0) {
  //     hoverTimeVsProducts = [];
  //     // Group all analytics by productId and get the total
  //     allAnalytics.forEach((analytic) => {
  //       let productId = analytic.data.productId;
  //       let productName = products.find((product) => {
  //         return product.uid == productId;
  //       }
  //       ).data.name;
  //       if (hoverTimeVsProducts[productName]) {
  //         hoverTimeVsProducts[productName] += analytic.data.time
  //           ? analytic.data.time
  //           : 0;
  //       } else {
  //         hoverTimeVsProducts[productName] = analytic.data.time
  //           ? analytic.data.time
  //           : 0;
  //       }
  //     });
  //     // Order the products by time
  //     setHoverTimeVsProducts(hoverTimeVsProducts);
  //   }
  // }, [allAnalytics]);

  // // Console all hover time per product
  // useEffect(() => {
  //   console.log("hoverTimeVsProducts : ", hoverTimeVsProducts);
  // }, [hoverTimeVsProducts]);

  // useEffect(() => {
  //   if (allAnalytics && allAnalytics.length > 0) {
  //     console.log("allAnalytics : ", allAnalytics);
  //   }
  // }, [allAnalytics]);

  // Chart uses data with the following structure :
  // {
  //   "name": value,
  //   "tag(give the name of the tag)": key
  // }
  // The following function is used to adapt the data to the chart
  const adaptDataToChart = (data, tag) => {
    let adaptedData = [];
    Object.keys(data).forEach((key) => {
      adaptedData.push({
        name: key,
        [tag]: data[key],
      });
    });
    return adaptedData;
  };
  // ------------------------------------------------------------

  return (
    <div>
      <NavAdmin />
      <div className="container">
        <AdminSidebar />
        <div className="home">
          <FeaturedInfo allPayingSum={allPayingSum} />
          <Chart
            data={adaptDataToChart(visitsVsDays, "Visita por día")}
            title="Visitas por día"
            grid
            dataKey="Visita por día"
          />
          <Chart
            data={adaptDataToChart(visitDurationAverage, "Duración promedio")}
            title="Duración promedio en la pagina"
            grid
            dataKey="Duración promedio"
          />
          <Chart
            data={adaptDataToChart(
              userRegisteredPerDay,
              "Usuarios registrados"
            )}
            title="Usuarios registrados"
            grid
            dataKey="Usuarios registrados"
          />
          <Chart
            data={adaptDataToChart(payingPerDay, "Cobros por día")}
            title="Cobros por día"
            grid
            dataKey="Cobros por día"
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
