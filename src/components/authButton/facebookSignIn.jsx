import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { signInWithFacebook } from "../../firebase/auth";
import auth from "../../firebase/auth";

const BtnForInput = styled.input`
  text-align: center;
  width: 120px;
  height: 35px;
  font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  color: #ffff;
  padding: 5px 5px;
  background: #0acf83;
  border: none;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 11px;
  cursor: pointer;
  &:hover {
    transition: 0.25s ease;
  font-weight: 700;
  color: #067A4D;
}
`;

const FacebookSignIn = () => {
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       window.location.href = "/";
  //     }
  //   });
  // }, []);
  return (
    <BtnForInput value={"Sign In Facebook"} onClick={signInWithFacebook} />
  );
};

export default FacebookSignIn;
