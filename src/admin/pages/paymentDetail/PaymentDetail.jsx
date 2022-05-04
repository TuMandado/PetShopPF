import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../../../components/navbar/Navbar";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import { getAllCartsData } from '../../../redux/actions/cartActions';
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";

const PaymentDetail = () => {
  const user = useSelector((state) => state.clientReducer.user);
  // If user role is not Admin, redirect to the home page
  useEffect(() => {
    console.log("user :",user);
    if (user && Object.keys(user).length > 0 && user.role !== "Admin") {
      window.location.href = "/";
    }
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uid = useParams().payId;
    const allPaying = useSelector((state) => state.cartReducer.allCartsData);
    const [paying, setPaying] = useState([]);
    
    useEffect(() => {
      dispatch(getAllCartsData())
    }, []);
  
    useEffect(() => {
        setPaying((allPaying.find(pay => pay.uid == uid)));
    //   setPaying({
    //     return({
    //       fecha: el.data.createdAt,
    //       usuarioId: el.data.userUid,
    //       id: el.uid,
    //       estado: el.data.status,
    //       productos: el.data.items.map(e=> e.title),
    //       valor: 0,
    //     })
    //   })
    }, [allPaying, dispatch]);

    const navigateToProduct = (e) => {
        navigate(`/product/${e.currentTarget.id}`);
      };

  return (
    <div >
     <Navbar/>
     <div className="container">
         <AdminSidebar /> 
         <AllCartContainer>
        {paying && paying.data && (
          <OrderContainer>       
            <TitleContainer>
              <TuCarritoText> Usuario:</TuCarritoText>
              <TuCarritoText> Id usuario:{paying.data.userUid}</TuCarritoText>
              <TuCarritoText> productos:</TuCarritoText>
            </TitleContainer>
            <ListProduct>
              {paying.data.items.map((el) => {
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
                        Cantidad:  {el.quantity}
                      </SumDelContainer>
                    </CantidadContainer>
                  </ContainerProduct>
                );
              })}
            </ListProduct>
            <AsideOrden>
              <DataContainer>
                <Resumen>Resumen de compra:</Resumen>
                <div>
                  <TextAside>Precio Total: $ {paying.data.total} </TextAside>
                </div>
              </DataContainer>
            </AsideOrden>
          </OrderContainer>
        )}
      </AllCartContainer>
     </div>
    </div>
  )
}

export default PaymentDetail

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
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

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

const AllCartContainer = styled.div`
//   display: flex;
//   flex-direction: column;
  fleX: 3;
//   min-height: calc(100vh - 30px);
`;

const ListProduct = styled.div`
  display: flex;
  flex-direction: column;
//   float: left;
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
