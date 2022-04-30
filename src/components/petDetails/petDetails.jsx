import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { petDetails, detailVacio } from "../../redux/actions";
import styled from "styled-components";

const PetDetails = () => {
  // const user = useSelector((state) => state.clientReducer.user);
  const pet = useSelector((state) => state.clientReducer.backupDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useParams();
  /*   console.log("Uid flag =>", uid);
  console.log("PETS =>", pet); */

  const navigateToPets = (e) => {
    e.preventDefault();
    // navigate(`/pets`);
    window.history.back()
  };

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
        <NameContainer>
          <Name>{pet.name}</Name>
        </NameContainer>
        <DivContainers>
          <div>
            <Image
              src={pet.photos || "https://imgur.com/lhLYKao"}
              alt="imagen"
            />
          </div>
          <div>
            <TagContainer>
              <div>
                <Category>Animal: {pet.category}</Category>
              </div>
              <div>
                <State>Estado: {pet.state}</State>
              </div>
              <div>
                <Sexo>Sexo: {pet.sexo}</Sexo>
              </div>
            </TagContainer>
            <InfoContainer>
              <SobrePet>Sobre {pet.name}:</SobrePet>
              <Description>{pet.description}</Description>
            </InfoContainer>
          </div>
        </DivContainers>
        <MapContainer>
          <span>Localidad/Mapa</span>
        </MapContainer>
        <BtnContainer>
          <Link to="/pets">
            <BtnToPets onClick={(e) => navigateToPets(e)}>Volver</BtnToPets>
          </Link>
        </BtnContainer>
      </div>

      <Footer />
    </div>
  );
};

export default PetDetails;

const NameContainer = styled.div`
  height: 60px;
  width: 100%;
  text-align: center;
`;

const Name = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  margin: 0px auto;
  padding-top: 18px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
  &:hover {
    color: #0acf83;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 380px;
  height: 360px;
  border-radius: 12px;
  align-items: center;
  margin-top: 8px;
  left: 35px;
  position: relative;
`;

const State = styled.h4`
  position: static;
  left: 20%;
  right: 20%;
  top: 0%;
  bottom: 0%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #0acf83;
  background: #f4f8ec;
  border-radius: 10px;
  margin: 2px;
`;

const Category = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #151515;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const Sexo = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #eb8d70;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const Description = styled.p`
  max-width: 690px;
  max-height: 320px;
  padding-top: 42px;
  padding-left: 35px;
  position: absolute;
  top: 15px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 300;
  font-size: 21px;
  line-height: 29px;
  position: static;
  margin-bottom: 6px;
  margin-top: 15px;

  color: #151515;
`;

const TagContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 2px;
  margin-top: 8px;
  left: 35px;
`;

const DivContainers = styled.div`
  display: grid;
  grid-gap: 6rem;
  grid-template-columns: 341px 600px;
  grid-template-rows: 160px 160px;
`;

const InfoContainer = styled.div`
  display: flex;
  position: absolute;
`;

const SobrePet = styled.h3`
  width: 900px;
  max-height: 80px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  position: absolute;
  padding-top: 18px;
  left: 35px;
`;

const MapContainer = styled.div`
  height: 80px;
  width: 100%;
  text-align: center;
`;

const BtnContainer = styled.div`
  height: 50px;
  width: 100%;
  text-align: center;
  padding-top: 10px;
`;

const BtnToPets = styled.button`
  display: absolute;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
  width: 105px;
  height: 35px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    color: #0acf83;
    background: #ffff;
    border: 3px solid #067a4d;
    cursor:pointer;
  }
`;
