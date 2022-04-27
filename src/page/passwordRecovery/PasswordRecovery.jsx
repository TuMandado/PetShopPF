import React, { useState, useEffect } from "react";
import { signInUsuario, registrarUsuario } from "../../firebase/auth";
import { uploadUser } from "../../firebase/Users";
import styled from "styled-components";
import VisibilityIcon from "@material-ui/icons/Visibility";
import imgLogin from "../../assets/mascotas_login.png";
import imgBackground from "../../assets/patrones_pet.png";
import GoogleSignIn from "../../components/authButton/googleSignIn";
import FacebookSignIn from "../../components/authButton/facebookSignIn";
import auth from "../../firebase/auth";
import { recoveryPassword } from "../../firebase/auth";

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
  height: auto;
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
  // width: 190px;
  // height: 50px;
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

const LabelDiv = styled.div`
  display: flex;
  align-items: center;
`;

const LabelPass = styled.label`
  display: block;
  align-items: center;
  float: left;
  padding: 2px;
  margin-top: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  color: black;
  padding: 12px;
  margin-top: 8px;
  margin-right: 4px;
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

const BtnForInput = styled.button`
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
  &:hover {
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #067a4d;
    transition: 0.3s ease;
    transition: 0.25s ease;
    font-weight: 700;
    color: #067a4d;
  }
  &:disabled {
    background-color: gray;
    color: black;
    opacity: 0.7;
    cursor: default;
  }
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
  cursor: pointer;
  &:hover {
    cursor: pointer;
    transition: 0.3s ease;
    transition: 0.25s ease;
    font-weight: 700;
    color: #067a4d;
  }
`;

const Form = styled.form`
  margin-top: 200px;
`;

const Paragraph = styled.p`
  // width: 320px;
  // height: 40px;
  color: red;
  // padding: 8px;
  margin-top: 8px;
  // margin-right: 4px;
  font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  background: none;

  &::-webkit-input-placeholder {
    color: #a9a9a9;
  }
`;

const containerStyle = {
  backgroundImage: `url(${imgBackground})`,
  width: "100%",
  height: "100%",
};

export function validate(input) {
  let errors = {};

  if (!input.email) {
    errors.mail = "Correo Requerido";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.mail = "Correo Invalido";
  }

  if (Object.keys(errors).length === 0) {
    errors.disabled = true;
  } else errors.disabled = false;

  return errors;
}

const PasswordRecovery = () => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  // Handle auth changes
  const [showPassword, setShowPasword] = useState(true);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    let objErrors = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(objErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    recoveryPassword(input.email);
    window.location.href = "/";
  };

  return (
    <BodyLogin style={containerStyle}>
      <LoginContainer>
        <Brand src={imgLogin} alt="mascotas" />
        <>
          <Title> Recuperar contraseña: </Title>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <LabelEmail>
              Email:
              <Input
                onChange={(e) => handleInputChange(e)}
                type="email"
                name="email"
                placeholder="Tu e-mail..."
              />
              {errors.mail && <Paragraph>{errors.mail}</Paragraph>}
            </LabelEmail>
            <BtnForInput
              type="submit"
              disabled={!errors.disabled}
              onClick={(e) => handleSubmit(e)}
            >
              Recuperar
            </BtnForInput>
          </Form>
        </>
      </LoginContainer>
    </BodyLogin>
  );
};

export default PasswordRecovery;

// function PasswordRecovery() {
//   return (
//     <div>PasswordRecovery</div>
//   )
// }

// export default PasswordRecovery
