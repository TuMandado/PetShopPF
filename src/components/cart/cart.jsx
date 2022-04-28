import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openCartFront,
  deleteItemsCartFront,
  editItemsCartFront,
  getQuantity,
} from "../../redux/actions/cartActions";
import CartEmpy from "../../assets/carrito_vacio.gif";
import styled from "styled-components";
import mercadopago from "mercadopago";


const REACT_APP_ACCESS_TOKEN =
  "TEST-5909391637745101-041518-e07a43a5f92224ee501bc4d9feca4624-191706246";
const url = window.location.href
  .split("//")[1]
  .split("/")[0]
  .replace(/^/, "https://");

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
  padding-top: 24px;
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
  display: flex;
  justify-content: center;
  // text-align: center;
  max-width: 268px;
  max-height: 280px
  margin-left: 16px;
  top: 8%;
  letf:5%;
  position: absolute;
  // align-self: flex-start;
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
  height: 35px;
  width: 160px;
  bottom: 30%;
  right: 8%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  background: #edeeee;
  border: 1px solid #edeeee;
  color: #151515;
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
  &:active {
    color: #067a4d;
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
  &:active {
    color: #067a4d;
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

const BtnMercadoPago = styled.button`
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
const OrderContainer = styled.div`
  text-align: center;
  margin: auto;
`;


const AllCartContainer = styled.div`
  display: flex;
  text-align: center;
  margin: auto;
`;

const MercadoPagoConfiguration = async (carrito, id_order,user) => {
      await mercadopago.configure({
          access_token: REACT_APP_ACCESS_TOKEN
      })
      
      console.log(user)
      
      const items = carrito.map(i=>{ // mapeo elementos del carrito
        let price= i.price.slice(1)
        let price1= price.split('.')
        let price2=price1.join('')
        let pricefinally=price2.split(',')

         console.log('price',pricefinally)
          return {
              title: i.title,
              unit_price:Number(pricefinally[0]),
              quantity: i.quantity
          }
      })
      console.log('item',items,'id_order',id_order[0].uid)
      let preference ={
          items:items, // item para vender
          external_reference:  `${id_order[0].uid}`,// id orden compra
          parament_methods:{  // metodos de pago
              excludeds_payment_types:[ // excluimos el pago por cajero automatico
                  {
                      id:'atm'
                  }
              ],
              installments:3, // cant maxima de cuotas
          },
          back_Urls: {
                      success:'http://localhost:3000/StateMercadoPago',
                      failure:'http://localhost:3000/StateMercadoPago',
                      pending:'http://localhost:3000/StateMercadoPago',
          },
          
          payer:{
            name:user.name,
            email:user.email
          },
          statement_description:'petshop',
          capture:true,
          redirect:'http://localhost:3000/',
          binary_mode:true
          
          

      }
 
    }



export function Cart() {
  const user = useSelector((state) => state.clientReducer.user);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openCartFront(user));
  }, [user]);


    const handleSubmit = () => {
        MercadoPagoConfiguration(items, openCart,user)
    }

  let items = [];
  let itemDelete = {};
  let itemQuantity = {};
  let total = 0;

  if (openCart) {
    if (user && openCart[0]) {
      items = openCart[0].data.items;
    } else {
      items = openCart.items;
    }
  }

  if (items) {
      items.map((el) => {
        let delSim = el.price.slice(2);
        let delDot = delSim.replace(".", "");
        let repCom = delDot.replace(",", ".");
        let price = Number(repCom);
        let sum = price * el.quantity;
        total = total + sum;
      });
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
    return alert("Producto borrado con éxito. ¡Continua comprando!");
  };
 

  //Recibe un objeto con las propiedades{user,item,number},
  //siendo number el numero final que queda en la base de datos
  const handleSupr = (e, ele, id) => {
    e.preventDefault();
    if (ele > 1) {
      itemQuantity = {
        user,
        item: {
          id,
        },
        number: ele - 1,
      };
    } else {
      alert(
        "Cuidado! Debe haber al menos 1 articulo para reducir la cantidad."
      );
    }
    console.log("-Number-Flag", itemQuantity);
    dispatch(editItemsCartFront(itemQuantity));
  };

  const handleAdd = (e, ele, id) => {
    e.preventDefault();
    itemQuantity = {
      user,
      item: {
        id,
      },
      number: ele + 1,
    };
    console.log("Number+Flag", itemQuantity);
    dispatch(editItemsCartFront(itemQuantity));
  };

  return (
    <AllCartContainer>
      {items && items.length ? (

        <OrderContainer>
          <TitleContainer>
            <TuCarritoText>Tus productos:</TuCarritoText>
          </TitleContainer>
          {items.map((el) => {
            return (
              <ContainerProduct key={el.id}>
                <ImageBackground>
                  <ImageProduct src={el.imagen} alt="image" />
                </ImageBackground>
                <TitleCartProduct>{el.title}</TitleCartProduct>
                <PrecioProd>{el.price} </PrecioProd>
                <CantidadContainer>
                  <SumDelContainer>
                    Cantidad:{" "}
                    <BtnSup
                      disabled={el.quantity <= 1 ? true : false}
                      onClick={(e) => {
                        handleSupr(e, el.quantity, el.id);
                      }}
                    >
                      -
                    </BtnSup>
                    {el.quantity}
                    <BtnSum
                      onClick={(e) => {
                        handleAdd(e, el.quantity, el.id);
                      }}
                    >
                      +
                    </BtnSum>
                  </SumDelContainer>
                </CantidadContainer>
                <ButtonDelete onClick={(e) => handleDelete(e, el.id)}>
                  Eliminar
                </ButtonDelete>
              </ContainerProduct>
            );
          })}
          <BtnMercadoPago onClick={handleSubmit}>Pagar</BtnMercadoPago>
          <p>Precio Total: $ {total}</p>
        </OrderContainer>

      ) : (
        <EmpyContainer>
          <ImageError src={CartEmpy} alt="carrito vacio" />
          <Error>¡Tu carrito está vacío!</Error>
          <Description>
            ¿Aún no te has decidido?.¡No hay problema! <br /> Podés seguir
            recorriendo la tienda sin apuros
          </Description>
          <Link to={"/products"}>
            <BtnVolver>Ir a la tienda</BtnVolver>
          </Link>
        </EmpyContainer>
      )}
    </AllCartContainer>
  );
}


