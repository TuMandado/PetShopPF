import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Mapa from "../../components/map/Map";
import Footer from "../../components/footer/Footer";
import { petDetails, detailVacio } from "../../redux/actions";
import styled from "styled-components";
import Swal from "sweetalert2";

const PetDetails = () => {
  const user = useSelector((state) => state.clientReducer.user);
  console.log("User en PETS =>", user);
  const pet = useSelector((state) => state.clientReducer.backupDetail);
  const allPetsGeo = useSelector((state) => state.clientReducer.backupPets);
  console.log("PET DETAIL =>", pet);
  console.log("ALL PET EN DETAIL =>", allPetsGeo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uid = useParams();
  /*   console.log("Uid flag =>", uid);
   */

  const navigateToBack = (e) => {
    e.preventDefault();
    // navigate(`/pets`);
    window.history.back(-1);
  };

  const navigateToWhats = (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire({
        title: "¡Logueate!",
        text: " Debes estar logeado o registrado para hacer esta acción. ¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0acf83",
        cancelButtonColor: "#e6704b",
        confirmButtonText: "Ir al login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/login`);
        }
      });
    } else {
      if (pet.state === "perdido")
        window.open(
          `https://api.whatsapp.com/send?phone=549${pet.userPhone}&text=Hola, ${
            pet.userOwnName
          }! soy ${
            user.name ? user.name : "vengo de la web El Petshop."
          }. ¡Tengo información sobre ${pet.name}!`,
          "_blank"
        );
      if (pet.state === "en adopcion")
        window.open(
          `https://api.whatsapp.com/send?phone=549${pet.userPhone}&text=Hola, ${
            pet.userOwnName
          }! soy ${
            user.name ? user.name : "vengo de la web El Petshop."
          }. ¡Quiero adoptar a ${pet.name}!`,
          "_blank"
        );
      if (pet.state === "encontrado")
        window.open(
          `https://api.whatsapp.com/send?phone=549${pet.userPhone}&text=Hola, ${
            pet.userOwnName
          }! soy ${
            user.name ? user.name : "vengo de la web El Petshop."
          }. ¡Soy el dueño/a de ${pet.name}!`,
          "_blank"
        );
    }
  };

  useEffect(() => {
    dispatch(petDetails(uid.id));
    return function () {
      dispatch(detailVacio());
    };
  }, [dispatch, uid.id]);

  /* useEffect(() => {
    getLocation(pet.number, pet.street, pet.city);
    console.log("EUGE=>", pet.number, pet.street, pet.city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet]); */

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
              src={pet.photos || "https://i.imgur.com/9bULXjH.png"}
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
        <InferiorDivContainer>
          <HelpMap>
            <Referencias>Referencias:</Referencias>
            <LocalUbication>Tu ubicacion</LocalUbication>
            <PetsUbication>La mascota</PetsUbication>
            {pet.state === "perdido" && (
              <Aviso>
                Si estas seguro de haber encontrado o visto a {pet.name}, podés
                contactar a su dueño......
                <WhatsAppButton onClick={(e) => navigateToWhats(e)}>
                  WhatsApp {">"}
                </WhatsAppButton>
              </Aviso>
            )}
            {pet.state === "en adopcion" && (
              <Aviso>
                Si estas interesado en adoptar a {pet.name} y darle mucho amor,
                podés contactar a quien lo haya publidado escribiendole a:
                <WhatsAppButton onClick={(e) => navigateToWhats(e)}>
                  WhatsApp {">"}
                </WhatsAppButton>
              </Aviso>
            )}
            {pet.state === "encontrado" && (
              <Aviso>
                ¿Sos el dueño de {pet.name}? Si estás seguro que es tu mascota,
                podes coordinar para verla y traerla de nuevo a tu hogar
                escribiendole a:
                <WhatsAppButton onClick={(e) => navigateToWhats(e)}>
                  WhatsApp {">"}
                </WhatsAppButton>
              </Aviso>
            )}
          </HelpMap>
          <MapContainer>
            <Mapa
              showUserLocation={true}
              locations={[
                {
                  lat: pet.lat,
                  lng: pet.lng,
                },
              ]}
            />
          </MapContainer>
        </InferiorDivContainer>
        <BtnContainer>
          <Link to="/pets">
            <BtnToPets onClick={(e) => navigateToBack(e)}>Volver</BtnToPets>
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

const HelpMap = styled.div`
  width: 450px;
  height: 360px;
  text-aligne: center;
  left: 35px;
  position: relative;
`;

const Referencias = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  margin: 0px auto;
  padding-top: 18px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
`;

const LocalUbication = styled.h4`
  position: static;
  left: 20%;
  right: 20%;
  bottom: 0%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #0acf83;
  margin: 2px;
  margin-top: 15px;
`;

const PetsUbication = styled.h4`
  position: static;
  color: #eb8d70;
  left: 20%;
  right: 20%;
  bottom: 0%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  border-radius: 10px;
  margin: 2px;
  margin-top: 15px;
`;

const InferiorDivContainer = styled.div`
  display: grid;
  grid-gap: 6rem;
  grid-template-columns: 350px 150px;
  grid-template-rows: 5px 5px;
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
  width: 100%;
  display: static;
  position: relative;
  left: 35px;
`;

const Aviso = styled.p`
  max-width: 328px;
  max-height: 320px;
  padding-top: 35px;
  position: absolute;
  top: 15px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
  position: static;
  margin-bottom: 6px;
  margin-top: 15px;
  color: #151515;
`;

const BtnContainer = styled.div`
  height: 60px;
  width: 100%;
  text-align: center;
  padding-top: 21%;
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
    cursor: pointer;
  }
`;

const WhatsAppButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 134px;
  border-radius: 12px;
  margin: 8px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  background: #edeeee;
  border: 1px solid #edeeee;
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    color: #0acf83;
  }
`;
