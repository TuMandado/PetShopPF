import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
//Importamos la aplicación/credenciales
import { firebaseApp } from "./firebase/credenciales";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions";
import { Timestamp } from "firebase/firestore";
// import { uploadPet, deletePet, getPet, getAllPets } from "./firebase/Pets";
import Home from "./page/home/Home";
// eslint-disable-next-line no-unused-vars
import Login from "./page/login/Login";
import ProductList from "./page/productList/ProductList";
import Product from "./page/product/Product";
import Cart from "./page/cart/Cart";
import PetsPage from "./page/pets/PetsPage";
import Pet from "./page/pet/Pet.jsx";
import Register from "./page/register/Register";
import UserSettings from "./page/userSettings/UserSettings";
import ErrorPage from "./page/error/Error";
import CreatedProduct from "./page/createdProduct/CreatedProduct";
import CreatedPets from "./page/createdPets/CreatedPets";
import PasswordRecovery from "./page/passwordRecovery/PasswordRecovery";

import AdminHome from "./admin/pages/adminHome/AdminHome";
import UserList from "./admin/pages/userList/UserList";
import User from "./admin/pages/user/User";
import NewUser from "./admin/pages/newUser/NewUser";
import AdminProductList from "./admin/pages/adminProductList/AdminProductList";
import AdminProduct from "./admin/pages/adminProduct/AdminProduct";
import NewProduct from "./admin/pages/newProduct/NewProduct";
import Pyments from "./admin/pages/pyments/Pyments";
import PublicPets from "./admin/pages/publicPets/PublicPets";
import AdminSidebar from "./admin/components/adminSidebar/AdminSidebar";
import { getTotalProducts } from "./redux/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/navbar/Navbar";
import StateMercadoPago from "./page/StateMercadoPago/StateMercadoPago";
import  AboutTeam  from "./page/about/aboutTeam.jsx";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import NewPublicPets from "./admin/pages/newPublicPets/NewPublicPets";
import AdminPet from "./admin/pages/adminPet/AdminPet";

import { getUser, uploadUser } from "./firebase/Users";

import { cartLoginFront, getQuantity } from "./redux/actions/cartActions";

import { openCartFront } from "./redux/actions/cartActions";

// Imports for settings managment
import { setSettings } from "./redux/actions";
import { getSettings, editSettingValues } from "./firebase/Settings";

// Import analytics functions
import {
  checkIfVisitAnalyticExists,
  uploadVisitAnalytic,
  updateVisitAnalytic,
} from "./firebase/Analytics/visits";
import { setVisitId } from "./redux/actions";

const auth = getAuth(firebaseApp);

function App() {
  // eslint-disable-next-line no-unused-vars
  var user = useSelector((state) => state.clientReducer.user);
  var settings = useSelector((state) => state.clientReducer.settings);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  //const [userLoading,setUserLoading] = useState(false)
  // const [cartLoading,setCartLoading] = useState(false)
  //let cartLoading = false

  var [visitSent, setVisitSent] = useState(false);
  var visitId = useSelector((state) => state.clientReducer.visitId);
  const dispatch = useDispatch();

  // If settings.useVisitsAnalytics is true and visitSent is false, send a visit to the analytics. Then set visitSent to true.
  useEffect(() => {
    // Check if settings has been loaded
    try {
      if (Object.keys(settings).length) {
        // Check if settings.useVisitsAnalytics is true
        if (settings.useVisitsAnalytics) {
          // Check if visitSent is false
          if (!visitSent) {
            // Send a visit to the analytics
            checkIfVisitAnalyticExists(visitId).then((exists) => {
              // If the visit does not exist, create it
              if (!exists) {
                uploadVisitAnalytic(user).then((visit) => {
                  dispatch(setVisitId(visit.uid));
                }).then(() => {
                  setVisitSent(true);
                });
              } else {
                // If the visit does exist, update it
                if (user && visitId) {
                  updateVisitAnalytic(visitId, user).then(() => {
                    setVisitSent(true);
                  });
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.log("Visit analytics error  :", error);
    }
  }, [settings, visitSent]);

  // Cart managment
  // useEffect(() => {
  //   dispatch(openCartFront(user));
  // }, [user]);

  // Console app setings
  useEffect(() => {
    getSettings().then((set) => {
      // console.log("Settings on firestore: ", set);
      dispatch(setSettings(set));
    });
  }, []);

  // When settings are fullfilled, if we change the values, we update the firestore
  useEffect(() => {
    // Get array lenght of keys from settings
    var keys = Object.keys(settings);
    // If lenght is not 0, update firestore
    if (keys.length > 0) {
      editSettingValues(settings);
    }
  }, [settings]);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        // If location is not "/" (home page), redirect to home page
        if (window.location.pathname === "/login") {
          window.location.href = "/";
        }
        // Checks if user exists in the database
        let userData = await getUser(usuarioFirebase.uid);
        // If the user does not exist, create it
        if (!userData) {
          userData = {
            email: usuarioFirebase.email,
            role: "Cliente",
            uid: usuarioFirebase.uid,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            phoneNumber: usuarioFirebase.phoneNumber,
            shippingAddress: "",
            name: "",
            surname: "",
            displayName: usuarioFirebase.displayName,
            photoURL: usuarioFirebase.phoneNumber,
            disabled: false,
          };
          // Upload the user to the database
          await uploadUser(usuarioFirebase.uid, userData);
        }
        // Set user in redux
        if (!user) {
          await dispatch(setUser(userData));
        }
        // Cart actions
        try {
          //setCartLoading(true)
          await dispatch(cartLoginFront(usuarioFirebase));
        } catch (error) {
          console.log("Cart actions error: ", error);
        }

        // Visits analytics
        setVisitSent(false);
      } else {
        dispatch(setUser(null));
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    console.log("opencart quantity", openCart);
    if (openCart && Object.keys(openCart).length) {
      if (user) {
        console.log("openCart que rompe",openCart)
        if(openCart[0]){
        dispatch(getQuantity(openCart[0].data.items)).then(
          console.log("quantity", openCart)
        ); 
      }else{
          dispatch(getQuantity(openCart.items))
        }
      } else {
        console.log("este open cart", openCart);
        dispatch(getQuantity(openCart.items)).then(
          console.log("quantity", openCart)
        );
      }
    } else {
      dispatch(getQuantity(openCart));
    }
  }, [openCart]);

  useEffect(() => {
    dispatch(getTotalProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return <>{user ? <Home/> : <Login/>}</>

  return (
    <div className={"App"}>
      <Router>
        <Routes>
          <Route
            exact
            path="/StateMercadoPago"
            element={<StateMercadoPago />}
          />
          <Route exact path="*" element={<ErrorPage />} />
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/" element={user ? <Home /> : <Login />} /> */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/usersettings" element={<UserSettings />} />
          <Route exact path="/pets" element={<PetsPage />} />
          <Route exact path="/pets/:id" element={<Pet />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createdProduct" element={<CreatedProduct />} />
          <Route exact path="/createdPet" element={<CreatedPets />} />
          <Route path="/about" element={<AboutTeam />} />

          <Route exact path="/admin" element={<AdminHome />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/adminProducts" element={<AdminProductList />} />
          <Route path="/adminProduct/:productId" element={<AdminProduct />} />
          <Route path="/adminPet/:id" element={<AdminPet />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/ventas" element={<Pyments />} />
          <Route path="/publicPets" element={<PublicPets />} />
          <Route path="/newPublicPets" element={<NewPublicPets />} />
          <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
