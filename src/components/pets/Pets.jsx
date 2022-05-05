import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getTotalPets,
  getSpeciesPets,
  getStateAllPets,
} from "../../redux/actions";
import Pet from "../pet/Pet";
import { Loader } from "../../page/loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { AsidePets } from "../../components/aside/Aside Pets";
import styled from "styled-components";

const MainAllCards = styled.div`
  box-sizing: border-box;
  display: grid;
  place-content: left;
  grid-template-columns: repeat(auto-fit, minmax(21em, 21em));
  margin: 2px;
  justify-content: center;
  min-height: 68vh;
  margin-right: 10em;
  margin-bottom: 5em;
`;

const Error = styled.h1`
  width: 30%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5em;
  line-height: 22px;
  position: absolute;
  right: 32%;
  top: 16%;
`;

const CatSleeping = styled.img`
  position: absolute;
  top: 15%;
  left: 40%;
`;

const Pets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPets = useSelector((state) => state.clientReducer.pets);
  // console.log('pets', allPets)
  const [loader, setLoader] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  const navigatePet = (e) => {
    navigate(`/pets/${e.currentTarget.id}`);
  };
  useEffect(() => {
    console.log("esto es all pets", allPets);
  }, [allPets]);

  useEffect(() => {
    dispatch(getSpeciesPets());
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
      <AsidePets />
      <MainAllCards>
        {allPets.length && typeof allPets !== "string" ? (
          allPets.map((e) => {
            return (
              <div key={e.uid} id={e.uid} onClick={(e) => navigatePet(e)}>
                <Pet
                  state={e.data.state}
                  category={e.data.category}
                  sexo={e.data.sexo}
                  name={e.data.name}
                  description={e.data.description}
                  photos={e.data.photos}
                  city={e.data.city}
                />
              </div>
            );
          })
        ) : (
          <div>
            <Error>
              Vaya! Parece que no hemos encontrado ninguna mascota con dichas
              caracteristicas
            </Error>
            <CatSleeping
              src="https://31.media.tumblr.com/e9c5a6eb1241c1cd3f89e12e89874c66/tumblr_mv1vm39xs51rz5dlbo1_500.gif"
              alt=""
            />
          </div>
        )}
        <div></div>
      </MainAllCards>
      <Footer />
    </div>
  );
};

export default Pets;
