import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCartFront } from "../../redux/actions/cartActions";
import styled from "styled-components";

const TitleContainer = styled.div`
  height: 80px;
`;

const TuCarritoText = styled.h1`
  height: 100px;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #151515;
  margin: 2px;
  :hover {
    color: #0acf83;
  }
`;

const ContainerProduct = styled.div`
  display: flex;
  position: relative;
  width: 900px;
  height: 180px;
  padding: 15px;
  margin: 15px 0px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
  :hover {
    border: 2px solid #0acf83;
  }
`;

const ImageBackground = styled.div`
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

const ImageProduct = styled.img`
  max-width: 268px;
  max-height: 280px;
  left: 5%;
  top: 20%;
  position: absolute;
  align-self: flex-start;
  border-radius: 12px;
`;

const TitleCartProduct = styled.h3`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  position: absolute;
  left: 28%;
  top: 10%;
  width: 45%;
`;

const PrecioProd = styled.span`
  position: absolute;
  top: 10%;
  right: 9%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #151515;
`;

const ButtonDelete = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 136px;
  border-radius: 8px;
  margin: 12px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  margin: 0px 8px;
  box-sizing: border-box;
  position: absolute;
  bottom: 11%;
  right: 8%;
  color: #ffff;
  background: #e6704b;
  border: 2px solid #c7522d;
  &:hover {
    color: #e6704b;
    background: #ffff;
    border: 2px solid #c7522d;
  }
`;

const CantidadContainer = styled.div`
  display: flex;
  position: absolute;
  height: 38px;
  width: 165px;
  bottom: 30%;
  right: 6%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  background: #edeeee;
  border: 1px solid #edeeee;
xxxxxxx
  color: #ffffff;
`;

const SumDelContainer = styled.div`
  width: 150px;
  height: 35px;
  display: inline-block;
`;

const BtnSum = styled.button`
  font-family: "Poppins";
  font-weight: 600;
  margin: 1px;
  border: none;
  &:hover {
    color: #0acf83;
  }
`;
const BtnSup = styled.button`
  font-family: "Poppins";
  font-weight: 600;
  margin: 1px;
  border: none;
  &:hover {
    color: #e6704b;
  }
`;

export function Cart() {
  const user = useSelector((state) => state.clientReducer.user);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openCartFront(user));
  }, [dispatch, user]);

  let items = [];

  if (openCart) {
    if (user && openCart[0]) {
      console.log(openCart);
      items = openCart[0].data.items;
    } else {
      items = openCart.items;
    }
  }

  return (
    <div>
      <TitleContainer>
        <TuCarritoText>Tu carrito:</TuCarritoText>
      </TitleContainer>
      {items && items.length ? (
        items.map((el) => {
          return (
            <ContainerProduct>
              {/* {console.log(el)} */}
              <ImageBackground>
                <ImageProduct src={el.imagen} alt="image" />
              </ImageBackground>
              <TitleCartProduct>{el.title}</TitleCartProduct>
              <PrecioProd>{el.price} </PrecioProd>
              <CantidadContainer>
                <SumDelContainer>
                  Cantidad: <BtnSup>-</BtnSup>
                  {el.cantidad}
                  <BtnSum>+</BtnSum>
                </SumDelContainer>
              </CantidadContainer>
              <ButtonDelete>Eliminar</ButtonDelete>
            </ContainerProduct>
          );
        })
      ) : (
        <div>
          <h1>No hay productos para mostrar</h1>
          <button>Ir a la tienda</button>
        </div>
      )}
    </div>
  );
}
