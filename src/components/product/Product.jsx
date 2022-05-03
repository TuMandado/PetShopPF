import React from "react";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { addItemCartFront } from "../../redux/actions/cartActions";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  width: 268px;
  height: 360px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0px 32px;
  margin-bottom: 4em;
  transition: 0.25s ease;
  &:hover {
    transition: 0.5s ease;
    width: 290px;
    cursor: pointer;
    margin: 0px 21px;
    border: 1px solid #0acf83;
  }
`;

const Image = styled.img`
  align-self: center;
  max-width: 80%;
  max-height: 45%;
  border-radius: 12px;
`;
const Title = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  position: absolute;
  bottom: 35%;
  width: 90%;
`;

const Info = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  position: absolute;
  bottom: 30%;
`;

const Price = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;
  color: #151515;
  position: absolute;
  bottom: 5%;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  height: 36px;
  width: 88px;
  position: absolute;
  bottom: 5%;
  right: 6%;
  :hover {
    background: #ffffff;
    cursor: pointer;
    color: #0acf83;
  }
`;

const ListContainer = styled.div`
  display: flex;
  position: relative;
  padding: 16px;
  width: 900px;
  height: 280px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 1em 0px;
`;

const ListImage = styled.img`
  align-self: flex-start;
  max-width: 70%;
  max-height: 60%;
  border-radius: 12px;
  position: absolute;
  left: 5%;
  top: 20%;
`;

const ListImageBackground = styled.div`
  position: absolute;
  content: "";
  height: 100%;
  width: 27%;
  background: #f9f9f9;
  //background: gray;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  top: 0;
  left: 0;
  z-index: -1;
`;

const ListTitle = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  position: absolute;
  left: 30%;
  top: 12%;
  width: 40%;
`;

const ListInfo = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  position: absolute;
`;

const ListPrice = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;
  position: absolute;
  top: 12%;
  right: 10%;
`;

const ListButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  height: 47px;
  width: 136px;
  position: absolute;
  bottom: 30%;
  right: 9%;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    color: #0acf83;
    background: #f9f9f9;
  }
`;

const ListDetailButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 136px;
  border-radius: 12px;
  margin: 12px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin: 0px 8px;
  background: #edeeee;
  border: 1px solid #edeeee;
  box-sizing: border-box;
  position: absolute;
  bottom: 13%;
  right: 8%;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    color: #0acf83;
  }
`;

const ListMainCategoriesContainer = styled.div`
  position: absolute;
  left: 30%;
  top: 45%;
`;

const ListMainCategorySpan = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
  margin-right: 1.5em;
`;

const ListMainCategory = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #0acf83;
`;

const ListSubCategoryContainer = styled.div`
  position: absolute;
  left: 30%;
  top: 60%;
`;

const ListSubCategorySpan = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
  margin-right: 4em;
`;

const ListSubCategory = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
`;

const ListAnimalCategoryContainer = styled.div`
  position: absolute;
  left: 30%;
  top: 75%;
`;

const ListAnimalCategorySpan = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
  margin-right: 2.8em;
`;

const ListAnimalCategory = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
`;

const ListStockContainer = styled.div`
  position: absolute;
  left: 30%;
  top: 90%;
`;

const ListStock = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
  margin-right: 2.8em;
`;

const ListStockNumber = styled.span`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #a9a9a9;
`;

const Stock = styled.p`
  font-family: "Poppins";
  font-style: normal;
  color: #151515;
  position: absolute;
  bottom: 20%;
`;

const Product = ({
  id,
  title,
  imagen,
  info,
  price,
  animalCategory,
  category,
  subCategory,
  viewMode,
  stock,
}) => {
  const navigate = useNavigate();
  const navigateToProductDetail = (e) => {
    e.stopPropagation();
    navigate(`/product/${e.currentTarget.id}`);
  };

  const user = useSelector((state) => state.clientReducer.user);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  const dispatch = useDispatch();

  let item = {
    user: user,
    item: {
      createdAt: Date(),
      title,
      quantity: 1,
      price,
      id,
      imagen,
    },
  };

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();

    let quantity = 0;
    if (user) {
      if(openCart){
        if (openCart[0]) {
          let itm = openCart[0].data.items.filter((el) => el.id === id);
          if (itm.length) {
            quantity = itm[0].quantity;
          }
        }
      }
    } else {
      if (Object.keys(openCart).length) {
        let itm = openCart.items.filter((el) => el.id === id);
        if (itm.length) {
          quantity = itm[0].quantity;
        }
      }
    }
    if (stock >= quantity + 1) {
      dispatch(addItemCartFront(item));
      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado con éxito.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Limite de stock alcanzado.",
      });
    }
  }

  if (viewMode === "List") {
    return (
      <ListContainer>
        <ListImage
          src={imagen || "https://imgur.com/lhLYKao"}
          alt="imagen not found"
        />
        <ListImageBackground />
        <ListTitle> {title} </ListTitle>
        <ListInfo>{info}</ListInfo>
        <ListPrice>{price.split(",")[0]}</ListPrice>
        <ListButton onClick={(e) => handleAdd(e)}> Agregar </ListButton>
        <ListDetailButton id={id} onClick={(e) => navigateToProductDetail(e)}>
          {" "}
          Ver Detalles {">"}{" "}
        </ListDetailButton>
        <ListMainCategoriesContainer>
          <ListMainCategorySpan> Categoria: </ListMainCategorySpan>
          <ListMainCategory> {category}</ListMainCategory>
        </ListMainCategoriesContainer>
        <ListSubCategoryContainer>
          <ListSubCategorySpan> Tipo: </ListSubCategorySpan>
          <ListSubCategory>
            {subCategory.length > 30
              ? subCategory.split("").slice(0, 35).join("") + "..."
              : subCategory}
          </ListSubCategory>
        </ListSubCategoryContainer>
        <ListAnimalCategoryContainer>
          <ListAnimalCategorySpan> Animal: </ListAnimalCategorySpan>
          <ListAnimalCategory> {animalCategory}</ListAnimalCategory>
        </ListAnimalCategoryContainer>
        <ListStockContainer>
          <ListStock> Stock: </ListStock>
          <ListStockNumber> {stock} uds.</ListStockNumber>
        </ListStockContainer>
        {/* <div>
                <h3> Animal : {animalCategory && animalCategory?.map((t,i) => <div key={i}> {t} </div> )}</h3>
              </div>
              <div>
                <h4> Categoria : {category && category?.map((t,i) => <div key={i}> {t}</div>)}</h4>
              </div> */}
      </ListContainer>
    );
  } else
    return (
      <Container>
        <Image
          src={imagen || "https://imgur.com/lhLYKao"}
          alt="imagen not found"
        />
        <Title> {title} </Title>
        <Info>{info}</Info>
        <Price>{price.split(",")[0]}</Price>
        <Stock>Stock: {stock} uds.</Stock>
        <Button onClick={(e) => handleAdd(e)}> Agregar </Button>
        {/* <div>
            <h3> Animal : {animalCategory && animalCategory?.map((t,i) => <div key={i}> {t} </div> )}</h3>
          </div>
          <div>
            <h4> Categoria : {category && category?.map((t,i) => <div key={i}> {t}</div>)}</h4>
          </div> */}
      </Container>
    );
};

export default Product;
