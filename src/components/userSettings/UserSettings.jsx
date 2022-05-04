import React from "react";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getDetailUser, putUser } from "../../redux/actions/adminActions";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import imgBackground from "../../assets/patrones_pet.png";
import { getTotalPets } from "../../redux/actions";


export const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useParams().id;
  const user = useSelector((state) => state.adminReducer.user);
  const pets = useSelector((state) => state.clientReducer.backupPets)
  const [input, setInput] = useState({});

  /*  Estructura de la info:
    email: ``,
    role: "Cliente",
    uid: ``,
    updatedAt: ``,
    phoneNumber: ``,
    shippingAddress: "",
    name: ``,
    surname: ``,
    displayName: ``,
    photoURL: ``,
    disabled: false, */

    useEffect(() => {
       dispatch(getDetailUser(uid));
       dispatch (getTotalPets())
      
     },[])

  useEffect(() => {
      setInput({
        displayName:  user.displayName ? user.displayName : "",
        name: user.name ? user.name : "",
        surname: user.surname ? user.surname : "",
        email: user.email ? user.email : "",
        shippingAddress: user.shippingAddress ? user.shippingAddress : "",
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
        photoUrl: user.photoUrl ? user.photoUrl : "",
        role: user.role ? user.role : "Cliente",
        disabled: user.disabled ? user.disabled : false,
      });
  }, [user]);



  const uploadFile = (files) => {
    setInput((prevInput) => ({ ...prevInput, photoUrl: files.base64 }));
  };

  const handleChange = function (e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      disabled: e.target.value === 1 ? true : false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.name.search(/^[^$%&|<>#]*$/)) {
      return alert('Ingrese un nombre adecuado')
    }  else if (input.email.search(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)) {
    return alert('Ingrese un email adecuado')
  } else if ( input.phoneNumber < 1 || input.phoneNumber.search(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/)) {
    return alert('numero de telefono incorrecto')
} 
    dispatch(putUser(user.uid, input));
    alert("Tus datos se modificaron con exito");
    navigate("/");
  };

  return (
    <div >
      <div>
      <TitleContainer>
        <Title>Configura tu cuenta:</Title>
      </TitleContainer>
      <FormContainer>
        {/* <Span>Editar:</Span> */}
        <InfoForm onSubmit={(e) => handleSubmit(e)}>
          <FormContent>
            <div>
              <Label>Nombre de Usuario: </Label>
              <br />
              <Input
                onChange={handleChange}
                name="displayName"
                type="text"
                placeholder={
                   user.displayName ? user.displayName :  "Nombre de usuario..."
                }
              />
            </div>
            <div>
              <Label>Nombre</Label>
               <br />
              <Input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder={user.name ? user.name : "Me llamo: "}
              />
            </div>
            <div>
              <Label>Apellido</Label>
              <br />
              <Input
                onChange={handleChange}
                name="surname"
                type="text"
                placeholder={user.surname ? user.surname : "Apellido: "}
              />
            </div>
            <div>
              <Label>Email</Label>
              <br />
              <Input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder={
                  user.email ? user.email : "¿Cuál es tu mejor e-mail?"
                }
              />
            </div>
            <div>
              <Label>Telefono</Label>
              <br />
              <Input
                onChange={handleChange}
                name="phoneNumber"
                type="text"
                placeholder={user.phoneNumber ? user.phoneNumber : "Telefono"}
              />
            </div>
            <div>
              <Label>Direccion</Label>
              <br />
              <Input
                onChange={handleChange}
                name="shippingAddress"
                type="text"
                placeholder={
                  user.shippingAddress
                    ? user.shippingAddress
                    : "¿Cuál es tu dirección actual?"
                }
              />
            </div>
            <div>
              <Label>Tu mejor foto:</Label>
              <br />
              <FileBase
                name="file"
                type="file"
                multiple={false}
                onDone={uploadFile}
              />
            </div>
            {/* <div>
              //Este tendriamos que ver si funciona bien, y ponerlo en otra parte para que solo lo modifique si desea, no si quiere modificar sus datos.
              <label>Desactivar cuenta:</label>
              <select
                name="disabled"
                id="active"
                onChange={handleChange}
              >
                <option value={0}> Si </option>
                <option value={1}> No </option>
              </select>
            </div> */}
            <div>
              <br />
              <Btnsubmit type="submit">Modificar datos</Btnsubmit>
            </div>
          </FormContent>
        </InfoForm>
      </FormContainer>
    </div>

      </div>
  );
};

const TitleContainer = styled.div`
  height: 60px;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
`;

const Title = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  margin: 0px auto;
  padding-top: 18px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
`;


const FormContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
`
// const Span = styled.span`
// margin-top: 5px;
// margin-bottom: 5px;
// font-family: "Poppins";
// font-style: normal;
// font-weight: 400;
// font-size: 16px;

// `

const InfoForm = styled.form`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  margin-top: 2px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 2px;
  background: rgba(255, 255, 255, 0.808);
  width: 30%;
  max-height: 700px;
  padding-bottom: 100px;
  border-radius: 12px;
  padding: 15px;
  margin-left: 41%;
  margin-right: auto;
  
`

const FormContent = styled.div`
  text-align: center;

`

const Label = styled.label`
margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`

const Input = styled.input`
width: 280px;
height: 40px;
color: black;
padding: 12px;
margin-top: 13px;
margin-bottom: 13px;
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
`

const Btnsubmit = styled.button `
display: absolute;
  flex-direction: row;
  margin-top: 5px;
  position: relative;
  width: 145px;
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
  }
`