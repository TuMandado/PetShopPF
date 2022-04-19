import { firebaseApp } from "../credenciales";
import { Timestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
} from "firebase/auth";
import { uploadUser } from "../Users";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

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

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log("Usuario iniciado sesion: ", user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signInWithFacebook = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...

  });
};

export default auth;
