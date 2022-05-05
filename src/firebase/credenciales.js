// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyAcHKVuiISpf0Lq0RtyJoB-B2wSy8LwrHE",
  authDomain: "petshop-35b9a.firebaseapp.com",
  projectId: "petshop-35b9a",
  storageBucket: "petshop-35b9a.appspot.com",
  messagingSenderId: "744953839990",
  appId: "1:744953839990:web:08431cdfb31ee4a323fa57",
  measurementId: "G-44018Q639M"
  };

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export {
  firebaseApp,
  db
}
