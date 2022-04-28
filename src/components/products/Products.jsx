import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Product from '../product/Product';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getProductsCategories, getAnimalCategories } from '../../redux/actions'
import Pagination from '../../components/pagination/Pagination'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    padding-right: 10em;
    justify-content: center;
    ${props => props.products.length > 8
        ? `
            margin-bottom: 1%;
        `
        : props.products.length < 8 && props.products.length > 4
            ? `
            margin-bottom: 15%;
            `
            : `
            margin-bottom: 40%;
        `
    }
`;

const Error = styled.h1`
    margin-top: 5%;
    margin-bottom: 20%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 22px;
`

const CatSleeping = styled.img`
    position: absolute;
    top: 0;
    left: 10%;
`


const Products = ({ viewMode, currentProducts, productsPerPage, paged, currentPage }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.clientReducer.products)


    useEffect(() => {
        dispatch(getProductsCategories())
        dispatch(getAnimalCategories())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigateToProduct = (e) => {
        if (viewMode === 'Grid') navigate(`/product/${e.currentTarget.id}`)
    }


    return (
        <Container products={allProducts}>
            {
                currentProducts?.length && !allProducts[0].msg ? (
                    currentProducts.map(e => {
                        if (!e.delete) { // Si queremos que se muestre lo eliminado, cambiar este condicional
                            return (
                                <div key={e.uid} id={e.uid} onClick={(e) => navigateToProduct(e)}>

                                    <Product title={e.data.name} imagen={e.data.image} info={e.data.info} price={e.data.price} animalCategory={e.data.animalCategory} category={e.data.category} subCategory={e.data.subCategory} viewMode={viewMode} id={e.uid} />

                                </div>
                            )
                        }
                    })
                ) : <div style={{ position: "relative" }}>
                    <Error>Lo siento, no hemos encontrado nada :(</Error>
                    <CatSleeping src='https://31.media.tumblr.com/e9c5a6eb1241c1cd3f89e12e89874c66/tumblr_mv1vm39xs51rz5dlbo1_500.gif' alt='' />
                </div>
            }
            <Pagination productsPerPage={productsPerPage} products={allProducts.length} paged={paged} currentPage={currentPage} />
        </Container>
    )
}

export default Products
