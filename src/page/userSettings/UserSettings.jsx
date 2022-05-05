import React, { useState } from "react";
import { UserSettings as UserConfig } from "../../components/userSettings/UserSettings";
import UserSidebar from "../../components/userSidebar/UserSidebar";
import { Navbar } from "../../components/navbar/Navbar";
import styled from "styled-components";
import imgBackground from "../../assets/patrones_pet.png";
import MyOrders from '../../components/myOrders/MyOrders'
import MyReviews from '../../components/myReviews/MyReviews'
import MyForm from "../myForm/MyForm";
// import Footer from "../../components/footer/Footer";

const containerStyle = {
  backgroundImage: `url(${imgBackground})`,
  width: "100%",
  height: "100vh",
}


const UserSettings = () => {
  const [option, setOption] = useState('Orders');

  const handleChangeOption = (option) => {
    setOption(option)
  }


  return (
    <div style={containerStyle}>
      <Navbar />
      <UserSidebar handleChange={handleChangeOption} />
      {
        option === 'Modify'
          ? <UserConfig />
          :
          option === 'Orders'
            ? <MyOrders />
            :
            option === 'Reviews'
            ? <MyReviews />
            : option === 'Pets'
            && <MyForm />
      }
      {/* <Footer /> */}
    </div>
  );
};

export default UserSettings;
