import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Product from '../product/Product';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    padding-left: 17em;
    padding-right: 10em;
    justify-content: center;
    margin-bottom: 20%;
`;

const Products = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.backup)
    console.log('esto es allProducts', allProducts)
     
    const navigateToProduct = (e) => {
        navigate(`/product/${e.currentTarget.id}`)
    }

    return (
        <Container>
            {
                allProducts.length > 0 ? (
                    allProducts.map(e => {
                        return (
                            <div key={e.uid} id={e.uid} onClick={(e) => navigateToProduct(e)}>
                                <Product title={e.data.name} imagen={e.data.image} info={e.data.info} price={e.data.price} animalCategory={e.data.animalCategory} category={e.data.subCategory} />
                            </div>
                        )
                    })
                ) : (
                    <div>
                        <h1>Error, no hay datos</h1>
                    </div>
                )
            }
        </Container>
    )
}

export default Products
