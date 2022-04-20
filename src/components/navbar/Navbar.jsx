import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProductName, getTotalProducts } from "../../redux/actions/index";
import icoLupa from "../../assets/lupa.png";
import icoUserOptions from "../../assets/options_user.png";
import logoTemp from "../../assets/logo_temporal.ico";
import { LoginLogout } from "../login/logout/LoginAndLogout";
import styled from "styled-components";

const NavContainer = styled.div`
  text-align: center;
  justify-content: space-around;
  padding: 20px;
`;

const ContainerLoginOption = styled.div`
  background: #fff;
  float: right;
  position: relative; ;
`;
const BrandNav = styled.div`
  width: 120px;
  height: 42px;
  float: left;
  display: inline-block;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  left: -38px;
  position: relative;
`;

const TextPetshop = styled.h1`
  top: -30px;
  left: 40px;
  position: relative;
  font-size: 25px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  background: none;
  &:hover {
    font-weight: 700;
    color: #0acf83;
  }
`;

const InputSearch = styled.input`
  width: 320px;
  height: 42px;
  color: black;
  font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  background: none;
  border: 1px solid #a9a9a9;
  border-right: none;
  box-sizing: border-box;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 6px;
  &::-webkit-input-placeholder {
    color: #a9a9a9;
  }
`;
const BtnSearch = styled.button`
  position: absolute;
  width: 50px;
  height: 42px;
  padding: 7px 6px;
  background: none;
  border: 1px solid #a9a9a9;
  border-left: none;
  box-sizing: border-box;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const BtnIconLupa = styled.img`
  width: 20px;
  height: 20px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 25.12%;
`;

const IconsNav = styled.div`
  width: 120px;
  height: 42px;
  float: right;
  display: inline-block;
`;
const BtnUser = styled.button`
  position: relative;
  width: 50px;
  height: 42px;
  padding: 7px 6px;
  background: none;
  border: none;
`;

const UserOptions = styled.img`
  width: 23px;
  height: 23px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 25.12%;
`;

const BtnClose = styled.button`
  width: 120px;
  height: 35px;
  font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  color: #067a4d;
  background: #fff;
  margin-top: 1px;
  float: right;
  margin-right: 77px;
  border: none;
  &:hover {
    color: #0acf83;
  }
`;

export const Navbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const AllProduct = useSelector((state) => state.clientReducer.backup);

  useEffect(() => {
    document.getElementById(`component-loginlogout`).style.display = `none`;
    dispatch(getTotalProducts());
  }, [dispatch]);

  //Handle del Input y Search
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductName(name));
    console.log(AllProduct);
    setName("");
  }

  const handlePanelOn = () => {
    document.getElementById(`component-loginlogout`).style.display = `block`;
  };

  const handlePanelOff = () => {
    document.getElementById(`component-loginlogout`).style.display = `none`;
  };

  return (
    <div>
      <NavContainer>
        <style>#component-loginlogout( display: none; )</style>
        <BrandNav>
          <Logo src={logoTemp} alt="logo-petshop" />
          <TextPetshop>PetShop</TextPetshop>
        </BrandNav>
        <div>
          <InputSearch
            value={name}
            onChange={(e) => handleInputChange(e)}
            type="text"
            placeholder="¿Qué vas a llevar hoy?"
          />
          <BtnSearch onClick={(e) => handleSubmit(e)} type="submit">
            <BtnIconLupa src={icoLupa} alt="search" />
          </BtnSearch>
          <IconsNav>
            <BtnUser onClick={() => handlePanelOn()}>
              <UserOptions src={icoUserOptions} alt="user" />
            </BtnUser>
          </IconsNav>
        </div>
      </NavContainer>
      <ContainerLoginOption id="component-loginlogout">
        <LoginLogout />
        <BtnClose onClick={() => handlePanelOff()}>Cerrar ventana</BtnClose>
      </ContainerLoginOption>
    </div>
  );
};

export default Navbar;
