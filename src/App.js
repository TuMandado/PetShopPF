import React, {useEffect, useState} from "react";
//Importamos la aplicación/credenciales
import {firebaseApp} from "./firebase/credenciales";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { uploadPet, deletePet, getPet, getAllPets } from "./firebase/Pets";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { setUser } from "./redux/actions";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  var user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      dispatch(setUser(usuarioFirebase));
    } else {
      dispatch(setUser(null));
    }
  });

  return <>{user ? <Home/> : <Login/>}</>
}

export default App;
