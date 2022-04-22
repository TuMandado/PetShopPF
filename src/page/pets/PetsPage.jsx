import React from "react";

import NavBar from '../../components/navbar/Navbar'
import Pets from "../../components/pets/Pets";

const PetsPage = () => {
  return (
    <div>
      <NavBar/>
      <Pets />
    </div>
  );
};

export default PetsPage;
