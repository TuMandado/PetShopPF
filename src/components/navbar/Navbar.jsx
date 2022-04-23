import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProductName } from "../../redux/actions/index";
import icoLupa from "../../assets/lupa.png";
import icoUserOptions from "../../assets/options_user.png";
import icoUser from "../../assets/user.png";
import IcoProducts from "../../assets/tienda_menu.png";
import IcoPets from "../../assets/patita_menu.png";
import logoTemp from "../../assets/logo_temporal.ico";


import { Badge } from '@material-ui/core'
import { ShoppingCartOutlined, ExpandMoreRounded } from "@material-ui/icons"

import { LoginLogout } from "../login/logout/LoginAndLogout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { cartLoginFront } from "../../redux/actions/cartActions";
import { signOutUsuario } from "../../firebase/auth";
import { Link } from 'react-router-dom';






export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const actualUrl = window.location.pathname;

    let user = useSelector((state) => state.clientReducer.user);
    const cartProducts = useSelector(state => state.cartReducer.openCart);
    const AllProducts = useSelector((state) => state.clientReducer.backup);
    const [searchedProducts, setSearchedProducts] = useState(AllProducts.slice())
    const [panel, setPanel] = useState(false);


    useEffect(() => {
      dispatch(cartLoginFront(user)) ;
    }, []);
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

    const handlePanel = () => {
        if (!panel) {
            document.getElementById(`component-loginlogout`).style.display = `block`;
            setPanel(true)
        }
        if (panel) {
            document.getElementById(`component-loginlogout`).style.display = `none`;
            setPanel(false)
        }
    };


    const goToProductDetail = (e) => {
        navigate(`/product/${e.currentTarget.id}`)
    }

    const goHome = (e) => {
        navigate('/')
    }
    const goLogin = (e) => {
        navigate('/login')
    }

    return (
        <div>
            <NavContainer>
             {/* <Wrapper> */}
                <style>#component-loginlogout( display: none; )</style>
                <BrandNav onClick={e => goHome(e)}>
                    <Logo src={logoTemp} alt="logo-petshop" />
                    <TextPetshop>PetShop</TextPetshop>
                </BrandNav>
                <Center>
                    <InputSearch
                        value={name}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        placeholder={
                            actualUrl === '/cart'
                                ? "Buscar entre los productos..."
                                : actualUrl === '/pets'
                                    ? "¿A quien estas buscando?"
                                    : "¿Que vas a llevar hoy?"
                        }
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
                </Center>
                <Right>
                  <MenuItem>
                     <Link to={"/products"} style={linkStyle}>
                         <Img height='30px'border="8px"  src={IcoProducts} alt="productos" />
                         Tienda
                     </Link>
                  </MenuItem>
                  <MenuItem>
                     <Link to={"/pets"} style={linkStyle}>
                         <Img height='30px' margin='50px' src={IcoPets} alt="Mascotas" />
                         Mascotas
                     </Link>
                  </MenuItem>
                </Right>
              { user ? (
                <Right>
                   <MenuItem1 >
                      { user.image? 
                           <img src={user.image && user.image} style={profilePic} alt="" />
                        : 
                           <img src={icoUser} style={profilePic} alt="" /> 
                      }
                      <span>{user.name?user.name : user.email}</span>
            
                      {/* <Link to='/cart' style={linkStyle}>
                       <Badge badgeContent={5} color='primary'>
                         <ShoppingCartOutlined />
                       </Badge>
                      </Link> */}
                   </MenuItem1>
                </Right>
                ) : (
                <Right>
                   <MenuItem onClick={goLogin}>
                     Iniciar Sesion / Registrarse
                   </MenuItem>
                   {/* <MenuItem>
                     <Link to='/cart' style={linkStyle}>
                       <Badge badgeContent={1} color='primary'>
                         <ShoppingCartOutlined />
                       </Badge>
                     </Link>
                   </MenuItem> */}
                </Right>
                )}
               <IconsNav>
                   <BtnUser onClick={() => handlePanel()}>
                       <ExpandMoreRounded />
                   </BtnUser>
               </IconsNav>
               <MenuItem>
                     <Link to='/cart' style={linkStyle}>
                       <Badge badgeContent={1} color='primary'>
                         <ShoppingCartOutlined />
                       </Badge>
                     </Link>
                   </MenuItem>
               <ContainerLoginOption id="component-loginlogout">
                   <LoginLogout />
               </ContainerLoginOption>
            </NavContainer>
        </div>
    );
};

export default Navbar;

const NavContainer = styled.div`
background-color: #e7faf3;
padding: 3px 10px;
display: flex;
align-items: center;
justify-content: space-around;
`

const ContainerLoginOption = styled.div`
  background: #fff;
  float: right;
  position: absolute;
  right: 0;
  z-index: 2;
  margin-top: 250px;
  margin-right: 40px;
`

const TextPetshop = styled.h1`
  font-size: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  background: none;
  margin-right: 15px;
`

const BrandNav = styled.div`
  // width: 120px;
  // height: 42px;
  display:flex;
  justify-content: space-between;
  align-items: center;
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
`

const Logo = styled.img`
  height: 40px;
`

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
`

const BtnIconLupa = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 28%;
  top: 25.12%;
`

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
`

const IconsNav = styled.div`
  width: auto;
  height: 42px;
  float: right;
`

const BtnUser = styled.button`
  padding: 7px 4px;
  background: none;
  border: none;
  &:hover {
    transition: 0.25s ease;
    font-weight: 700;
    color: #0acf83;
  }
  &:hover {
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #0ACF83;
    transition: 0.3s ease;
  }
`

const UserOptions = styled.img`
  width: 23px;
  height: 23px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 25.12%;
`

const BtnIcon = styled.img`
  width: 25px;
  height: 25px;
  top: 2.1px;
  position: absolute;
  left: 16.79%;
  top: 13.12%;
`

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
`

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
`

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

  const Center = styled.div`
  flex: 1;
  text-align: center;
  margin-left: 100px;
`;
 
const Right = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const MenuItem1 = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  text-decoration: none;
  margin: 2px;
  padding: 4px;
`

const MenuItem = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  margin: 2px;
  padding: 4px;
  &:hover {
  transition: 0.25s ease;
  font-weight: 700;
  color: #0acf83;
}
  &:hover {
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #0ACF83;
    transition: 0.3s ease;
}
`

const Img = styled.img`
height: 30px;
padding: 4px;
margin: 8px;
border-radius: 8px;

`
const linkStyle = {
  display:'flex',
  justifyContent: 'space-between',
  padding: '3px 10px',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '20px',
}

const profilePic = {
  width: 'auto',
  height: '30px',
  padding: '4px',
  margin: '8px',
  borderRadius: '2rem',
  border: '1px solid black'
}
