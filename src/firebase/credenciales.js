// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyC8GzqeVUSqJ-ZROVjzFVIjcUcrrTQzxPI",
  authDomain: "elpetshop-bd9d9.firebaseapp.com",
  projectId: "elpetshop-bd9d9",
  storageBucket: "elpetshop-bd9d9.appspot.com",
  messagingSenderId: "235565604328",
  appId: "1:235565604328:web:3e60b7d0e6b3db4ffc185d"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export {
  firebaseApp,
  db
}
