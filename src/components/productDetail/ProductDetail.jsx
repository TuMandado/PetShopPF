import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { getDetailProducts, detailVacio } from "../../redux/actions";
import { addItemCartFront } from "../../redux/actions/cartActions";
import styled from "styled-components";
import FormReview from "../formReview/FormReview";
import Reviews from "../reviews/Reviews";
import { star } from "../../data";
import Swal from "sweetalert2";

const DetailContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const DetailLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  height: 50%;
  margin-right: auto;
  margin-left: auto;
  position: relative;
`;

const Image = styled.img`
  width: 30%;
  height: 100%;
  max-height: 280px;
  position: absolute;
  right: 10%;
  top: 0;
  border-radius: 12px;
`;

const ProductName = styled.h1`
  position: absolute;
  left: 15%;
  top: 10%;
  width: 470px;
  height: 40px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
`;

const Precio = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 200px;
  height: 57px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #151515;
  position: absolute;
  right: 41%;
  top: 11%;
`;

const BtnAdd = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  width: 118px;
  height: 47px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #ffff;
  background: #0acf83;
  border: 2px solid #067a4d;
  box-sizing: border-box;
  border-radius: 8px;
  position: absolute;
  right: 41%;
  bottom: 11%;
  cursor: pointer;
  transition: 0.25s ease;
  &:hover {
    color: #0acf83;
    background: #f9f9f9;
  }
`;

const InfoContainer = styled.div`
  width: 470px;
  height: 25%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  position: absolute;
  left: 14%;
  top: 50%;
`;

const IndividualInfoContainer = styled.div`
  margin: 1.1em;
`;

const InfoSpanAnimal = styled.span`
  color: #a9a9a9;
  margin-right: 3em;
`;

const InfoSpanCategory = styled.span`
  color: #a9a9a9;
  margin-right: 1.5em;
`;

const InfoSpanBrand = styled.span`
  color: #a9a9a9;
  margin-right: 3.3em;
`;

const InfoSpanStock = styled.span`
  color: #a9a9a9;
  margin-right: 3.8em;
`;


const StarsContainer = styled.div`
  position: absolute;
  transform: scale(1.5);
  left: 16%;
  top: 33%;
`;

const ReviewsContainer = styled.div`
  margin-left: 18.6%;
  margin-top: 3em;
  width: 60%;
  position: relative;
  margin-bottom: 2em;
`;

const GoBackButton = styled.div`
  background: #f9f9f9;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 10px 16px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin-top: 3.1%;
  margin-left: 6%;
  cursor: pointer;
  transition: 0.25s ease;
  &:hover {
    color: #0acf83;
  }
`;



const ProductDetail = () => {
  const dispatch = useDispatch();
  const uid = useParams();
  const user = useSelector((state) => state.clientReducer.user);
  const product = useSelector((state) => state.clientReducer.backupDetail);
  const openCart = useSelector((state) => state.cartReducer.openCart);
  let productScore = useSelector((state) => state.reviewsReducer.productScore);
  productScore = Math.ceil(productScore);
  const totalStars = [false, false, false, false, false];
  for (let i = 0; i < productScore; i++) {
    totalStars[i] = true;
  }

  useEffect(() => {
    dispatch(getDetailProducts(uid.id));
    return function () {
      dispatch(detailVacio());
    };
  }, [dispatch, uid.id]);

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

    let quantity = 0;
    console.log("uid =", uid.id, "product =", product);
    if (user) {
      if(openCart){
        if (openCart[0]) {
          let itm = openCart[0].data.items.filter((el) => el.id === uid.id);
          if (itm.length) {
            quantity = itm[0].quantity;
          }
        }

      }
    } else {
      if (Object.keys(openCart).length) {
        let itm = openCart.items.filter((el) => el.id === uid.id);
        if (itm.length) {
          quantity = itm[0].quantity;
        }
      }
    }
    if (product.stock >= quantity + 1) {
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
  };

  const goBack = (e) => {
    window.history.go(-1);
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
          <GoBackButton onClick={(e) => goBack(e)}> {"<"} Volver </GoBackButton>
          <div>
            <ProductName>{product.name}</ProductName>
          </div>
          <StarsContainer>
            {totalStars.map((el) => {
              if (el) return star.full;
              else return star.empty;
            })}
          </StarsContainer>
          <InfoContainer>
            <IndividualInfoContainer>
              <InfoSpanAnimal>Animal: </InfoSpanAnimal>
              <span>{product.animalCategory}</span>
            </IndividualInfoContainer>
            <IndividualInfoContainer>
              <InfoSpanCategory>Categoria: </InfoSpanCategory>
              <span> {product.subCategory}</span>
            </IndividualInfoContainer>
            <IndividualInfoContainer>
              <InfoSpanBrand>Marca: </InfoSpanBrand>
              <span> {product.brand}</span>
            </IndividualInfoContainer>
            <IndividualInfoContainer>
              <InfoSpanStock>Stock: </InfoSpanStock>
              <span> {product.stock}</span>
            </IndividualInfoContainer>
          </InfoContainer>
          <Precio>{product.price}</Precio>
          <BtnAdd onClick={(e) => handleAddCart(e)}>Agregar</BtnAdd>
          <Image
            src={product.image || "https://imgur.com/lhLYKao"}
            alt="imagen"
          />
        </DetailLeft>
        <ReviewsContainer>
          <Reviews id={uid.id} />
          {user ? (
            <FormReview user={user} id={uid.id} />
          ) : (
            <p>Regístrate para dejar tu comentario</p>
          )}
        </ReviewsContainer>
        <Footer />
      </DetailContainer>
    </div>
  );
};

export default ProductDetail;
