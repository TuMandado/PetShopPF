import React from 'react';
import styled from 'styled-components'
import CategoryItem from './CategoryItem';
import { categories } from '../../data'


const Categories = () => {
    return (
        <Div>
            <Container>
                {categories.map((item) => (
                    <CategoryItem item={item} key={item.id} />
                ))}
            </Container>
        </Div>
    )
}

export default Categories


const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
`

