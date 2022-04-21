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
import { useDebounce } from 'use-debounce'
import { useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  text-align: center;
  justify-content: space-around;
  padding: 20px;
`;

const ContainerLoginOption = styled.div`
  background: #fff;
  float: right;
  position: absolute;
  right: 0;
  z-index: 2;
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
`;

const BrandNav = styled.div`
  width: 120px;
  height: 42px;
  float: left;
  transition: 0.25s ease;
  &:hover {
    cursor: pointer;
  }
  &:hover ${TextPetshop} {
      transition: 0.25s ease;
    font-weight: 700;
    color: #0acf83;
  }
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  left: -38px;
  position: relative;
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

const BtnIconLupa = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 28%;
  top: 25.12%;
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
  transition: 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #0ACF83;
    transition: 0.3s ease;
  }
  &:hover ${BtnIconLupa} {
    width: 22px;
    height: 22px;
    left: 27%;
    top: 23.12%;
  }
`;



const IconsNav = styled.div`
  width: 120px;
  height: 42px;
  float: right;
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

const PopUpSearchProduct = styled.div`
    content: "";
    width: 320px;
    position: absolute;
    left: 41.4%;
    ${props => props.name.length > 2
        ? ` border: 1px solid black;
            border-radius: 8px;
            border-top-right-radius: 0;`
        : ``
    }
    z-index: 4; 
    background-color: white;
`;

const PopUpProductDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.6em;
    transition: background-color 0.25s ease;
    &:hover {
        transition: background-color 0.25s ease;
        cursor: pointer;
        background-color:  #0acf83;
    }
`

const PopUpSpan = styled.span`
    font-size: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  position: absolute;
  left: 5%;
  width: 70%;

`;

const PopUpImage = styled.img`
    height: 35px;
    width: 35px;
    margin-left: auto;
    margin-right: 1em;
`;


export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const AllProducts = useSelector((state) => state.clientReducer.backup);
    const [searchedProducts, setSearchedProducts] = useState(AllProducts.slice())


    useEffect(() => {
        document.getElementById(`component-loginlogout`).style.display = `none`;
    }, [dispatch]);

    //Handle del Input y Search
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        if (name.length > e.target.value.length) setSearchedProducts(AllProducts.filter(el => el.data.name.toLowerCase().includes(e.target.value.toLowerCase())))
        else setSearchedProducts(searchedProducts.filter(el => el.data.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/products`);
        dispatch(getProductName(name));
        setName("");
    }

    function handleEnterKeyPress(e) {
        if (e.key === 'Enter') {
            navigate(`/products`)
            dispatch(getProductName(name));
            setName("");
        }
    }

    const handlePanelOn = () => {
        document.getElementById(`component-loginlogout`).style.display = `block`;
    };

    const handlePanelOff = () => {
        document.getElementById(`component-loginlogout`).style.display = `none`;
    };


    const goToProductDetail = (e) => {
        navigate(`/product/${e.currentTarget.id}`)
    }

    const goHome = (e) => {
        navigate('/')
    }

    return (
        <div>
            <NavContainer>
                <style>#component-loginlogout( display: none; )</style>
                <BrandNav onClick={e => goHome(e)}>
                    <Logo src={logoTemp} alt="logo-petshop" />
                    <TextPetshop>PetShop</TextPetshop>
                </BrandNav>
                <div>
                    <InputSearch
                        value={name}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder="¿Qué vas a llevar hoy?"
                        onKeyPress={e => handleEnterKeyPress(e)}
                    />
                    <BtnSearch onClick={(e) => handleSubmit(e)} type="submit">
                        <BtnIconLupa src={icoLupa} alt="search" />
                    </BtnSearch>
                    <PopUpSearchProduct name={name}>
                        {
                            name.length > 2 && searchedProducts.length && searchedProducts.map(el => (
                                <PopUpProductDiv key={el.uid} id={el.uid} onClick={e => goToProductDetail(e)}>
                                    <PopUpSpan>  {el.data.name} </PopUpSpan>
                                    <PopUpImage src={el.data.image} alt='Not Found' />
                                </PopUpProductDiv>
                            ))
                        }
                    </PopUpSearchProduct>
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
