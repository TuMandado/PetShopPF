import React, { useState, useEffect } from "react";
import { signInUsuario, registrarUsuario } from "../../firebase/auth";
import styled from "styled-components";
import imgLogin from "../../assets/mascotas_login.png";
import imgBackground from "../../assets/patrones_pet.png";
import GoogleSignIn from "../../components/authButton/googleSignIn";
import FacebookSignIn from "../../components/authButton/facebookSignIn";
import auth from "../../firebase/auth";

const BodyLogin = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  padding-top: 5%;
  width: 425px;
  background: #ffff;
  height: 495px;
  border: 1px solid #067a4d;
  box-sizing: border-box;
  padding: 50px 30px;
  margin: 8% auto;
  border-radius: 5px;
`;

const Brand = styled.img`
  width: 70%;
  height: 40%;
  float: left;
  position: relative;
  top: -165px;
  left: 155px;
`;

const Title = styled.h1`
  position: relative;
  font-size: 20px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  width: 190px;
  height: 50px;
  float: left;
  display: inline-block;
`;

const LabelEmail = styled.label`
  display: block;
  float: left;
  padding: 2px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  display: block;
`;

const LabelPass = styled.label`
  display: block;
  float: left;
  padding: 2px;
  margin-top: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  display: block;
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  color: black;
  padding: 12px;
  margin-top: 8px;
  font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  background: none;
  border: 1px solid #a9a9a9;
  box-sizing: border-box;
  border-radius: 8px;
  &::-webkit-input-placeholder {
    color: #a9a9a9;
  }
`;

const BtnForInput = styled.input`
  width: 120px;
  height: 35px;
  font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  color: #ffff;
  padding: 5px 5px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 11px;
`;

const BtnLoggin = styled.button`
  width: 140px;
  height: 39px;
  font-size: 13px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  color: #0acf83;
  padding: 4px 2px;
  box-sizing: border-box;
  background: none;
  border: none;
  margin-top: 5px;
`;

const Form = styled.form`
  margin-top: 200px;
`;

const containerStyle = {
  backgroundImage: `url(${imgBackground})`,
  width: "100%",
  height: "100%",
};

const Login = () => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  // Handle auth changes



  const submitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = "Cliente";

    if (isRegistrando) {
      registrarUsuario(email, password, role);
    } else {
      signInUsuario(email, password);
    }
  };

  return (
    <BodyLogin style={containerStyle}>
      <LoginContainer>
        <Brand src={imgLogin} alt="mascotas" />
        <Title>{isRegistrando ? "Registrarse:" : "Iniciar sesión:"}</Title>
        <Form onSubmit={submitHandler}>
          <LabelEmail>
            Email:
            <Input type="email" id="email" placeholder="Tu e-mail" />
          </LabelEmail>

          <LabelPass>
            Password:
            <Input type="password" id="password" placeholder="**********" />
          </LabelPass>

          <BtnForInput
            type="submit"
            value={isRegistrando ? "Registrar" : "Iniciar sesion"}
          />
      <GoogleSignIn/>
      <FacebookSignIn/>
        </Form>

        <BtnLoggin onClick={() => setIsRegistrando(!isRegistrando)}>
          {isRegistrando ? "Ya tengo cuenta" : "¡Registrarme ahora!"}
        </BtnLoggin>
      </LoginContainer>
    </BodyLogin>
  );
};

export default Login;
