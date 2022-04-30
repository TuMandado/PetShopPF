import React from "react";
import { UserSettings as UserConfig } from "../../components/userSettings/UserSettings";
import { Navbar } from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";

const UserSettings = () => {
  return (
    <div>
      <Navbar />
      <UserConfig />
      {/* <Footer /> */}
    </div>
  );
};

export default UserSettings;
