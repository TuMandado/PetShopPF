// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {

  apiKey: "AIzaSyA094QaqT9-fNWEDpCPjZERoOChKTN2t2I",

  authDomain: "petshop-106f4.firebaseapp.com",

  projectId: "petshop-106f4",

  storageBucket: "petshop-106f4.appspot.com",

  messagingSenderId: "792167465566",

  appId: "1:792167465566:web:a26fac73cd63b98c71aacf",

  measurementId: "G-GZ4CGRS9C6"

};



// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export {
  firebaseApp,
  db
}
