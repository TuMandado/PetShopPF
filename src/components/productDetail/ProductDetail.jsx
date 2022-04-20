import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { getDetailProducts, detailVacio } from "../../redux/actions";
import { addItemCartFront } from "../../redux/actions/cartActions";
import styled from "styled-components";

const DetailContainer = styled.div`
  position: relative;
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  width: 520px;
  height: 659px;
  left: 375px;
  top: 140px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 310px;
  height: 405px;
  left: 976px;
  top: 120px;
`;

const Image = styled.img`
  position: absolute;
  width: 310px;
  height: 310px;
  left: 0px;
`;

const ProductName = styled.h1`
  position: static;
  width: 464px;
  height: 40px;
  left: 0px;
  top: 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
  :hover {
    color: #0acf83;
  }
`;

const InfoContainer = styled.div`
  position: static;
  width: 470px;
  height: 51px;
  left: 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
`;

const PriceAddContainer = styled.div`
  position: relative;
  display: inline;
  width: 530px;
  height: 72px;
  left: 10px;
  align-self: center;
  margin-top: 78px;
`;

const Precio = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  width: 200px;
  height: 57px;
  top: 30px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  color: #151515;
`;

const BtnAdd = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  position: absolute;
  width: 118px;
  height: 47px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  left: 350px;
  top: 21.5px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
`;

const InfoSpan = styled.p`
  position: relative;
  display: inline-block;
  width: 269px;
  height: 19px;
  left: 0px;
  top: 22px;
  flex-grow: 0;
  margin: 8px 0px;
`;

const BtnHome = styled.button`
  width: 122px;
  height: 48px;
  font-size: 18px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  color: #ffff;
  padding: 5px 5px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 11px;
  position: relative;
`;

const ProductDetail = () => {
  const user = useSelector((state) => state.clientReducer.user);
  const product = useSelector((state) => state.clientReducer.backupDetail);
  const dispatch = useDispatch();
  const uid = useParams();
  console.log("uid", uid);

  useEffect(() => {
    dispatch(getDetailProducts(uid.id));
    return function () {
      dispatch(detailVacio());
    };
  }, [dispatch, uid]);

  let item = {
    user: user,
    item: {
      title: product.name,
      quantity: 1,
      price: product.price,
      id: uid.id,
    },
  };

  const handleAddCart = (e) => {
    e.preventDefault();
    dispatch(addItemCartFront(item));
  };

  if (!product.name) {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <DetailContainer>
        <DetailLeft>
          <div>
            <ProductName>{product.name}</ProductName>
          </div>
          <InfoContainer>
            <div>
              <InfoSpan>Animal: {product.animalCategory}</InfoSpan>
            </div>
            <div>
              <InfoSpan>Categoria: {product.subCategory}</InfoSpan>
            </div>
            <div>
              <InfoSpan>Marca: {product.brand}</InfoSpan>
            </div>
          </InfoContainer>
          <PriceAddContainer>
            <div>
              <Precio>{product.price}</Precio>
            </div>
            <div>
              <BtnAdd onClick={(e) => handleAddCart(e)}>Agregar</BtnAdd>
            </div>
          </PriceAddContainer>
        </DetailLeft>
        <ImageContainer>
          <Image
            src={product.image || "https://imgur.com/lhLYKao"}
            alt="imagen"
          />
        </ImageContainer>
        <div>
          <Link to="/products">
            <BtnHome>Volver</BtnHome>
          </Link>
        </div>
      </DetailContainer>

      {/* <Footer /> */}
    </div>
  );
};

export default ProductDetail;
