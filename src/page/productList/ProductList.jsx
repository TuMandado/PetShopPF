import React, { useState } from 'react'
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

const ViewModeContainer = styled.div`
    margin-top: 2em;
    ${props => (
        props.viewMode === 'List'
        ? `margin-bottom: 0; `
        : `margin-bottom: 0.6em; `
    )}
    
    margin-left: 86%;
`

const ListMode = styled.button`
    border: none;
    background: none;
    ${props => (
        props.viewMode === 'List'
            ? `
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.333 1.33325H2.66634C1.92996 1.33325 1.33301 1.93021 1.33301 2.66659V13.3333C1.33301 14.0696 1.92996 14.6666 2.66634 14.6666H13.333C14.0694 14.6666 14.6663 14.0696 14.6663 13.3333V2.66659C14.6663 1.93021 14.0694 1.33325 13.333 1.33325Z' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 4.6665H14.6663' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 8H14.6663' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 11.3333H14.6663' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        filter: brightness(0) saturate(100%) invert(60%) sepia(15%) saturate(3400%) hue-rotate(112deg) brightness(98%) contrast(92%);

        `
            : `
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.333 1.33325H2.66634C1.92996 1.33325 1.33301 1.93021 1.33301 2.66659V13.3333C1.33301 14.0696 1.92996 14.6666 2.66634 14.6666H13.333C14.0694 14.6666 14.6663 14.0696 14.6663 13.3333V2.66659C14.6663 1.93021 14.0694 1.33325 13.333 1.33325Z' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 4.6665H14.6663' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 8H14.6663' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 11.3333H14.6663' stroke='%23A9A9A9' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        filter: brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(7%) hue-rotate(158deg) brightness(97%) contrast(82%);
        
        `
    )}
    
    background-repeat: no-repeat;
    background-size: cover;
    height: 2em;
    width: 2em; 
    margin: 0 0.2em;

    &:hover {
        cursor: pointer;
    }
    
`
const GridMode = styled.button`
    border: none;
    background: none;
    ${props => (
        props.viewMode === 'Grid'
            ? `
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.333 1.33325H2.66634C1.92996 1.33325 1.33301 1.93021 1.33301 2.66659V13.3333C1.33301 14.0696 1.92996 14.6666 2.66634 14.6666H13.333C14.0694 14.6666 14.6663 14.0696 14.6663 13.3333V2.66659C14.6663 1.93021 14.0694 1.33325 13.333 1.33325Z' stroke='%230ACF83' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 8H14.6663' stroke='%230ACF83' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 1.33325V14.6666' stroke='%230ACF83' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        `
            : `
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.333 1.33325H2.66634C1.92996 1.33325 1.33301 1.93021 1.33301 2.66659V13.3333C1.33301 14.0696 1.92996 14.6666 2.66634 14.6666H13.333C14.0694 14.6666 14.6663 14.0696 14.6663 13.3333V2.66659C14.6663 1.93021 14.0694 1.33325 13.333 1.33325Z' stroke='%230ACF83' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.33301 8H14.6663' stroke='%230ACF83' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 1.33325V14.6666' stroke='%230ACF83' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        filter: brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(7%) hue-rotate(158deg) brightness(97%) contrast(82%);
        `
    )}
    
    background-repeat: no-repeat;
    background-size: cover;
    height: 2em;
    width: 2em;
    margin: 0 0.2em;
    &:hover {
        cursor: pointer;
    }

`

const Label = styled.label`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 16px;
    margin: 0px 4px;
    transition: 0.1s ease;
    &:hover {
        font-weight: 600;
        transition: 0.1s ease;
        cursor: pointer;
        color: #0ACF83;
    }
`

const ProductList = () => {
    const allProducts = useSelector(state => state.clientReducer.backup)
    const [viewMode, setViewMode] = useState('Grid')

    const changeViewModeGrid = (e) => {
        setViewMode('Grid')
    }

    const changeViewModeList = (e) => {
        setViewMode('List')
    }

    return (
        <Div >
            {
                allProducts && allProducts.length
                    ? <Div>
                        <Navbar />
                        <Sidebar />
                        <ViewModeContainer viewMode={viewMode}>
                            <GridMode id='Grid' viewMode={viewMode} onClick={e => changeViewModeGrid(e)}> ⠀ </GridMode>
                            <Label for='Grid'> Cuadricula </Label>
                            <ListMode id='List' viewMode={viewMode} onClick={e => changeViewModeList(e)}> ⠀ </ListMode>
                            <Label for='List'> Lista </Label>
                        </ViewModeContainer>
                        <Products viewMode={viewMode} />
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
