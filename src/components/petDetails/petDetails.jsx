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
    navigate(`/pets`);
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
        <div>
          <Name>{pet.name}</Name>
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
            <div>
              <div>
                <h5>Sobre {pet.name}:</h5>
                <Description>{pet.description}</Description>
              </div>
              <div>
                <button>Algo</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link to="/pets">
            <BtnToPets onClick={(e) => navigateToPets(e)}>Volver</BtnToPets>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PetDetails;

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
  object-fit: cover;
  width: 400px;
  height: 380px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
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
  font-size: 12px;
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
  font-size: 12px;
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
  font-size: 12px;
  line-height: 18px;
  color: #eb8d70;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 2px;
`;

const Description = styled.p`
  max-width: 600px;
  max-height: 290px;
  margin-top: 4px;
  top: 11px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  position: static;
  margin-bottom: 6px;
  margin-top: 9px;
  line-height: 20px;
  color: #151515;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 2px;
  margin-top: 8px;
`;

const BtnToPets = styled.button`
  display: absolute;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
  width: 105px;
  height: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    color: #0acf83;
    background: #ffff;
    border: 3px solid #067a4d;
  }
`;
