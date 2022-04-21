import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icoMarket from "../../../assets/market.png";
import IcoProducts from "../../../assets/tienda_menu.png";
import IcoPets from "../../../assets/patita_menu.png";
import icoLogOut from "../../../assets/cerrar.png";
import icoUser from "../../../assets/user.png";
import { SupervisorAccountRounded } from "@material-ui/icons";
import { signOutUsuario } from "../../../firebase/auth";
import { useSelector } from "react-redux";

const BtnOption = styled.button`
  position: relative;
  width: 50px;
  height: 42px;
  padding: 7px 6px;
  background: none;
  border: none;
  cursor: pointer;
`;

const BtnIcon = styled.img`
  width: 25px;
  height: 25px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 13.12%;
`;

const ModalLogin = styled.div`
  width: 250px;
  height: auto;
  text-decoration: none;
  background-color: white;
  text-decoration: none;
`;

const Option = styled.li`
  font-size: 14px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  top: 4px;
  text-decoration: none;
  list-style: none;
`;

const Text = styled.p`
  font-size: 14px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  left: 49px;
  top: 10px;
  position: absolute;
  width: 110px;
  text-align: right;
  :hover {
    color: #0acf83;
  }
`;

export const LoginLogout = () => {
  var user = useSelector((state) => state.clientReducer.user);
  return (
    <ModalLogin>
      <Option>
        {user ? (
          <BtnOption onClick={() => signOutUsuario()}>
            <Link to={"/"}>
              <BtnIcon src={icoLogOut} alt="logout" />{" "}
              <Text>Cerrar Sesión</Text>
            </Link>
          </BtnOption>
        ) : (
          <Link to={"/login"}>
            <BtnOption>
              <BtnIcon src={icoUser} alt="user" />
              <Text>Loggin</Text>
            </BtnOption>
          </Link>
        )}
      </Option>
      <Option>
        <Link to={"/products"}>
          <BtnOption>
            <BtnIcon src={IcoProducts} alt="products" />
            <Text>Ver Tienda</Text>
          </BtnOption>
        </Link>
      </Option>
      <Option>
        <Link to={"/pets"}>
          <BtnOption>
            <BtnIcon src={IcoPets} alt="mascotas" />
            <Text>Ver Mascotas</Text>
          </BtnOption>
        </Link>
      </Option>
      <Option>
        <Link to={"/cart"}>
          <BtnOption>
            <BtnIcon src={icoMarket} alt="market" />
            <Text>Ir al carrito</Text>
          </BtnOption>
        </Link>
      </Option>
      {user && user.role.toLowerCase() === "admin" && (
        <Option>
          <Link to={"/admin"}>
            <BtnOption>
              <SupervisorAccountRounded className="sidebarIcon" />
              <Text>Opciones de administrador</Text>
            </BtnOption>
          </Link>
        </Option>
      )}
    </ModalLogin>
  );
};
