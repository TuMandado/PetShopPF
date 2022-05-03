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
  sendPasswordResetEmail,
} from "firebase/auth";
import Swal from "sweetalert2";
import { uploadUser,getUser,getAllUsers } from "../Users";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export const signInUsuario = (email, password) => {

  // let userresult=userall.filter((r)=>r.email===email)
  signInWithEmailAndPassword(auth, email, password)
    .then(async (user) => {
      console.log("Usuario iniciado sesion: ", user);
     let resul= await verifidisable(user.uid)
     if(resul){
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "El usuario esta deshabilitado.",
        showConfirmButton: false,
        timer: 1500,
      });
     }
      // return userresult
    })
    .catch((error) => {
      errorAuth(error);
    });
};

export async function registrarUsuario(email, password, role) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("Usuario registrado: ", user);
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Fuiste registrado con éxito.",
        showConfirmButton: false,
        timer: 1500,
      });

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
      console.log("Usuario iniciado sesion: ", user.uid);
      let userverificad=verifidisable(user.uid)
      
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
      verifidisable(user.uid)
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

export const verifidisable=(uid)=>{
  getUser(uid)
  .then((res)=>{
     if (res.disabled === true){
       console.log('pase x true')
       let error={
         code:"auth/user-disabled"
       }
      //  
      errorAuth(error)
      return true
     }
     else{
       return
     }
  })
  .catch((error)=>{
    console.log('error de la verificacion del disabled')
  })


}

export const recoveryPassword = async (email) => {
  sendPasswordResetEmail(auth, email)
    .then((user) => {
      // return Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Verifica tu correo electrónico para restablecer tu contraseña.",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    })
    .catch((error) => {
      errorAuth(error);
    });
};

export const errorAuth = (error) => {
  if (error.code === "auth/user-not-found") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Usuario no encontrado.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/wrong-password") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Error",
      text: "Contraseña incorrecta.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-email") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Error",
      text: "El e-mail ingresado es incorrecto.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/too-many-requests") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "¡Error faltal!",
      text: "Superaste el limite de intentos. Regresa más tarde.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/user-disabled") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "El usuario esta deshabilitado.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  if (error.code === "auth/operation-not-allowed") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Acción no permitida.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/email-already-in-use") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Cuidado...",
      text: "El e-mail ingresado ya esta en uso.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/popup-blocked") {
    return Swal.fire({
      position: "center",
      icon: "error",
      text: "Pop-up bloqueado.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/popup-closed-by-user") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Cerraste el Pop-up. ¡Intenta de nuevo!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/credential-already-in-use") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Esta credencial ya esta en uso. ¡Intenta con otra!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/network-request-failed") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Ocurrio un error de red. Verifica tu conexión.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-credential") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Error",
      text: "Credencial invalida.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/operation-not-allowed") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Operacion no permitida por el administrador.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/requires-recent-login") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Para continuar, debes iniciar sesión.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/user-token-expired") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Token de usuario expirado.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/web-storage-unsupported") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Web storage no soportado",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-api-key") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "La API KEY es invalida.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/app-deleted") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Error fatal",
      text: "La app fue eliminada.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-user-token") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "El token de usuario es invalido.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-tenant-id") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Tentant-id invalido.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-custom-token") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Token personalizado invalido.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (error.code === "auth/invalid-auth-event") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Evento de autenticacion invalido. ¡Intenta de nuevo!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // auth/account-exists-with-different-credential
  if (error.code === "auth/account-exists-with-different-credential") {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Ya existe una cuenta con esta credencial.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export default auth;
