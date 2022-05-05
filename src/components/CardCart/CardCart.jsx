import React, { useState } from "react";
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
import Footer from "../footer/Footer";
import Swal from "sweetalert2";
import styled from "styled-components";
import { MercadoPagoConfiguration } from "../../firebase/MercadoPago/MercadoPago";
import { getProduct } from "../../firebase/Products";

const ContainerProduct = styled.div`
  display: flex;
  position: relative;
  width: 900px;
  height: 200px;
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
  object-fit: cover;
  width: 27%;
  background: #f9f9f9;
  //background: gray;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Input = styled.input`
  width: 55px;
  height: 31px;
  color: black;
  padding: px;
  margin-top: 8px;
  margin-right: 4px;
  font-size: 16px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  background: none;
  border: 1px solid #a9a9a9;
  box-sizing: border-box;
  border-radius: 8px;
  &::
  -webkit-input-appearance{none};
  -webkit-input-placeholder {
    color: black;
    background: none;
  }
`;

const ImageProduct = styled.img`
  display: flex;
  justify-content: center;
  max-width: 268px;
  max-height: 80%;
  margin-left: 20%;
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
  font-size: 18px;
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
  height: 35px;
  width: 111px;
  border-radius: 8px;
  margin: 12px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  box-sizing: border-box;
  position: absolute;
  bottom: 4%;
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
  width: 180px;
  bottom: 40%;
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
  display: flex;
  justify-content: center;
  align-items: center;
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

const CardCart = ({ id, imagen, title, price, quantity }) => {
  const user = useSelector((state) => state.clientReducer.user);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState(quantity);
  const [err, setErr] = useState("");

  let itemDelete = {};
  let itemQuantity = {};

  const handleChange = async (e, id) => {
    let quantity = Number(e.target.value);
    setInput(e.target.value);
    itemQuantity = {
      user,
      item: {
        id,
      },
      number: quantity,
    };
    let item = await getProduct(id);
    if (item) {
      if (e.target.value <= item.stock) {
        setErr("");
        dispatch(editItemsCartFront(itemQuantity));
      } else {
        setErr(`El stock actual es ${item.stock}`);
      }
    }
  };

  const navigateToProduct = (e) => {
    navigate(`/product/${e.currentTarget.id}`);
  };

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
    let num = ele - 1;
    console.log("-Number-Flag", itemQuantity);
    dispatch(editItemsCartFront(itemQuantity)).then(setInput(num));
  };

  const handleAdd = async (e, ele, id) => {
    e.preventDefault();
    itemQuantity = {
      user,
      item: {
        id,
      },
      number: ele + 1,
    };
    console.log("Number+Flag", itemQuantity);
    let num = ele + 1;
    let itemDb = await getProduct(id);
    let quantity = 0;
    //console.log("uid =",uid.id,"product =",product)
    console.log("itemDb", itemDb);
    if (user) {
      if (openCart[0]) {
        let itm = openCart[0].data.items.filter((el) => el.id === id);
        if (itm.length) {
          quantity = itm[0].quantity;
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
    if (itemDb.stock >= quantity + 1) {
      dispatch(editItemsCartFront(itemQuantity)).then(setInput(num));
    } else {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Limite de stock alcanzado.",
      });
    }
  };

  return (
    <ContainerProduct key={id}>
      <ImageBackground>
        <ImageProduct src={imagen} alt="image" />
      </ImageBackground>
      <TitleCartProduct id={id} onClick={(e) => navigateToProduct(e)}>
        {title}
      </TitleCartProduct>
      <PrecioProd>{price} </PrecioProd>
      <CantidadContainer>
        <SumDelContainer>
          Cantidad:{" "}
          <BtnSup
            disabled={quantity <= 1 ? true : false}
            onClick={(e) => {
              handleSupr(e, quantity, id);
            }}
          >
            -
          </BtnSup>
          {quantity}
          {/* <Input
            type="number"
            value={input}
            name="quantity"
            onChange={(e) => handleChange(e, id)}
          />
          {err ? <p>{err}</p> : <p> </p>} */}
          <BtnSum
            onClick={(e) => {
              handleAdd(e, quantity, id);
            }}
          >
            +
          </BtnSum>
        </SumDelContainer>
      </CantidadContainer>
      <ButtonDelete onClick={(e) => handleDelete(e, id)}>Eliminar</ButtonDelete>
    </ContainerProduct>
  );
};

export default CardCart;
