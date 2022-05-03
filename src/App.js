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
import PaymentDetail from "./admin/pages/paymentDetail/PaymentDetail";
import PublicPets from "./admin/pages/publicPets/PublicPets";
import Swal from "sweetalert2";

import { getTotalProducts } from "./redux/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getAllUsers} from '../src/firebase/Users/index'
import {emailSignIn} from '../src/firebase/emails'

import StateMercadoPago from "./page/StateMercadoPago/StateMercadoPago";
import AboutTeam from "./page/about/aboutTeam.jsx";
import {signOutUsuario} from '../src/firebase/auth/index'

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import NewPublicPets from "./admin/pages/newPublicPets/NewPublicPets";
import AdminPet from "./admin/pages/adminPet/AdminPet";

import { getUser, uploadUser } from "./firebase/Users";

import { cartLoginFront, getQuantity } from "./redux/actions/cartActions";

// import { openCartFront } from "./redux/actions/cartActions";

// Imports for settings managment
import { setSettings } from "./redux/actions";
import { getSettings, editSettingValues } from "./firebase/Settings";

// Import analytics functions
import {
  uploadVisitAnalytic,
  updateVisitAnalytic,
  createId,
} from "./firebase/Analytics/visits";
import { setVisitId } from "./redux/actions";

const auth = getAuth(firebaseApp);

function App() {
  // eslint-disable-next-line no-unused-vars
  var user = useSelector((state) => state.clientReducer.user);
  var settings = useSelector((state) => state.clientReducer.settings);
  var [appSettings, setAppSettings] = useState(null);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  // var [visitSent, setVisitSent] = useState(false);
  var visitId = useSelector((state) => state.clientReducer.visitId);
  let [duration, setDuration] = useState(0);
  const dispatch = useDispatch();
  var [visitSent, setVisitSent] = useState(false);
  var [location, setLocation] = useState({
    lat: '',
    lng: '',
  });

  // When app is mounted and navigation.locations is granted, set location
  //     "location": {
  //         "lat": "",
  //         "lng": ""
  //     },
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location error: ", error);
        }
      );
    }
  }, []);

  // Console log location
  // useEffect(() => {
  //   console.log("Location: ", location);
  // }, [location]);

  // // Console.log visitId
  // useEffect(() => {
  //   console.log("visitId: ", visitId);
  // }, [visitId]);

  // // Console.log settings
  // useEffect(() => {
  //   console.log("Settings: ", settings);
  // }, [settings]);

  // // Console.log appSettings
  // useEffect(() => {
  //   console.log("AppSettings: ", appSettings);
  // }, [appSettings]);

  // When app is mounted a visiId with a random string is created and delete if when the app is unmounted
  useEffect(() => {
    if (visitId === null) {
      createId().then((id) => {
        dispatch(setVisitId(id));
      });
    }
  }, []);

  // When settings are loaded, update the appSettings, and then upload the visit analytic.
  useEffect(() => {
    if (
      settings !== null &&
      appSettings === null &&
      Object.keys(settings).length > 0
    ) {
      setAppSettings(settings);
      uploadVisitAnalytic(visitId, user, duration, location).then(() => {
        // console.log("Visit analytic uploaded");
        setVisitSent(true);
      });
    }
  }, [settings]);

  // When user is loaded, update the visit analytic.
  useEffect(() => {
    if (user !== null) {
      if (settings !== null && Object.keys(settings).length > 0) {
        // console.log("settings: ", settings);
        if (settings.useVisitsAnalytics === true) {
          if (visitId !== null) {
            if (visitSent) {
              updateVisitAnalytic(visitId, user, duration, location).then(() => {
                // console.log("Visit analytic updated with user");
              });
            }
          }
        }
      }
    }
  }, [user, appSettings, visitSent]);

  // When settings are loaded and useVisitDurationAnalytics is true, start the timer.
  useEffect(() => {
    if (settings !== null && Object.keys(settings).length > 0) {
      // console.log(
      //   "settings.useVisitDurationAnalytics",
      //   settings.useVisitDurationAnalytics
      // );
      if (settings.useVisitDurationAnalytics === true) {
        setDuration(0);
        //console.log("Visit analytic timer started");
        var interval = setInterval(() => {
          duration++;
          setDuration(duration);
          // console.log("Visit analytic timer: ", duration);
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [appSettings]);

  // // Console duration
  // useEffect(() => {
  //   console.log(duration);
  // }, [duration]);

  // If the timer is runing, update the visit analytic each 20 seconds.
  useEffect(() => {
    if (settings !== null && Object.keys(settings).length > 0) {
      if (settings.useVisitDurationAnalytics === true) {
        if (duration % 20 === 0) {
          if (visitId !== null) {
            updateVisitAnalytic(visitId, user, duration, location).then(() => {
              // console.log(
              //   "Visit analytic updated with duration of " + duration
              // );
            });
          }
        }
      }
    }
  }, [duration]);

  // Console app setings
  useEffect(() => {
    getSettings().then((set) => {
      // console.log("Settings on firestore: ", set);
      dispatch(setSettings(set));
    });
  }, [dispatch]);

  // When settings are fullfilled, if we change the values, we update the firestore
  useEffect(() => {
    // Get array lenght of keys from settings
    var keys = Object.keys(settings);
    // If lenght is not 0, update firestore
    if (keys.length > 0) {
      editSettingValues(settings);
    }
  }, [appSettings]);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (usuarioFirebase) => {
      // console.log('usuario firebase',usuarioFirebase)
      
      
      if (usuarioFirebase) {
        console.log('antes de verific',usuarioFirebase)
          let allusers=await getAllUsers()
          let verific= allusers.filter((u)=>u.data.email === usuarioFirebase.email)
          if(verific.length>0)usuarioFirebase=verific[0]
          console.log('despues del verific',usuarioFirebase)
          let userData = await getUser(usuarioFirebase.uid);
          console.log(allusers)
          console.log(verific)
          console.log(userData)
          if(userData ){
            if( userData.disabled === true ){
              console.log('entre a disable true')
              await signOutUsuario()
              return (Swal.fire({
                position: "center",
                icon: "error",
                title: "Oops...",
                text: "El usuario esta deshabilitado.",
                showConfirmButton: false,
                timer: 3000,
              }))
            }
          }
          // If location is not "/" (home page), redirect to home page
          if (window.location.pathname === "/login") {
            window.location.href = "/";
          }
          
          // Checks if user exists in the database
          // If the user does not exist, create it
          // console.log('userdata',userData)
          if (!userData) { 
            console.log('usuarionuevo... ver mails')
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
              // envio mails de bienvenida 
              await emailSignIn(userData)
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
        // // Visits analytics
        // setVisitSent(false);
      } else {
        dispatch(setUser(null));
      }
    });
    return subscriber;
  }, [dispatch, user]);

  useEffect(() => {
    console.log("opencart quantity", openCart);
    if (openCart && Object.keys(openCart).length) {
      if (user) {
        console.log("openCart que rompe", openCart);
        if (openCart[0]) {
          dispatch(getQuantity(openCart[0].data.items)).then(
            console.log("quantity", openCart)
          );
        } else {
          dispatch(getQuantity(openCart.items));
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
  }, [dispatch, openCart, user]);

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
          <Route exact path="/usersettings/:id" element={<UserSettings />} />
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
          <Route path="/ventas/:payId" element={<PaymentDetail />} />
          <Route path="/publicPets" element={<PublicPets />} />
          <Route path="/newPublicPets" element={<NewPublicPets />} />
          <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
