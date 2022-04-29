import styled from 'styled-components';
import { star } from '../../data'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFilters, filterAllProducts } from '../../redux/actions'

var fromHomeAnimal;

export const homeFilter = (animal) => {
    fromHomeAnimal = animal;
    return;
}


const Sidebar = ({ changeCurrentPage }) => {
    const dispatch = useDispatch();
    const allProductsCategories = useSelector(state => state.clientReducer.productsCategories)
    const animalCategories = useSelector(state => state.clientReducer.productsAnimalCategories)
    const allProducts = useSelector(state => state.clientReducer.products)
    const backupProducts = useSelector(state => state.clientReducer.backup)

    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(99999);
    const [checksAnimal, setChecksAnimal] = useState({})
    const [checksCalification, setChecksCalification] = useState({
        five: false,
        four: false,
        three: false,
        two: false,
        one: false
    })
    const [checkCategory, setCheckCategory] = useState({});
    const categoryToFilter = Object.keys(checkCategory)[0]


    useEffect(() => {
        console.log("SE EJECUTAAAA", fromHomeAnimal)
        if (fromHomeAnimal) {
            setChecksAnimal({ ...checksAnimal, [fromHomeAnimal]: true })
            dispatch(filterAllProducts(backupProducts, categoryToFilter, [fromHomeAnimal], parseInt(minPrice), parseInt(maxPrice)))
        }
    }, [])

    useEffect(() => {
        return () => {
            setCheckCategory({})
            setMinPrice(1)
            setMaxPrice(99999)
            setChecksAnimal({})
            changeCurrentPage(1)
            fromHomeAnimal = "";
        }
    }, [])


    const handleChecks = (e) => {
        if (e.target.name === 'Animals' && !checksAnimal[e.target.value]) setChecksAnimal({ ...checksAnimal, [e.target.value]: true })
        if (e.target.name === 'Animals' && checksAnimal[e.target.value]) {
            const state = { ...checksAnimal }
            delete state[e.target.value]
            setChecksAnimal(state)
        }
        //setChecksCalification({ ...checksCalification, [e.target.value]: !checksCalification[e.target.value] })
    }

    const selectCategory = (e) => {
        if (!checkCategory[e.target.id]) setCheckCategory({ [e.target.id]: true })
        if (checkCategory[e.target.id]) setCheckCategory({})
    }

    const onClickReset = (e) => {
        dispatch(deleteFilters())
        setCheckCategory({})
        setMinPrice(1)
        setMaxPrice(99999)
        setChecksAnimal({})
        changeCurrentPage(1)
        window.scrollTo(0, 0)
    }

    const onClickFilter = (e) => {
        //if(checkCategory[categoryToFilter]) dispatch(filterProductsByCategories(backupProducts, categoryToFilter))
        dispatch(filterAllProducts(backupProducts, categoryToFilter, Object.keys(checksAnimal), parseInt(minPrice), parseInt(maxPrice)))
        changeCurrentPage(1)
        window.scrollTo(0, 0)
    }


    return (
        <Container>
            <H3> Categorias </H3>
            <Ul>
                {
                    allProductsCategories?.map(el => {
                        const quantityOfElement = backupProducts.filter(product => product.data.category === el || product.data.subCategory === el)
                        if (checkCategory[el]) {
                            return <SelectedLi key={el} type="Category" id={el} onClick={e => selectCategory(e)}>
                                {el} <QuantitySpan> {quantityOfElement?.length}  </QuantitySpan>
                            </SelectedLi>
                        }
                        else return <Li key={el} type="Category" id={el} onClick={e => selectCategory(e)}>
                            {el} <QuantitySpan> {quantityOfElement?.length}  </QuantitySpan>
                        </Li>
                    })
                }
            </Ul>
            <H3> Animal </H3>
            <Ul>
                {
                    animalCategories?.map(el => (
                        <Li key={el}>
                            <Checkbox
                                checked={checksAnimal[el] ? true : false}
                                type='checkbox'
                                id={el}
                                value={el}
                                name='Animals'
                                onChange={(e) => handleChecks(e)}
                            />
                            <Label for={el}> {el} </Label>
                        </Li>
                    ))
                }
            </Ul>
            {/* <H3> Calificacion </H3>
            <Ul>
                <Li>
                    <Checkbox type='checkbox' id='five' value='five' name='Calification' onChange={(e) => handleChecks(e)} />
                    <Label for='five'>{star.full} {star.full} {star.full} {star.full} {star.full}</Label>
                </Li>
                <Li>
                    <Checkbox type='checkbox' id='four' value='four' name='Calification' onChange={(e) => handleChecks(e)} />
                    <Label for='four'>{star.full} {star.full} {star.full} {star.full} {star.empty}</Label>
                </Li>
                <Li>
                    <Checkbox type='checkbox' id='three' value='three' name='Calification' onChange={(e) => handleChecks(e)} />
                    <Label for='three'>{star.full} {star.full} {star.full} {star.empty} {star.empty}</Label>
                </Li>
                <Li>
                    <Checkbox type='checkbox' id='two' value='two' name='Calification' onChange={(e) => handleChecks(e)} />
                    <Label for='two'>{star.full} {star.full} {star.empty} {star.empty} {star.empty}</Label>
                </Li>
                <Li>
                    <Checkbox type='checkbox' id='one' value='one' name='Calification' onChange={(e) => handleChecks(e)} />
                    <Label for='one'>{star.full} {star.empty} {star.empty} {star.empty} {star.empty}</Label>
                </Li>
            </Ul> */}
            <H3> Precio </H3>
            <Div>
                <PriceSpan style={{ marginRight: "24%", marginLeft: "42px" }}>Min</PriceSpan>
                <PriceSpan>Max</PriceSpan>
                <Div>
                    <PriceFilter value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    <PriceFilterSeparator> - </PriceFilterSeparator>
                    <PriceFilter value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ marginLeft: 0 }} />
                </Div>
            </Div>
            <Div>
                <FilterButton onClick={(e) => onClickFilter(e)}>Filtrar</FilterButton>
                <ResetButton onClick={(e) => onClickReset(e)}>Reiniciar</ResetButton>
            </Div>
        </Container>
    )
}
export default Sidebar;


const Div = styled.div`
`

const Container = styled.div`
    width: 16em;
    overflow-x: hidden;
    padding-top: 4.5em;
    z-index: 1;
    padding-left: 1.6em;
    float: left;
    padding-left: 3em;
    margin-bottom: 3em;
`

const H3 = styled.h3`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #151515;
    margin: 16px 0px;
    margin-left: 40px;
`

const Ul = styled.ul`
`

const Li = styled.li`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #151515;
    margin-left: 40px;
    position: relative;
    transition: 0.1s ease;
    margin-bottom: 0.4em;
    user-select: none;
    &:hover {
        color: #0ACF83;
        cursor: pointer;
        font-weight: 600;
        transition: 0.1s ease;
    }
`
const SelectedLi = styled.li`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #151515;
    margin-left: 40px;
    position: relative;
    transition: 0.1s ease;
    margin-bottom: 0.4em;
    user-select: none;
    background: #0ACF83;
    color: #FFFFFF;
    padding: 0.1em 2em;
    border-radius: 12px;
    &:hover {
        cursor: pointer;
        padding: 0.1em 1.5em;
    }
`

const QuantitySpan = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 10%;
    background: #F4F8EC;
    border-radius: 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #0ACF83;
    padding: 0px 8px;
    margin-right: 0.1em;
`

const Checkbox = styled.input`
    -webkit-appearance: none;
    appearance: none;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 1.5px solid #D1D1D1;
    border-radius: 0.15em;
    &:checked {
        background-color: #0ACF83;
        border: 1.5px solid #067A4D;
        transition: 0.25s ease;
    }
`
const PriceFilter = styled.input`
    background: #F9F9F9;
    border: 1px solid #D1D1D1;
    box-sizing: border-box;
    border-radius: 8px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    display: inline-block;
    width: 5em;
    height: 2em;
    margin-left: 40px;
    padding-left: 0.5em;
`

const PriceSpan = styled.span`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #151515;
`

const FilterButton = styled.button`
    display: inline-block;
    padding: 12px 16px;
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
    margin-left: 40px;
    margin-top: 2em;
    transition: 0.15s ease;
    &:hover {
        transition: 0.15s ease;
        color: #0ACF83;
        background: none;
        cursor: pointer;
    }
`

const ResetButton = styled.button`
    background: none;
    border: none;
    display: inline-block;
    padding: 6px 12px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
    color: #A9A9A9;
    &:hover {
        transition: 0.15s ease;
        color: #0ACF83;
        cursor: pointer;
        text-decoration: underline;
    }
`

const PriceFilterSeparator = styled.span`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #A9A9A9;
`

const Label = styled.label`
    cursor: pointer;
    user-select: none;
`


