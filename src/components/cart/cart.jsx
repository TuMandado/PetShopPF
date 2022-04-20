import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openCartFront,
  deleteItemsCartFront,
} from "../../redux/actions/cartActions";
import CartEmpy from "../../assets/carrito_vacio.gif";
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

const EmpyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 800px;
  height: 364px;
  left: calc(50% - 596px / 2 + 30px);
  top: 15px;
`;

const Error = styled.h1`
  position: static;
  width: 400px;
  height: 45px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 140%;
  text-align: center;
  color: #151515;
  padding-top: 15px;
`;

const Description = styled.p`
  position: static;
  width: 425px;
  height: 60px;
  left: 0px;
  top: 5px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #151515;
  flex: none;
  flex-grow: 0;
  margin: 20px 0px;
`;

const BtnVolver = styled.button`
  width: 125px;
  height: 47px;
  position: relative;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #ffff;
  padding: 10px 10px;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  left: 157px;
  top: 2px;
  :hover {
    color: #0acf83;
    background: #ffff;
    border: 2px solid #067a4d;
  }
`;

const ImageError = styled.img`
  display: relative;
  justify-content: center;
  align-items: center;
  margin-top: 17%;
  width: 310px;
  height: 310px;
`;

export function Cart() {
  const user = useSelector((state) => state.clientReducer.user);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openCartFront(user));
  }, [dispatch, user]);

  let items = [];
  let itemDelete = {};

  if (openCart) {
    if (user && openCart[0]) {
      items = openCart[0].data.items;
    } else {
      items = openCart.items;
    }
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    itemDelete = {
      user: user,
      item: {
        id,
      },
    };
    // console.log("-Item-Delete-Flag", itemDelete);
    dispatch(deleteItemsCartFront(itemDelete));
  };

  return (
    <div>
      {/* <TitleContainer>
        <TuCarritoText>¡Llevá todo lo que necesites!</TuCarritoText>
      </TitleContainer> */}
      ;
      {items && items.length ? (
        items.map((el) => {
          return (
            <ContainerProduct>
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
              <ButtonDelete onClick={(e) => handleDelete(e, el.id)}>
                Eliminar
              </ButtonDelete>
            </ContainerProduct>
          );
        })
      ) : (
        <EmpyContainer>
          <ImageError src={CartEmpy} alt="carrito vacio" />
          <Error>¡Tu carrito está vacío!</Error>
          <Description>
            ¿Aún no te has decidido?.¡No hay problema! <br /> Podés seguir
            recorriendo la tienda sin apuros :)
          </Description>
          <Link to={"/products"}>
            <BtnVolver>Ir a la tienda</BtnVolver>
          </Link>
        </EmpyContainer>
      )}
    </div>
  );
}
