import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SectionToPets = () => {
  const navigate = useNavigate();

  const navigateToPets = (e) => {
    e.preventDefault();
    navigate(`/pets`);
  };
  return (
    <SectionContainer>
      <TextContainer>
        <Title>¡Patitas a la obra!</Title>
        <Description>
          En el Petshop desarrollamos un sistema gratuito para ayudarte a
          viralizar la foto de tu mascota perdida o a encontrar una para adoptar
          y darle amor.
        </Description>
        <UnderDescription>
          ¡Sólo tenés que cargar la información!{" "}
          <Strong>Nosotros hacemos el resto</Strong>.
        </UnderDescription>
      </TextContainer>

      <BtnToPets onClick={(e) => navigateToPets(e)}>Ver mascotas</BtnToPets>
    </SectionContainer>
  );
};

export default SectionToPets;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%vh;
  height: 390px;
`;

const TextContainer = styled.div`
  height: 100px;
`;

const Title = styled.h1`
  height: 100px;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  color: #151515;
  margin-top: 60px;
`;

const Description = styled.h5`
  display: flex;
  justify-content: center;
  width: 100%vh;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  display: flex;
  text-align: center;
  color: #151515;
`;

const Strong = styled(Description)`
  font-style: italic;
  font-weight: 600;
  margin-left: 3px;
  margin-right: 3px;
`;

const UnderDescription = styled.h5`
  display: flex;
  justify-content: center;
  width: 100%vh;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  display: flex;
  text-align: center;
  color: #151515;
`;

const BtnToPets = styled.button`
  display: absolute;
  flex-direction: row;
  margin-top: 290px;
  position: absolute;
  width: 160px;
  height: 47px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
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
