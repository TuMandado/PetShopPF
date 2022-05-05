import React from "react";
import styled from "styled-components";

const SectionToProducts = () => {
  return (
    <SectionContainer>
      <TextContainer>
        <Title>¡Hace feliz a tu mascota!</Title>
        <Description>
          Encontrá todo lo que ella necesita en nuestra tienda.
        </Description>
      </TextContainer>
    </SectionContainer>
  );
};

export default SectionToProducts;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%vh;
  height: 250px;
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
