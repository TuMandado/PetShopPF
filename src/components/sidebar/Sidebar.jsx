import styled from 'styled-components';
import star from './stars'
import { useEffect, useState } from 'react';

const Div = styled.div`
`

const Container = styled.div`
    height: 100%;
    width: 16em;
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 5em;
    z-index: 1;
    padding-left: 1.6em;
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
`

const PriceFilterSeparator = styled.span`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #A9A9A9;
`


const Sidebar = () => {
    const [checksAnimal, setChecksAnimal] = useState({
        lizard: false,
        rodent: false,
        dog: false,
        cat: false,
        bird: false,
        fish: false,
        others: false,
    })

    const [checksCalification, setChecksCalification] = useState({
        five: false,
        four: false,
        three: false,
        two: false,
        one: false
    })

    // const [offset, setOffset] = useState(0);
    
    // useEffect(() => {
    //     const onScroll = () => setOffset(window.pageYOffset);
    //     window.addEventListener('scroll', onScroll, {passive: true});
    //     return () => window.removeEventListener('scroll', onScroll)
    // }, [])
    
    // console.log(offset)

    const handleChecks = (e) => {
        e.target.name === 'Animals'
            ? setChecksAnimal({ ...checksAnimal, [e.target.value]: !checksAnimal[e.target.value] })
            : setChecksCalification({ ...checksCalification, [e.target.value]: !checksCalification[e.target.value] })
    }

    return (
        <Container>
            <H3> Categorias </H3>
            <Ul>
                <Li> Accesorios </Li>
                <Li> Transportadoras </Li>
                <Li> Alimentos Secos </Li>
                <Li> Alimentos Húmedos </Li>
            </Ul>
            <H3> Animal </H3>
            <Ul>
                <Li> <Checkbox type='checkbox' value='lizard' name='Animals' onChange={(e) => handleChecks(e)} /> Reptil </Li>
                <Li> <Checkbox type='checkbox' value='rodent' name='Animals' onChange={(e) => handleChecks(e)} /> Roedor </Li>
                <Li> <Checkbox type='checkbox' value='dog' name='Animals' onChange={(e) => handleChecks(e)} /> Perro </Li>
                <Li> <Checkbox type='checkbox' value='cat' name='Animals' onChange={(e) => handleChecks(e)} /> Gato </Li>
                <Li> <Checkbox type='checkbox' value='bird' name='Animals' onChange={(e) => handleChecks(e)} /> Ave </Li>
                <Li> <Checkbox type='checkbox' value='fish' name='Animals' onChange={(e) => handleChecks(e)} /> Pez </Li>
                <Li> <Checkbox type='checkbox' value='others' name='Animals' onChange={(e) => handleChecks(e)} /> Otros </Li>
            </Ul>
            <H3> Calificacion </H3>
            <Ul>
                <Li>
                    <Checkbox type='checkbox' value='five' name='Calification' onChange={(e) => handleChecks(e)} />
                    {star.full} {star.full} {star.full} {star.full} {star.full}
                </Li>
                <Li>
                    <Checkbox type='checkbox' value='four' name='Calification' onChange={(e) => handleChecks(e)} />
                    {star.full} {star.full} {star.full} {star.full} {star.empty}
                </Li>
                <Li>
                    <Checkbox type='checkbox' value='three' name='Calification' onChange={(e) => handleChecks(e)} />
                    {star.full} {star.full} {star.full} {star.empty} {star.empty}
                </Li>
                <Li>
                    <Checkbox type='checkbox' value='two' name='Calification' onChange={(e) => handleChecks(e)} />
                    {star.full} {star.full} {star.empty} {star.empty} {star.empty}
                </Li>
                <Li>
                    <Checkbox type='checkbox' value='one' name='Calification' onChange={(e) => handleChecks(e)} />
                    {star.full} {star.empty} {star.empty} {star.empty} {star.empty}
                </Li>
            </Ul>
            <H3> Precio </H3>
            <Div>
                <PriceSpan style={{ marginRight: "24%",  marginLeft: "42px" }}>Min</PriceSpan>
                <PriceSpan>Max</PriceSpan>
                <Div>
                    <PriceFilter />
                    <PriceFilterSeparator> - </PriceFilterSeparator>
                    <PriceFilter style={{marginLeft: 0}} />
                </Div>
            </Div>
            <Div>
                <FilterButton>Filtrar</FilterButton>
                <ResetButton>Reiniciar</ResetButton>
            </Div>
        </Container>
    )
}
export default Sidebar;
