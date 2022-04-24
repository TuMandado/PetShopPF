import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { petDetails, detailVacio } from "../../redux/actions";
import styled from "styled-components";

const Name = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
  &:hover {
    color: #0acf83;
  }
`;

const Image = styled.img`
  max-width: 250;
  max-height 250;
`;

const PetDetails = () => {
  // const user = useSelector((state) => state.clientReducer.user);
  const pet = useSelector((state) => state.clientReducer.backupDetail);
  const dispatch = useDispatch();
  const uid = useParams();
  /*   console.log("Uid flag =>", uid);
  console.log("PETS =>", pet); */

  useEffect(() => {
    dispatch(petDetails(uid.id));
    return function () {
      dispatch(detailVacio());
    };
  }, [dispatch, uid.id]);

  if (!pet.name) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <Name>{pet.name}</Name>
          <div>
            <Image
              src={pet.photos || "https://imgur.com/lhLYKao"}
              alt="imagen"
            />
          </div>
          <div>
            <div>
              <div>
                <h5>Animal: {pet.category}</h5>
              </div>
              <div>
                <h5>Estado: {pet.state}</h5>
              </div>
              <div>
                <h5>Sexo: {pet.sexo}</h5>
              </div>
            </div>
            <div>
              <div>
                <h5>Sobre {pet.name}:</h5>
                <p>{pet.description}</p>
              </div>
              <div>
                <button>Algo</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link to="/pets">
            <button>Volver</button>
          </Link>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default PetDetails;
