import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTotalProducts } from '../../redux/actions';
import Product from '../product/Product';
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

const Loading = styled.h3`
    margin-left: 50%;
`

const Products = () => {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.backup)
    console.log(allProducts)
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
                <Loading>Cargando..</Loading>
            </div>
        )
    }

    const hardData = [{ uid: 1, data: { name: "Juguete para Morder", image: 'https://http2.mlstatic.com/D_NQ_NP_670403-MLA41725631770_052020-O.webp', info: "Es un juguete para morder", price: 2000, animalCategory: 'Perros', subCategory: 'Juguetes' } }, { uid: 2, data: { name: "Alimento Para Gato", image: 'https://ardiaprod.vteximg.com.br/arquivos/ids/219676-1000-1000/Alimento-para-Gatos-Cat-Chow-1--12-meses-500-Gr-_1.jpg?v=637790485061030000', info: "Esta re caro", price: 13000, animalCategory: 'Gatos', subCategory: 'Alimento' } }, { uid: 3, data: { name: "Correa Para Perro", image: 'https://http2.mlstatic.com/D_NQ_NP_648436-MLA44050982853_112020-O.webp', info: "Esta reforzada", price: 2400, animalCategory: 'Perro', subCategory: 'Complementos' } }]


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
