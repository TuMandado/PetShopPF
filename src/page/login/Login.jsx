import React, { useState, useEffect } from "react";
import { signInUsuario, registrarUsuario } from "../../firebase/auth";
import { uploadUser } from "../../firebase/Users";
import styled from "styled-components";
import VisibilityIcon from '@material-ui/icons/Visibility';
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
    border: 1px solid #067A4D;
    transition: 0.3s ease;
    transition: 0.25s ease;
  font-weight: 700;
  color: #067A4D;
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
  color: #067A4D;
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

  if (!input.nickname) {
      errors.nickname = 'Nombre Es Requerido';
  } else if (!/[a-zA-zá-ü]/.test(input.nickname)) {
      errors.nickname = 'El nombre es Invalido';
  }
 
  if (!input.email) {
    errors.mail = 'Correo Requerido'
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.mail = 'Correo Invalido'
  }
 
  if (!input.password) {
      errors.password = 'Contraseña Requerida';
  } else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)) {
      errors.password = 'debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula y una mayúscula.';
  }

  if (!input.passwordb) {
      errors.passwordb = 'vuelva a ingresar la Requerida';
  } else if ((input.password !== input.passwordb)) {
      errors.passwordb = 'Las contraseñas No Coinciden';
  }

  if (Object.keys(errors).length === 0) {
      errors.disabled = true
  }
  else errors.disabled = false

  return errors;
};

const Login = () => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  // Handle auth changes
  const [showPassword, setShowPasword] = useState(true);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
      nickname: "",
      email: "",
      password: "",
      role: "Cliente"
  });

  const handleInputChange = (e) => {
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name]: e.target.value
    });

    let objErrors = validate({
      ...input,
      [e.target.name] : e.target.value
  });
  setErrors(objErrors);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRegistrando) {
      registrarUsuario(input.email, input.password, input.nickname, input.role);
    } else {
      signInUsuario(input.email, input.password);
    }
    // navigate("/");
  };


  return (
    <BodyLogin style={containerStyle}>
      <LoginContainer>
        <Brand src={imgLogin} alt="mascotas" />
        { 
        !isRegistrando?(
        <>
        <Title> Iniciar sesión: </Title>
        <Form onSubmit={e => handleSubmit(e)}>
          <LabelEmail>
            Email:
            <Input 
              onChange={e => handleInputChange(e)}
              type="email" 
              name="email" 
              placeholder="Tu e-mail..." 
            />
            {errors.mail && (<Paragraph>{errors.mail}</Paragraph>)}
          </LabelEmail>
          <LabelPass>
            contraseña:
            <LabelDiv>
            <Input 
              onChange={e => handleInputChange(e)}
              type={showPassword ? 'password' : 'text'} 
              name="password" 
              placeholder="Contraseña" 
            />
            {showPassword ? < VisibilityIcon color="disabled" onClick={() => setShowPasword(!showPassword)}/> : <VisibilityIcon onClick={() => setShowPasword(!showPassword)}/> }
            </LabelDiv>
            {errors.password && (<Paragraph>{errors.password}</Paragraph>)}
          </LabelPass>
          <BtnForInput type="submit" disabled={!errors.disabled} onClick= {(e)=>handleSubmit(e)}>
            Iniciar sesion
          </BtnForInput>
          <GoogleSignIn/>
          <FacebookSignIn/>
        </Form>
        <BtnLoggin onClick={() => setIsRegistrando(!isRegistrando)}>
          ¡Registrarme ahora!
        </BtnLoggin>
        <BtnLoggin onClick={() => window.location.href = "/passwordRecovery"}>
          Recuperar contraseña
        </BtnLoggin>
        </> 
           )
           :
           (
            <>
           <Title> Registrarse: </Title>
           <Form onSubmit={e => handleSubmit(e)}>
             <LabelEmail>
               Nombre de Usuario:
               <Input
              onChange={e => handleInputChange(e)}
              type="text" 
              name="nickname" 
              placeholder="Tu nombre de usuario..." 
            />
            {errors.nickname && (<Paragraph>{errors.nickname}</Paragraph>)}
          </LabelEmail>
          <LabelEmail>
            Email:
            <Input 
              onChange={e => handleInputChange(e)}
              type="email" 
              name="email" 
              placeholder="Tu e-mail..." 
            />
            {errors.mail && (<Paragraph>{errors.mail}</Paragraph>)}
          </LabelEmail>
          <LabelPass>
            contraseña:
            <LabelDiv>
            <Input 
              onChange={e => handleInputChange(e)}
              type={showPassword ? 'password' : 'text'} 
              name="password" 
              placeholder="Contraseña" 
            />
            {showPassword ? < VisibilityIcon color="disabled" onClick={() => setShowPasword(!showPassword)}/> : <VisibilityIcon onClick={() => setShowPasword(!showPassword)}/> }
            </LabelDiv>
            {errors.password && (<Paragraph>{errors.password}</Paragraph>)}
          </LabelPass>
          <LabelPass>
             Repetir contraseña:
            <Input 
              onChange={e => handleInputChange(e)}
              type={showPassword ? 'password' : 'text'} 
              name="passwordb" 
              placeholder="Confirmar Contraseña" 
            />
            {errors.passwordb && (<Paragraph>{errors.passwordb}</Paragraph>)}
          </LabelPass>
          <BtnForInput type="submit" disabled={!errors.disabled} onClick= {(e)=>handleSubmit(e)}>
            Registrar
          </BtnForInput>
          <GoogleSignIn/>
          <FacebookSignIn/>
        </Form>
        <BtnLoggin onClick={() => setIsRegistrando(!isRegistrando)}>
          Ya tengo cuenta
        </BtnLoggin>
        </>
        )
      }
      </LoginContainer>
    </BodyLogin>
  );
};

export default Login;

