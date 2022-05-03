import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openCartFront,
  deleteItemsCartFront,
  editItemsCartFront,
  /* getQuantity, */
  clearCart,
} from "../../redux/actions/cartActions";
import CartEmpy from "../../assets/carrito_vacio.gif";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import styled from "styled-components";
import { MercadoPagoConfiguration } from "../../firebase/MercadoPago/MercadoPago";
import { getProduct } from "../../firebase/Products";
import CardCart from "../CardCart/CardCart";


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

const ButtonDeleteAll = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 136px;
  border-radius: 8px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  box-sizing: border-box;
  color: #ffff;
  background: #e6704b;
  border: 2px solid #c7522d;
  &:hover {
    color: #e6704b;
    background: #ffff;
    border: 2px solid #c7522d;
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
  left: 40%;
  top: 9%;
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
  width: 425px;
  height: 60px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #151515;
  margin: 1em;
  margin-left: 2em;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 115px;
  border-radius: 8px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  box-sizing: border-box;
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
  margin-bottom: 12px;
`;

const AllCartContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 30px);
`;

const ListProduct = styled.div`
  float: left;
  margin: auto 15px;
`;

const AsideOrden = styled.aside`
  width: 360px;

  max-height: 80%;
  text-align: center;
  float: right;
  padding-left: 38px;
  padding: 25px;
  margin: 15px 30px;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
`;

const TextAside = styled.p`
  width: 425px;
  height: 60px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #151515;
  margin: 1em;
  margin-left: 2em;
`;

const Resumen = styled.h3`
  font-size: 20px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  background: none;
  margin-right: 15px;
  color: #151515;
`;

const DataContainer = styled.div`
  aligne-items: center;
  `;
  
  export function Cart() {
    const user = useSelector((state) => state.clientReducer.user);
    const openCart = useSelector((state) => state.cartReducer.openCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
 
    useEffect(() => {
    dispatch(openCartFront(user));
  }, [dispatch, user]);

  const handleSubmit = () => {
    if (!user) {
      return Swal.fire({
        title: "¡Logueate!",
        text: "Para hacer un pago, debes estar logeado o registrado. ¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0acf83",
        cancelButtonColor: "#e6704b",
        confirmButtonText: "Ir al login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/login`);
        }
      });
    } else MercadoPagoConfiguration(items, openCart, user);
  };


  let items = [];
  let total = 0;

  if (openCart) {
    if (user && openCart[0]) {
      items = openCart[0].data.items;
    } else {
      items = openCart.items;
    }
  }

  if (items) {
    // eslint-disable-next-line array-callback-return
    items.map((el) => {
      let delSim = el.price.slice(2);
      let delDot = delSim.replace(".", "");
      let repCom = delDot.replace(",", ".");
      let price = Number(repCom);
      let sum = price * el.quantity;
      total = total + sum;
    });
  }


  const handleClear = (e, id) => {
    e.preventDefault();

    return Swal.fire({
      title: "¡Cuidado!",
      text: "¡Estás por quitar todos los productos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0acf83",
      cancelButtonColor: "#e6704b",
      confirmButtonText: "Si, quitar todos!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart({ user, id: id }));
        Swal.fire("Completado", "El carrito esta vacio.", "success");
      }
    });
  };

  
  return (
    <div>
      <AllCartContainer>
        {items && items.length ? (
          <OrderContainer>
            <TitleContainer>
              <TuCarritoText>Tus productos:</TuCarritoText>
            </TitleContainer>
            <ListProduct>
              {items.map((el) => {
                return (
                    <CardCart
                    id={el.id}
                    imagen={el.imagen}
                    title={el.title}
                    price={el.price}
                    quantity={el.quantity}
                    />
                );
              })}
            </ListProduct>
            <AsideOrden>
              <DataContainer>
                <Resumen>Resumen de compra:</Resumen>
                <div>
                  <TextAside>Precio Total: $ {total}</TextAside>
                  <BtnMercadoPago onClick={handleSubmit}>Pagar</BtnMercadoPago>
                </div>
                <div>
                  <TextAside>¿Deseas limpiar tu carrito?</TextAside>

                  <ButtonDeleteAll
                    onClick={(e) =>
                      handleClear(e, openCart[0] ? openCart[0].uid : openCart)
                    }
                  >
                    Limpiar{" "}
                  </ButtonDeleteAll>
                </div>
              </DataContainer>
            </AsideOrden>
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
      <Footer />
    </div>
  );
}
