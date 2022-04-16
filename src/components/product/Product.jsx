import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    width: 268px;
    height: 360px;
    border: 1px solid #D1D1D1;
    box-sizing: border-box;
    border-radius: 12px;
    margin: 0px 32px;
    margin-bottom: 4em;
    transition: 0.25s ease;
    &:hover {
        transition: 0.5s ease;
        width: 290px;
        cursor: pointer;
        margin: 0px 21px;
        border: 1px solid #0ACF83;
    }
`

const Image = styled.img`
    align-self: center;
    max-width: 236px;
    max-height: 180px;
    border-radius: 12px;
`
const Title = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    position: absolute;
    bottom: 35%;
    width: 90%;
`

const Info = styled.p`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    bottom: 30%;
`

const Price = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    color: #151515;
    position: absolute;
    bottom: 5%;
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background: #0ACF83;
    border: 2px solid #067A4D;
    box-sizing: border-box;
    border-radius: 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
    color: #FFFFFF;
    height: 36px;
    width: 88px;
    position: absolute;
    bottom: 5%;
    right: 6%;
`



const Product = ({ title, imagen, info, price, animalCategory, category }) => {

    return (
        <Container>
            <Image src={imagen} alt="imagen not found" />
            <Title> {title} </Title>
            <Info>{info}</Info>
            <Price>{price.split(',')[0]}</Price>
            <Button> Agregar </Button>
            {/* <div>
        <h3> Animal : {animalCategory && animalCategory?.map((t,i) => <div key={i}> {t} </div> )}</h3>
      </div>
      <div>
        <h4> Categoria : {category && category?.map((t,i) => <div key={i}> {t}</div>)}</h4>
      </div> */}
        </Container>

    )
}

export default Product
