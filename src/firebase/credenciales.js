// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDSeGsJVCidCygc0jlT_7badGkPBKvL5CU",
  authDomain: "mipetshop-1c38d.firebaseapp.com",
  projectId: "mipetshop-1c38d",
  storageBucket: "mipetshop-1c38d.appspot.com",
  messagingSenderId: "672657660917",
  appId: "1:672657660917:web:32b7f47e22e374053cdebc",
  measurementId: "G-CZP0JPSQGE"

  // apiKey: "AIzaSyAcHKVuiISpf0Lq0RtyJoB-B2wSy8LwrHE",
  // authDomain: "petshop-35b9a.firebaseapp.com",
  // projectId: "petshop-35b9a",
  // storageBucket: "petshop-35b9a.appspot.com",
  // messagingSenderId: "744953839990",
  // appId: "1:744953839990:web:08431cdfb31ee4a323fa57",
  // measurementId: "G-44018Q639M"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export {
  firebaseApp,
  db
}
