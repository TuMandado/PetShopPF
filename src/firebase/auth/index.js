import { firebaseApp } from "../credenciales";
import { Timestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { uploadUser } from "../Users";
const auth = getAuth(firebaseApp);

export const signInUsuario = (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      console.log("Usuario iniciado sesion: ", user);
    });
  } catch (error) {
    alert("Error al iniciar sesión: ", error);
    console.log("Error al iniciar sesión: ", error);
  }
};

export async function registrarUsuario(email, password, role) {
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
      alert("Error al registrar usuario: ", error);
    });
}

export const signOutUsuario = () => {
    try {
        signOut(auth);
    } catch (error) {
        alert("Error al cerrar sesión: ", error);
        console.log("Error al cerrar sesión: ", error);
    }
    };
