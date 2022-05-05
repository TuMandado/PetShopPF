// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyAMYIMgnd_P86SV4tKRn0pCZ0eu7kiZGs4",
  authDomain: "el-tercer-petshop.firebaseapp.com",
  projectId: "el-tercer-petshop",
  storageBucket: "el-tercer-petshop.appspot.com",
  messagingSenderId: "227523572947",
  appId: "1:227523572947:web:ed02b742a75a6267649026",
  measurementId: "G-8G3CRM17C6"
  };

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export {
  firebaseApp,
  db
}
