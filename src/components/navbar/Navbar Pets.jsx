import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getTotalPets } from "../../redux/actions";
import icoLupa from "../../assets/lupa.png";
import icoUser from "../../assets/user.png";
import logoTemp from "../../assets/logo_temporal.ico";
import icoSettings from "../../assets/config.png";
import styled from "styled-components";

const NavContainer = styled.div`
  text-align: center;
  justify-content: space-around;
  padding: 20px;
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

const BtnSettings = styled.button`
  position: relative;
  width: 50px;
  height: 42px;
  padding: 7px 6px;
  background: none;
  border: none;
`;

const SettingsIcon = styled.img`
  width: 25px;
  height: 25px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 25.12%;
`;

const BtnUser = styled.button`
  position: relative;
  width: 50px;
  height: 42px;
  padding: 7px 6px;
  background: none;
  border: none;
`;

const UserIcon = styled.img`
  width: 25px;
  height: 25px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 25.12%;
`;

export const NavbarPets = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const AllProduct = useSelector((state) => state.backup);

  useEffect(() => {
    dispatch(getTotalPets());
    //Falta el action de buscar por name.
  }, [dispatch]);

  //Handle del Input y Search
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getTotalPets(name));
    console.log(AllProduct);
    setName("");
  }

  return (
    <div>
      <NavContainer>
        <BrandNav>
          <Logo src={logoTemp} alt="logo-petshop" />
          <TextPetshop>PetShop</TextPetshop>
        </BrandNav>
        <div>
          <InputSearch
            value={name}
            onChange={(e) => handleInputChange(e)}
            type="text"
            placeholder="¿A quien estas buscando?"
          />
          <BtnSearch onClick={(e) => handleSubmit(e)} type="submit">
            <BtnIconLupa src={icoLupa} alt="search" />
          </BtnSearch>
          <IconsNav>
            <BtnUser>
              <UserIcon src={icoUser} alt="user" />
            </BtnUser>
            <BtnSettings>
              <SettingsIcon src={icoSettings} alt="market" />
            </BtnSettings>
          </IconsNav>
        </div>
      </NavContainer>
    </div>
  );
};

export default NavbarPets;
