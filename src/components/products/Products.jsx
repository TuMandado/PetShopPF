import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTotalProducts } from '../../redux/actions';
import Product from '../product/Product';
import { Loader } from '../../page/loader/Loader'
import styled from 'styled-components';


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
    const allProducts = useSelector(state => state.backup)
    console.log('esto es allProducts', allProducts)
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(getTotalProducts())
            .then((Response) => {
                setLoader(false)
            })
            .catch(error => setError(error.message))
    }, [dispatch])

    if (loader) {
        return (
            <div>
                 <Loader/>
            </div>
        )
    }

    return (
        <Container>
            {
                allProducts.length > 0 ? (
                    allProducts.map(e => {
                        return (
                            <div key={e.uid}>
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
