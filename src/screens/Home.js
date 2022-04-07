import React from 'react'
import { firebaseApp } from "../firebase/credenciales";
import { Timestamp } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

function Home() {
  return (
    <div>
        <h1>Home</h1>
        <button onClick={() => signOut(auth)}>
            Cerrar cession
        </button>
    </div>
  )
}

export default Home