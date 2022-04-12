import React, { useState } from "react";
import { firebaseApp } from "../firebase/credenciales";
import { Timestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { uploadUser } from "../firebase/Users";
const auth = getAuth(firebaseApp);
import { signInUsuario, registrarUsuario } from "../firebase/auth";


function Login() {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const signInUsuario = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Usuario iniciado sesion: ", user);
      });
  };

  async function registrarUsuario(email, password, role) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("Usuario registrado: ", user);
        uploadUser(user.user.uid, {
          email: user.user.email,
          role: role,
          uid: user.user.uid,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      })
      .catch((error) => {
        console.log("Error al registrar usuario: ", error);
      });
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = "Cliente";
    console.log("Formulario enviado", email, password, role);
    if (isRegistrando) {
      registrarUsuario(email, password, role);
    } else {
      signInUsuario(email, password);
    }
  };

  return (
    <div>
      <h1>{isRegistrando ? "Registrarse" : "Iniciar sesion"}</h1>

      <form onSubmit={submitHandler}>
        <label>
          Email:
          <input type="email" id="email" />
        </label>

        <label>
          Password:
          <input type="password" id="password" />
        </label>

        <input
          type="submit"
          value={isRegistrando ? "Registrar" : "Iniciar sesion"}
        />
      </form>

      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo un cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;
