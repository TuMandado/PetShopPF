import "./App.css";
import { Avatar } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { LoremIpsum } from "lorem-ipsum";
import {
    Facebook,
    Instagram,
    MailOutline,
    Pinterest,
    Twitter
} from '@material-ui/icons'


// Import icons from Material UI Icons
import { Home as HomeIcon, Pets as PetsIcon } from "@material-ui/icons";
// Import chart components
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  Legend,
} from "recharts";
// Importamos la libreria de mercado pago
// SDK de Mercado Pago
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
//Importamos la aplicación/credenciales
import { firebaseApp } from "./firebase/credenciales";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions";
// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { uploadPet, deletePet, getPet, getAllPets } from "./firebase/Pets";
import Home from "./page/home/Home";
// eslint-disable-next-line no-unused-vars
import Login from "./page/login/Login";
// import ProductList from "./page/productList/ProductList";
import Product from "./page/product/Product";
// import Cart from "./page/cart/Cart";
// import PetsPage from "./page/pets/PetsPage";
// import Register from "./page/register/Register";
// import UserSettings from "./page/userSettings/UserSettings";
// import ErrorPage from "./page/error/Error";
// import CreatedProduct from './page/createdProduct/CreatedProduct'

// import AdminHome from "./admin/pages/adminHome/AdminHome";
// import UserList from "./admin/pages/userList/UserList";
// import User from "./admin/pages/user/User";
// import NewUser from "./admin/pages/newUser/NewUser";
// import AdminProductList from "./admin/pages/adminProductList/AdminProductList";
// import AdminProduct from "./admin/pages/adminProduct/AdminProduct";
// import NewProduct from "./admin/pages/newProduct/NewProduct";
// import Pyments from "./admin/pages/pyments/Pyments";
// import PublicPets from "./admin/pages/publicPets/PublicPets";
// import AdminSidebar from "./admin/components/adminSidebar/AdminSidebar";
// import mercadopago from "mercadopago";
import { getTotalProducts } from "./redux/actions";
import mercadopago from "mercadopago";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
// import Navbar from "./components/navbar/Navbar";
const auth = getAuth(firebaseApp);

function App() {
  const randomDescription = () => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });
    return lorem.generateParagraphs(1);
  };
  // Console log mercado pago when loaded
  useEffect(() => {
    mercadopago.configure({
      access_token:
        "TEST-5909391637745101-041518-e07a43a5f92224ee501bc4d9feca4624-191706246",
    });
    console.log("Mercado Pago loaded");
    console.log(mercadopago);

    console.log("Material UI loaded");
  }, []);
  // eslint-disable-next-line no-unused-vars
  var user = useSelector((state) => state.clientReducer.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      dispatch(setUser(usuarioFirebase));
      // dispatch(setUserCart(usuarioFirebase));
    } else {
      dispatch(setUser(null));
      // dispatch(setUserCart(null));
    }
  });

  useEffect(() => {
    dispatch(getTotalProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return <>{user ? <Home/> : <Login/>}</>

  return (
    <div className={"App"}>
      <h1>
     { randomDescription()}
      </h1>
      {
        !!mercadopago && (
          <h1>
            Mercado Pago loaded
            <br />
            {mercadopago.configure({
              access_token:
                "TEST-5909391637745101-041518-e07a43a5f92224ee501bc4d9feca4624-191706246",
            })}
          </h1>
        )
      }
      <Router>
        <Routes>
          {/* <Route exact path="*" element={<ErrorPage />} /> */}
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          {/* <Route exact path="/" element={user ? <Home /> : <Login />} /> */}
          {/* <Route path="/products" element={<ProductList />} />
             <Route exact path="/cart" element={<Cart />} />
             <Route exact path="/admin" element={<AdminHome />} />
             <Route exact path="/usersettings" element={<UserSettings />} />
             <Route exact path="/pets" element={<PetsPage />} />
             <Route exact path="/register" element={<Register />} />
             <Route exact path="/login" element={<Login />} />
             {<Route exact path="/createdProduct" element={<CreatedProduct/>} />}
   
             <Route exact path="/admin" element={<AdminHome />} />
             <Route path="/users" element={<UserList />} />
             <Route path="/user/:userId" element={<User />} />
             <Route path="/newUser" element={<NewUser />} />
             <Route path="/adminProducts" element={<AdminProductList />} />
             <Route path="/adminProduct/:productId" element={<AdminProduct />} />
             <Route path="/newProduct" element={<NewProduct />} />
             <Route path="/ventas" element={<Pyments />} />
             <Route path="/publicPets" element={<PublicPets />} /> */}
        </Routes>
      </Router>
      <Avatar
        alt="Remy Sharp"
        src="https://www.mercadopublico.cl/portal/img/logo_mp.png"
      />
      {
        // Return DataGrid Example
      }
      <DataGrid
        rows={[
          {
            id: 1,
            name: "Foo",
            age: 20,
            city: "Barcelona",
            country: "Spain",
          },
          {
            id: 2,
            name: "Bar",
            age: 30,
            city: "Madrid",
            country: "Spain",
          },
          {
            id: 3,
            name: "Baz",
            age: 40,
            city: "Barcelona",
            country: "Spain",
          },
        ]}
        columns={[
          {
            field: "id",
            headerName: "ID",
          },
          {
            field: "name",
            headerName: "Name",
          },
          {
            field: "age",
            headerName: "Age",
          },
          {
            field: "city",
            headerName: "City",
          },
          {
            field: "country",
            headerName: "Country",
          },
        ]}
      />
      <Home />
      <PetsIcon />
      {
        // Return chart example, from rechart usgin LineChart, Line, XAxis, CartesianGrid, Tooltip and ResponsiveContainer.
      }
      <LineChart
        width={500}
        height={300}
        data={{
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
          datasets: [
            {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
            },
          ],

        }}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <Facebook />
      <Instagram />
    </div>
  );
}


export default App;
