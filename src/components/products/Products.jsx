import React from 'react'

const Products = ({imagen, title, info, price, animalCategory}) => {
  return (
    <div>
      <div>
        <img src={imagen} alt="imagen not found" />
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
        <h3> categoria de aniaml : {animalCategory?.map((t,i) => <div key={i}> {t} </div> )}</h3>
      </div>
    </div>
  )
}

export default Products
