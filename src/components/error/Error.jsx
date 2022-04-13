import React from "react";
// import { Link } from "react-router-dom";
import imageError from "../../assets/error_gato_png.png";
import styled from "styled-components";

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 800px;
  height: 364px;
  left: calc(50% - 596px / 2 + 30px);
  top: 100px;
`;

const Image = styled.img`
  position: relative;
  width: 400px;
  height: 400px;
`;

const Titulo = styled.h1`
  position: static;
  width: 400px;
  height: 45px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  text-align: center;
  /* C1/A */
  color: #151515;
  padding-top: 22px;
`;

const Text = styled.h5`
  position: static;
  width: 420px;
  height: 60px;
  left: 0px;
  top: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #151515;
  flex: none;
  flex-grow: 0;
  margin: 40px 0px;
`;

const Boton = styled.button`
  width: 90px;
  height: 47px;
  position: relative;
  color: #ffff;
  padding: 10px 10px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  left: 157px;
  top: 10px;
`;

const Error = () => {
  return (
    <ErrorPage>
      <Image src={imageError} alt="error" />
      <Titulo>¡Ups! Algo malió sal.</Titulo>
      <Text>
        No hay información para mostrar en este momento. Puede que no existan
        publicaciones relacionadas a ese contenido. Intenta nuevamente más
        tarde.
      </Text>

      <Boton>Ir a home</Boton>
    </ErrorPage>
  );
};

export default Error;
