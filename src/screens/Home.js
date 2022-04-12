import React from "react";
import { firebaseApp } from "../firebase/credenciales";
import { Timestamp } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { Navbar } from "../components/navbar/Navbar.jsx";
const auth = getAuth(firebaseApp);

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <button onClick={() => signOut(auth)}>Cerrar cession</button>
    </div>
  );
}

export default Home;
