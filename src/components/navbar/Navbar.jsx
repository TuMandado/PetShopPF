import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProductName, filterPetByName } from "../../redux/actions/index";
import icoLupa from "../../assets/lupa.png";
import icoUserOptions from "../../assets/options_user.png";
import icoUser from "../../assets/user.png";
import IcoProducts from "../../assets/tienda_menu.png";
import IcoPets from "../../assets/patita_menu.png";
import logoTemp from "../../assets/logo_temporal.ico";

import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined, ExpandMoreRounded } from "@material-ui/icons";

import { LoginLogout } from "../login/logout/LoginAndLogout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { cartLoginFront } from "../../redux/actions/cartActions";
import { signOutUsuario } from "../../firebase/auth";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const actualUrl = window.location.pathname;

    let user = useSelector((state) => state.clientReducer.user);
    const cartProducts = useSelector((state) => state.cartReducer.openCart);
    const quantity = useSelector((state) => state.cartReducer.quantity);
    const AllProducts = useSelector((state) => state.clientReducer.backup);
    const AllPets = useSelector(state => state.clientReducer.backupPets)
    const [searchedProducts, setSearchedProducts] = useState(AllProducts);
    const [searchedPets, setSearchedPets] = useState(AllPets)

    const [isLoading, setIsLoading] = useState(true)
    const [panel, setPanel] = useState(false);
    const loginContainer = useRef(null);
    const userButton = useRef(null);
    const popUpContainer = useRef(null);
    const inputContainer = useRef(null);

    useEffect(() => {
        dispatch(cartLoginFront(user));
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, []);

    //Handle del Input y Search
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        if (actualUrl[1] === "p" && actualUrl[4] === 's') {
            if (name.length > e.target.value.length)
                setSearchedPets(
                    AllPets.filter((el) =>
                        el.data.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            else if (!name.length)
                setSearchedPets(
                    AllPets.filter((el) =>
                        el.data.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            else
                setSearchedPets(
                    AllPets.filter((el) =>
                        el.data.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            if (name.length > 2 && AllPets.length >= 1) {
                document.addEventListener("click", (e) => {
                    if (
                        inputContainer.current &&
                        !inputContainer.current.contains(e.target) &&
                        !popUpContainer.current.contains(e.target)
                    ) {
                        setName("");
                    }
                });
            }
        }
        else {
            if (name.length > e.target.value.length)
                setSearchedProducts(
                    AllProducts.filter((el) =>
                        el.data.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            else if (!name.length)
                setSearchedProducts(
                    AllProducts.filter((el) =>
                        el.data.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            else
                setSearchedProducts(
                    searchedProducts.filter((el) =>
                        el.data.name.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                );
            if (name.length > 2 && searchedProducts.length >= 1) {
                document.addEventListener("click", (e) => {
                    if (
                        inputContainer.current &&
                        !inputContainer.current.contains(e.target) &&
                        !popUpContainer.current.contains(e.target)
                    ) {
                        setName("");
                    }
                });
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (actualUrl[1] === "p" && actualUrl[4] === 's') {
            dispatch(filterPetByName(AllPets, name))
        }
        else {
            navigate(`/products`);
            dispatch(getProductName(name));
        }
        setName("");
    }

    function handleEnterKeyPress(e) {
        if (e.key === "Enter") {
            if (actualUrl[1] === "p" && actualUrl[4] === 's') {
                dispatch(filterPetByName(AllPets, name))
            }
            else {
                navigate(`/products`);
                dispatch(getProductName(name));
            }
            setName("");
        }
    }

    const handlePanel = () => {
        if (!panel)
            document.addEventListener("click", (e) => {
                if (
                    loginContainer.current &&
                    !loginContainer.current.contains(e.target) &&
                    !userButton.current.contains(e.target)
                ) {
                    setPanel(false);
                }
            });
        setPanel(!panel);
    };

    const goToProductDetail = (e) => {
        navigate(`/product/${e.currentTarget.id}`);
    };

    const goToPetDetail = (e) => {
        navigate(`/pets/${e.currentTarget.id}`);
    }

    const goHome = (e) => {
        navigate("/");
    };
    const goLogin = (e) => {
        navigate("/login");
    };


    return (
        <div>
            <NavContainer>
                {/* <Wrapper> */}
                <style>#component-loginlogout( display: none; )</style>
                <BrandNav onClick={(e) => goHome(e)}>
                    <Logo src={logoTemp} alt="logo-petshop" />
                    <TextPetshop>PetShop</TextPetshop>
                </BrandNav>
                <Center>
                    <div>
                        <InputSearch
                            value={name}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            placeholder={
                                actualUrl[1] === "p" && actualUrl[4] === 's'
                                    ? "¿A quien estas buscando?"
                                    : "¿Que vas a llevar hoy?"
                            }
                            onKeyPress={(e) => handleEnterKeyPress(e)}
                            ref={inputContainer}
                        />
                        <BtnSearch onClick={(e) => handleSubmit(e)} type="submit">
                            <BtnIconLupa src={icoLupa} alt="search" />
                        </BtnSearch>
                    </div>
                    {
                        actualUrl[1] === "p" && actualUrl[4] === 's'
                            ? <PopUpSearchProduct
                                ref={popUpContainer}
                                name={name}
                                products={searchedPets}
                            >
                                {name.length > 2 &&
                                    searchedPets.length >= 1 &&
                                    searchedPets.map((el) => (
                                        <PopUpProductDiv
                                            key={el.uid}
                                            id={el.uid}
                                            onClick={(e) => goToPetDetail(e)}
                                        >
                                            <PopUpSpan> {el.data.name} </PopUpSpan>
                                            <PopUpImagePets src={Array.isArray(el.data.photos) ? el.data.photos[0] : el.data.photos} alt="Not Found" />
                                        </PopUpProductDiv>
                                    ))}
                            </PopUpSearchProduct>
                            : <PopUpSearchProduct
                                ref={popUpContainer}
                                name={name}
                                products={searchedProducts}
                            >
                                {name.length > 2 &&
                                    searchedProducts.length >= 1 &&
                                    searchedProducts.map((el) => (
                                        <PopUpProductDiv
                                            key={el.uid}
                                            id={el.uid}
                                            onClick={(e) => goToProductDetail(e)}
                                        >
                                            <PopUpSpan> {el.data.name} </PopUpSpan>
                                            <PopUpImage src={el.data.image} alt="Not Found" />
                                        </PopUpProductDiv>
                                    ))}
                            </PopUpSearchProduct>
                    }
                </Center>
                <Right>
                    <MenuItem>
                        <Link to={"/products"} style={linkStyle}>
                            <Img
                                height="30px"
                                border="8px"
                                src={IcoProducts}
                                alt="productos"
                            />
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to={"/pets"} style={linkStyle}>
                            <Img height="30px" margin="50px" src={IcoPets} alt="Mascotas" />
                        </Link>
                    </MenuItem>
                </Right>
                {
                    isLoading && !user
                        ? <Right>
                            <MenuItem>Cargando...</MenuItem>
                            {/* <MenuItem>
                     <Link to='/cart' style={linkStyle}>
                       <Badge badgeContent={1} color='primary'>
                         <ShoppingCartOutlined />
                       </Badge>
                     </Link>
                   </MenuItem> */}
                        </Right>
                        : user ? (
                            <Right>
                                <MenuItem1>
                                    {user.image ? (
                                        <img src={user.image && user.image} style={profilePic} alt="" />
                                    ) : (
                                        <img src={icoUser} style={profilePic} alt="" />
                                    )}
                                    <span>{user.name ? user.name : user.email}</span>

                                    {/* <Link to='/cart' style={linkStyle}>
                       <Badge badgeContent={5} color='primary'>
                         <ShoppingCartOutlined />
                       </Badge>
                      </Link> */}
                                </MenuItem1>
                            </Right>
                        ) : (
                            <Right>
                                <MenuItem onClick={goLogin}>Iniciar Sesion / Registrarse</MenuItem>
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
                    <BtnUser ref={userButton} onClick={() => handlePanel()}>
                        <ExpandMoreRounded />
                    </BtnUser>
                </IconsNav>
                <MenuItem>
                    <Link to="/cart" style={linkStyle}>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </Link>
                </MenuItem>
                {panel && (
                    <ContainerLoginOption ref={loginContainer}>
                        <LoginLogout />
                    </ContainerLoginOption>
                )}
            </NavContainer>
        </div>
    );
};

export default Navbar;

const NavContainer = styled.div`
  background: #ffff;
  -webkit-box-shadow: 0px 4px 1px 1px rgba(0, 0, 0, 0.1); // rbg = "border shadow color!"
  box-shadow: 0px 4px 1px 1px rgba(0, 0, 0, 0.1); // rbg = "border shadow color!"
  font-family: "Poppins";
  font-style: normal;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 16px;
  margin-bottom: 2em;
`;

const ContainerLoginOption = styled.div`
  background: #fff;
  float: right;
  position: absolute;
  right: 0;
  z-index: 2;
  border-radius: 12px;
  margin-top: 268px;
  margin-right: 70px;
`;

const TextPetshop = styled.h1`
  font-size: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  background: none;
  margin-right: 15px;
`;

const BrandNav = styled.div`
  // width: 120px;
  // height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: left;
  margin-left: 10px;
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
  height: 40px;
  margin-right: 10px;
`;

const InputSearch = styled.input`
  width: 320px;
  height: 42px;
  color: black;
  font-size: 14px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  background: none;
  border: 1px solid #919191;
  border-right: none;
  box-sizing: border-box;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 6px;
  padding-left: 1.5em;
  &::-webkit-input-placeholder {
    color: #919191;
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
  border: 1px solid #919191;
  border-left: none;
  box-sizing: border-box;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #29d9c2;
    transition: 0.3s ease;
  }
  &:hover ${BtnIconLupa} {
    width: 24px;
    height: 24px;
    left: 26%;
    top: 21.12%;
  }
`;

const IconsNav = styled.div`
  width: auto;
  height: 42px;
  float: right;
`;

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
    border: 1px solid #0acf83;
    transition: 0.3s ease;
  }
`;

const PopUpSearchProduct = styled.div`
  content: "";
  width: 320px;
  ${(props) =>
        props.name.length > 2 && props.products.length >= 1
            ? ` border: 1px solid black;
            border-radius: 8px;
            border-top-right-radius: 0;`
            : ``}
  z-index: 4;
  background: white;
  position: absolute;
  top: 100%;
`;

const PopUpProductDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.6em;
  border-radius: 8px;
  transition: background-color 0.25s ease;
  &:hover {
    transition: background-color 0.25s ease;
    cursor: pointer;
    background-color: rgba(41, 217, 194, 1);
  }
`;

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
  border-radius: 8px;
`;

const PopUpImagePets = styled.img`
    height: 70px;
    margin-left: auto;
    margin-right: 1em;
    border-radius: 8px;
`

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: 8em;
`;

const Right = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  text-decoration: none;
  margin: 2px;
  padding: 4px;
`;

const Img = styled.img`
  height: 30px;
  padding: 4px;
  margin: 8px;
  border-radius: 8px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  margin: 2px;
  padding: 4px;
  transition: 0.25s ease;
  &:hover ${Img} {
    transition: 0.25s ease;
    filter: brightness(0) saturate(100%) invert(54%) sepia(63%) saturate(605%)
      hue-rotate(106deg) brightness(104%) contrast(92%);
    height: 34px;
    margin: 4px;
    margin-right: 6px;
    margin-left: 6px;
  }
`;

const linkStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "3px 10px",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    fontSize: "20px",
};

const profilePic = {
    width: "auto",
    height: "30px",
    padding: "4px",
    margin: "8px",
    borderRadius: "2rem",
    border: "1px solid black",
};
