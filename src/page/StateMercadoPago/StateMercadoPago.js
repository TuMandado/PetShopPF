import React, { useEffect } from "react";
import { editCartFirebase } from "../../firebase/Cart/index";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/actions/cartActions";
import { emails } from "../../firebase/emails.js";
import DogImg from "../../assets/component_finalpagoperro.png";
import styled from "styled-components";

const StateMercadoPago = () => {
  const querystring = window.location.search;
  let info = querystring.slice(1);
  let arrayinfo = info.split("&");
  let infospliteada = [];
  let status;
  const user = useSelector((state) => state.clientReducer.user);

  let infoMercadoPago = {};
  arrayinfo.map((i) => {
    infospliteada = i.split("=");
    infoMercadoPago = {
      ...infoMercadoPago,
      [infospliteada[0]]: infospliteada[1],
    };
  });
  console.log("mercadopago", infoMercadoPago.status);

  const getData = async () => {
    const carrito = await getCart(infoMercadoPago.external_reference);
    emails(user, carrito.items);
  };
  useEffect(() => {
    if (user) {
      if (infoMercadoPago.status === "approved") {
        // llamo a la funcion guardar carrito en bd
        // poner en estado aproved
        status = {
          close: true,
          status: "approved",
        };

        editCartFirebase(infoMercadoPago.external_reference, status);
        getData();
      } else if (infoMercadoPago.status === "rejected") {
        // "status=rejected"
        // llamo a la funcion de guardar carrito
        // status rejected
        // status_detail=> va el porque se rechazo
        status = {
          close: true,
          status: "rejected",
        };

        console.log("hola 2");
        editCartFirebase(infoMercadoPago.external_reference, status);
      } else if (infoMercadoPago.status === "in_process") {
        // funcion carrito
        // status pending
        status = {
          close: true,
          status: "in_process",
        };

        editCartFirebase(infoMercadoPago.external_reference, status);
      }
    }
  }, [JSON.stringify(user)]);

  return (
    <div>
      <TitleContainer>
        <Title>¡Tu compra se completo con éxito!</Title>
      </TitleContainer>

      <InfoPayd>
        <Pe>
          En unos minutos le llegara a tu e-mail un mensaje confirmando el pago
          y sus detalles.
        </Pe>

        <Image src={DogImg} />
        <BtnToPets onClick={() => window.location.assign("/")}>
          Volver a Home
        </BtnToPets>
      </InfoPayd>
    </div>
  );
};
export default StateMercadoPago;

const TitleContainer = styled.div`
  height: 60px;
  width: 100%;
  padding-top: 20px;
  text-align: center;
`;

const Title = styled.h1`
  height: 100px;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #151515;
  margin-top: 60px;
`;
const InfoPayd = styled.div`
  display: block;
  text-align: center;
  margin: auto;
`;

const Pe = styled.h5`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  margin: 0px auto;
  padding-top: 60px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
`;
const BtnToPets = styled.button`
  display: absolute;
  flex-direction: row;
  margin-top: 480px;
  position: absolute;
  width: 160px;
  height: 47px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  &:hover {
    color: #0acf83;
    background: #ffff;
    border: 3px solid #067a4d;
    cursor: pointer;
  }
`;

const Image = styled.img`
  justify-content: center;
  align-items: center;
  width: 540px;
  height: 380px;
  padding-top: 45px;
`;
