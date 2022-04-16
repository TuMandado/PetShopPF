import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTotalPets } from "../../redux/actions";
import Pet from "../pet/Pet";
import { Loader } from "../../page/loader/Loader";
import { Link } from "react-router-dom";
import NavbarPets from "../../components/navbar/Navbar Pets";
import Footer from "../../components/footer/Footer";
import { AsidePets } from "../../components/aside/Aside Pets";
import styled from "styled-components";

const Boton = styled.button`
  width: 120px;
  height: 45px;
  position: relative;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  color: #ffff;
  padding: 10px 10px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  left: 157px;
  top: 10px;
  margin-bottom: 10px;
`;

const MainAllCards = styled.div`
  box-sizing: border-box;
  display: grid;
  place-content: left;
  grid-template-columns: repeat(3, 16em);
  margin: 18px;
  min-height: 68vh;
`;

const Pets = () => {
  const dispatch = useDispatch();

  const allPets = useSelector((state) => state.clientReducer.backupPets);
  console.log("esto es allPets", allPets);


  const [loader, setLoader] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getTotalPets())
      .then((response) => {
        setLoader(false);
      })
      .catch((error) => setError(error.message));
  }, [dispatch]);

  if (loader) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <NavbarPets />
      <AsidePets />
      <MainAllCards>
        {allPets.length > 0 ? (
          allPets.map((e) => {
            return (
              <div>
                <Pet
                  state={e.data.state}
                  category={e.data.category}
                  sexo={e.data.sexo}
                  description={e.data.description}
                  photos={e.data.photos}
                />
              </div>
            );
          })
        ) : (
          <div>
            <h1>Error, no hay datos</h1>
          </div>
        )}
        <div></div>
      </MainAllCards>
      <Link to="/">
        <Boton>Volver a Home</Boton>
      </Link>

      <Footer />
    </div>
  );
};

export default Pets;
