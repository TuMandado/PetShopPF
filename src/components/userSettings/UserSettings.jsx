import React from "react";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getDetailUser, putUser } from "../../redux/actions/adminActions";
import styled from "styled-components";

export const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.clientReducer.user);
  console.log("User de Settings =>", user);
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
    setInput({
      displayName: /* user.displayName ? user.displayName : */ "",
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
    dispatch(putUser(user.uid, input));
    alert("Tus datos se modificaron con exito");
    navigate("/usersettings");
  };

  return (
    <div>
      <TitleContainer>
        <Title>Configura tu cuenta:</Title>
      </TitleContainer>
      <div>
        <span>Editar:</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label>Nombre de Usuario</label>
              <input
                onChange={handleChange}
                name="displayName"
                type="text"
                placeholder={
                  /* user.displayName ? user.displayName :  */ "Nombre de usuario..."
                }
              />
            </div>
            <div>
              <label>Nombre</label>
              <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder={user.name ? user.name : "Me llamo: "}
              />
            </div>
            <div>
              <label>Apellido</label>
              <input
                onChange={handleChange}
                name="surname"
                type="text"
                placeholder={user.surname ? user.surname : "Apellido: "}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder={
                  user.email ? user.email : "¿Cuál es tu mejor e-mail?"
                }
              />
            </div>
            <div>
              <label>Telefono</label>
              <input
                onChange={handleChange}
                name="phoneNumber"
                type="text"
                placeholder={user.phoneNumber ? user.phoneNumber : "Telefono"}
              />
            </div>
            <div>
              <label>Direccion</label>
              <input
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
              <label>Tu mejor foto:</label>
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
              <button type="submit">Modificar datos</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const TitleContainer = styled.div`
  height: 60px;
  width: 100%;
  text-align: center;
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
  &:hover {
    color: #0acf83;
  }
`;
