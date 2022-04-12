import React from "react";
// import { firebaseApp } from "../firebase/credenciales";
// import { Timestamp } from "firebase/firestore";
// import { getAuth, signOut } from "firebase/auth";
// const auth = getAuth(firebaseApp);
import { signOutUsuario } from "../firebase/auth";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => signOutUsuario()}>Cerrar cession</button>
    </div>
  );
}

export default Home;
