import React from "react";
import loaderGif from "../../assets/loader.gif";
import styled from "styled-components";

const LoadingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  position: absolute;
  width: 710px;
  height: 364px;
  left: calc(50% - 596px / 2 + 30px);
  top: 15px;
  margin-top: 15px;
`;

const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  padding-top: 40px;
`;

const Text = styled.h3`
  position: static;
  width: 430px;
  height: 45px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: #151515;
  padding-top: 15px;
`;

export const Loader = () => {
  return (
    <LoadingPageContainer>
      <Image src={loaderGif} alt="loading" />
      <Text>Cargando información...</Text>
    </LoadingPageContainer>
  );
};
