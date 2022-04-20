import React from "react";
import NavbarPets from "../../components/navbar/Navbar Pets";
import Pets from "../../components/pets/Pets";

const PetsPage = () => {
  return (
    <div>
      <NavbarPets />
      <Pets />
    </div>
  );
};

export default PetsPage;
