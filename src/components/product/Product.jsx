import React from 'react'

const Product = ({title, imagen, info, price,animalCategory, category}) => {
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
      <div>
        <h4>categoria : {category?.map((t,i) => <div key={i}> {t}</div>)}</h4>
      </div>
    </div>

  )
}

export default Product
