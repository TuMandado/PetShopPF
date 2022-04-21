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
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("Usuario iniciado sesion: ", user);
    })
    .catch((error) => {
      errorAuth(error);
    });
};

export async function registrarUsuario(email, password, role) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("Usuario registrado: ", user);
      // uploadUser(user.user.uid, {
      //   email: user.user.email,
      //   role: role,
      //   uid: user.user.uid,
      //   createdAt: Timestamp.now(),
      //   updatedAt: Timestamp.now(),
      // });
    })
    .catch((error) => {
      errorAuth(error);
    });
}

export const signOutUsuario = () => {

    signOut(auth).catch((error) => {
      errorAuth(error);
    });
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
      errorAuth(error);
    });
};

export const signInWithFacebook = () => {
  signInWithPopup(auth, providerFacebook)
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
      errorAuth(error);
    });
};

export const errorAuth = (error) => {
  if (error.code === "auth/user-not-found") {
    alert("Usuario no encontrado");
  }
  if (error.code === "auth/wrong-password") {
    alert("Contraseña incorrecta");
  }
  if (error.code === "auth/invalid-email") {
    alert("Email incorrecto");
  }
  if (error.code === "auth/too-many-requests") {
    alert("Demasiados intentos");
  }
  if (error.code === "auth/user-disabled") {
    alert("Usuario deshabilitado");
  }
  if (error.code === "auth/operation-not-allowed") {
    alert("Operacion no permitida");
  }
  if (error.code === "auth/email-already-in-use") {
    alert("Email ya en uso");
  }
  if (error.code === "auth/popup-blocked") {
    alert("Popup bloqueado");
  }
  if (error.code === "auth/popup-closed-by-user") {
    alert("Popup cerrado por el usuario");
  }
  if (error.code === "auth/credential-already-in-use") {
    alert("Credencial ya en uso");
  }
  if (error.code === "auth/network-request-failed") {
    alert("Error de red");
  }
  if (error.code === "auth/invalid-credential") {
    alert("Credencial invalida");
  }
  if (error.code === "auth/operation-not-allowed") {
    alert("Operacion no permitida");
  }
  if (error.code === "auth/requires-recent-login") {
    alert("Es necesario iniciar sesion");
  }
  if (error.code === "auth/user-token-expired") {
    alert("Token de usuario expirado");
  }
  if (error.code === "auth/web-storage-unsupported") {
    alert("Web storage no soportado");
  }
  if (error.code === "auth/invalid-api-key") {
    alert("API key invalida");
  }
  if (error.code === "auth/app-deleted") {
    alert("App eliminada");
  }
  if (error.code === "auth/invalid-user-token") {
    alert("Token de usuario invalido");
  }
  if (error.code === "auth/invalid-tenant-id") {
    alert("Tenant id invalido");
  }
  if (error.code === "auth/invalid-custom-token") {
    alert("Token personalizado invalido");
  }
  if (error.code === "auth/invalid-auth-event") {
    alert("Evento de autenticacion invalido");
  }
};

export default auth;
