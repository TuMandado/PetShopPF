import React, { useEffect } from 'react'
import Products from '../../components/products/Products'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Footer from '../../components/footer/Footer'
import styled from 'styled-components'

const Div = styled.div`
    height: 100%;
`

const FooterContainer = styled.div`
`

const ProductList = () => {
    
    return (
        <Div >
            <Navbar />
            <Sidebar />
            <Products />
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </Div>

    )
}

export default ProductList
