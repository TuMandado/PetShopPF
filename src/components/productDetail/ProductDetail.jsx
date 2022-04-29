import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar/Navbar";
import { Loader } from "../../page/loader/Loader";
import Footer from "../../components/footer/Footer";
import { getDetailProducts, detailVacio } from "../../redux/actions";
import { addItemCartFront } from "../../redux/actions/cartActions";
import styled from "styled-components";
import FormReview from "../formReview/FormReview";
import Reviews from "../reviews/Reviews";
import { star } from '../../data'


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
  position: absolute;
  right: 10%;
  top: 0;
  border-radius: 12px;
`;

const ProductName = styled.h1`
  position: absolute;
  left: 15%;
  top: 10%;
  width: 464px;
  height: 40px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  color: #151515;
  flex-grow: 0;
  margin: 2px;
`;

const InfoContainer = styled.div`
  width: 470px;
  height: 51px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  position: absolute;
  left: 15%;
  top: 55%;
`;



const Precio = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
  height: 57px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #151515;
  position: absolute;
  right: 38%;
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
  right: 43.5%;
  bottom: 20%;
  cursor: pointer;
  transition: 0.25s ease;
  &:hover {
    color: #0acf83;
    background: #F9F9F9;
  }
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


const StarsContainer = styled.div`
    position: absolute;
    transform: scale(1.5);
    left: 16%;
    top: 28%;
`

const ReviewsContainer = styled.div`
    margin-left: 18.6%;
    margin-top: 3em;
    width: 60%;
    position: relative;
    margin-bottom: 2em;
`

const GoBackButton = styled.div`
background: #F9F9F9;
border: 1px solid #D1D1D1;
box-sizing: border-box;
border-radius: 12px;
padding: 14px 16px;
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 18px;
margin-top: 3.2%;
margin-left: 6%;
cursor: pointer;
transition: 0.25s ease;
&:hover {
    color: #0acf83;
}
`



const ProductDetail = () => {
    const dispatch = useDispatch();
    const uid = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.clientReducer.user);
    const product = useSelector((state) => state.clientReducer.backupDetail);
    let productScore = useSelector(state => state.reviewsReducer.productScore);
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
    }, []);

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

    const goToStore = (e) => {
        navigate('/products')
    }

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
                    <GoBackButton onClick={e => goToStore(e)}> {"<"} Volver  </GoBackButton>
                    <div>
                        <ProductName>{product.name}</ProductName>
                    </div>
                    <StarsContainer>
                        {
                            totalStars.map(el => {
                                if (el) return star.full
                                else return star.empty
                            })
                        }
                    </StarsContainer>
                    <InfoContainer>
                        <InfoSpan>Animal: {product.animalCategory}</InfoSpan>
                        <InfoSpan>Categoria: {product.subCategory}</InfoSpan>
                        <InfoSpan>Marca: {product.brand}</InfoSpan>
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
                    {user ? (<FormReview user={user} id={uid.id} />) : (<p>Regístrate para dejar tu comentario</p>)}
                </ReviewsContainer>
                <Footer />
            </DetailContainer>
        </div>
    );
};

export default ProductDetail;
