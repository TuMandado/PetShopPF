import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
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
import StateMercadoPago from "./page/StateMercadoPago/StateMercadoPago"

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import NewPublicPets from "./admin/pages/newPublicPets/NewPublicPets";

import { getUser, uploadUser } from "./firebase/Users";
import { cartLoginFront } from "./redux/actions/cartActions";

// Imports for settings managment
import { setSettings } from "./redux/actions";
import { getSettings, editSettingValues } from "./firebase/Settings";

const auth = getAuth(firebaseApp);

function App() {
  // eslint-disable-next-line no-unused-vars
  var user = useSelector((state) => state.clientReducer.user);
  var settings = useSelector((state) => state.clientReducer.settings);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  
  const dispatch = useDispatch();

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

  onAuthStateChanged(auth, async (usuarioFirebase) => {
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

        if (!openCart && openCart.length == 0) {
        await dispatch(cartLoginFront(usuarioFirebase));
      }
      } catch (error) {
        console.log("Cart actions error: ", error);
      }
    } else {
      dispatch(setUser(null));
    }
  });

  useEffect(() => {
    dispatch(getTotalProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return <>{user ? <Home/> : <Login/>}</>

  return (
    <div className={"App"}>
      <Router>
        <Routes>
          <Route exact path="/StateMercadoPago" element={<StateMercadoPago />} />
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

          <Route exact path="/admin" element={<AdminHome />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/adminProducts" element={<AdminProductList />} />
          <Route path="/adminProduct/:productId" element={<AdminProduct />} />
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
