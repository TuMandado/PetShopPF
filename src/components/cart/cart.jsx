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
  max-width: 268px;
  max-height: 250px;
  margin-left: 16px;
  position: absolute;
  object-fit: cover;
  top: 8%;
  left: 5%;
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
  cursor: pointer;
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
    MercadoPagoConfiguration(items, openCart, user);
  };

  const navigateToProduct = (e) => {
    navigate(`/product/${e.currentTarget.id}`);
  };

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

  const handleDelete = (e, id) => {
    e.preventDefault();
    itemDelete = {
      user: user,
      item: {
        id,
      },
    };
    // console.log("-Item-Delete-Flag", itemDelete);
    return Swal.fire({
      title: "¿Seguro?",
      text: "¡Estás por quitar este producto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0acf83",
      cancelButtonColor: "#e6704b",
      confirmButtonText: "Si, quitalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItemsCartFront(itemDelete));
        Swal.fire("Borrado!", "El producto fue quitado.", "success");
      }
    });
  };

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
                  <ContainerProduct key={el.id}>
                    <ImageBackground>
                      <ImageProduct src={el.imagen} alt="image" />
                    </ImageBackground>
                    <TitleCartProduct
                      id={el.id}
                      onClick={(e) => navigateToProduct(e)}
                    >
                      {el.title}
                    </TitleCartProduct>
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
