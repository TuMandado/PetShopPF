
import React from "react";
import { firebaseApp } from "../firebase/credenciales";
import { Timestamp } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { Navbar } from "../components/navbar/Navbar.jsx";
const auth = getAuth(firebaseApp);
import React from 'react'
// import { firebaseApp } from "../firebase/credenciales";
// import { Timestamp } from "firebase/firestore";
// import { getAuth, signOut } from "firebase/auth";
// const auth = getAuth(firebaseApp);
import { signOutUsuario } from '../firebase/auth'


function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <button onClick={() => signOut(auth)}>Cerrar cession</button>

        <h1>Home</h1>
        <button onClick={() => signOutUsuario()}>
            Cerrar cession
        </button>
    </div>
  );
}

export default Home;
