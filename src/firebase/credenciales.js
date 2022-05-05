// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyBD-gA0XYzZ8lVcZyKHBlEwnsnHcHARW5k",
  authDomain: "petshop-30da4.firebaseapp.com",
  projectId: "petshop-30da4",
  storageBucket: "petshop-30da4.appspot.com",
  messagingSenderId: "928191741660",
  appId: "1:928191741660:web:68e215debb0b31a802be19",
  measurementId: "G-63KVPQFE59"
  };

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export {
  firebaseApp,
  db
}
