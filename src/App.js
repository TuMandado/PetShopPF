import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
//Importamos la aplicación/credenciales
import { firebaseApp } from "./firebase/credenciales";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions";
// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { uploadPet, deletePet, getPet, getAllPets } from "./firebase/Pets";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import ProductList from "./page/productList/ProductList";
import Product from "./page/product/Product";
import Cart from "./page/cart/Cart";
import Admin from "./page/admin/Admin";
import Pets from "./page/pets/Pets";
import Register from "./page/register/Register";
import UserSettings from "./page/userSettings/UserSettings";
import ErrorPage from "./page/error/Error";
// import { pushDataToDatabase } from "./firebase/PreLoadData";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  var user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // pushDataToDatabase(10, 22);
  },[])

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      dispatch(setUser(usuarioFirebase));
    } else {
      dispatch(setUser(null));
    }
  });

  // return <>{user ? <Home/> : <Login/>}</>

  return (
    <div className={"App"}>
      <Router>
        <Routes>
          <Route exact path="*" element={<ErrorPage />} />
          <Route exact path="/" element={user ? <Home /> : <Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/UserSettings" element={<UserSettings />} />
          <Route exact path="/pets" element={<Pets />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
