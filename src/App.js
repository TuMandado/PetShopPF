import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
//Importamos la aplicación/credenciales
import { firebaseApp } from "./firebase/credenciales";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions";
// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { uploadPet, deletePet, getPet, getAllPets } from "./firebase/Pets";
import Home from "./page/home/Home";
// eslint-disable-next-line no-unused-vars
import Login from "./page/login/Login";
import ProductList from "./page/productList/ProductList";
import Product from "./page/product/Product";
import Cart from "./page/cart/Cart";
import PetsPage from "./page/pets/PetsPage";
import Register from "./page/register/Register";
import UserSettings from "./page/userSettings/UserSettings";
import ErrorPage from "./page/error/Error";
import CreatedProduct from './page/createdProduct/CreatedProduct'

import AdminHome from "./admin/pages/adminHome/AdminHome";
import UserList from "./admin/pages/userList/UserList";
import User from "./admin/pages/user/User";
import NewUser from "./admin/pages/newUser/NewUser";
import AdminProductList from "./admin/pages/adminProductList/AdminProductList";
import AdminProduct from "./admin/pages/adminProduct/AdminProduct";
import NewProduct from "./admin/pages/newProduct/NewProduct";
import Pyments from "./admin/pages/pyments/Pyments";
import PublicPets from "./admin/pages/publicPets/PublicPets";
import AdminSidebar from "./admin/components/adminSidebar/AdminSidebar";

import { getTotalProducts } from './redux/actions';


// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/navbar/Navbar";
const auth = getAuth(firebaseApp);

function App() {
  // eslint-disable-next-line no-unused-vars
  var user = useSelector((state) => state.clientReducer.user);
  const dispatch = useDispatch();
  
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      dispatch(setUser(usuarioFirebase));
      dispatch(setUserCart(usuarioFirebase));
    } else {
      dispatch(setUser(null));
      dispatch(setUserCart(null));
    }
  });

  useEffect(() => {
    dispatch(getTotalProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return <>{user ? <Home/> : <Login/>}</>

  return (
    <div className={"App"}>
      <Router>
         <Routes>
             <Route exact path="*" element={<ErrorPage />} />
             <Route exact path="/" element={<Home />} />
             {/* <Route exact path="/" element={user ? <Home /> : <Login />} /> */}
             <Route path="/products" element={<ProductList />} />
             <Route path="/product/:id" element={<Product />} />
             <Route exact path="/cart" element={<Cart />} />
             <Route exact path="/admin" element={<AdminHome />} />
             <Route exact path="/usersettings" element={<UserSettings />} />
             <Route exact path="/pets" element={<PetsPage />} />
             <Route exact path="/register" element={<Register />} />
             <Route exact path="/login" element={<Login />} />
             {<Route exact path="/createdProduct" element={<CreatedProduct/>} />}
   
             <Route exact path="/admin" element={<AdminHome />} />
             <Route path="/users" element={<UserList />} />
             <Route path="/user/:userId" element={<User />} />
             <Route path="/newUser" element={<NewUser />} />
             <Route path="/adminProducts" element={<AdminProductList />} />
             <Route path="/adminProduct/:productId" element={<AdminProduct />} />
             <Route path="/newProduct" element={<NewProduct />} />
             <Route path="/ventas" element={<Pyments />} />
             <Route path="/publicPets" element={<PublicPets />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
