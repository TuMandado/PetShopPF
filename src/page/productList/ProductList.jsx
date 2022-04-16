import React from 'react'
import Products from '../../components/products/Products'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Footer from '../../components/footer/Footer'
import { Loader } from '../../page/loader/Loader'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Div = styled.div`
    height: 100%;
`

const FooterContainer = styled.div`
`

const ProductList = () => {
    const allProducts = useSelector(state => state.clientReducer.backup)

    return (
        <Div >
            {
                allProducts && allProducts.length
                    ? <Div>
                        <Navbar />
                        <Sidebar />
                        <Products />
                        <FooterContainer>
                            <Footer />
                        </FooterContainer>
                    </Div>
                    : <Loader />

            }
        </Div>
    )
}

export default ProductList
