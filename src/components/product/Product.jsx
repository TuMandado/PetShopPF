import React from 'react'
import styled from 'styled-components'

const MainProduct = styled.div `
 `

const Product = ({title, image, info, price,animalCategory, category}) => {
  return (
    <MainProduct>

    <div>
      <div>
        <img src={image} alt="imagen not found" />
      </div>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <p>{info}</p>
      </div>
      <div>
        <p>{price}</p>
      </div>
      <div>
        <h3> categoria de animal : {animalCategory}</h3>
      </div>
      <div>
        <h4>categoria : {category}</h4>
      </div>
    </div>
    </MainProduct>

  )
}

export default Product
