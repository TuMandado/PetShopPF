import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icoPanel from "../../../assets/settings.png";
import icoLogOut from "../../../assets/cerrar.png";
import { SupervisorAccountRounded } from "@material-ui/icons";
import { signOutUsuario } from "../../../firebase/auth";
import { useSelector } from "react-redux";

export const LoginLogout = () => {
  var user = useSelector((state) => state.clientReducer.user);
  return (
    <ModalLogin>
      <Option>
        {user && user.role.toLowerCase() === "admin" && (
          <Link to={"/admin"}>
            <BtnOption>
              <SupervisorAccountRounded className="sidebarIcon" />
              <Text>Opciones de administrador</Text>
            </BtnOption>
          </Link>
        )}
      </Option>
      <Option>
        <Link to={"/usersettings"}>
          <BtnOption>
            <BtnIcon src={icoPanel} alt="user settings" />
            <Text>Ver Cuenta</Text>
          </BtnOption>
        </Link>
      </Option>
      <Option>
        {user && (
          <BtnOption onClick={() => signOutUsuario()}>
            <Link to={"/"}>
              <BtnIcon src={icoLogOut} alt="logout" />{" "}
              <Text>Cerrar Sesión</Text>
            </Link>
          </BtnOption>
        )}
      </Option>
    </ModalLogin>
  );
};

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
  border: 1px solid white;
  border-radius: 12px;
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
