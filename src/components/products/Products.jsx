import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getTotalProducts } from '../../redux/actions'
import Product from '../product/Product'

const Products = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.backup)
  console.log(allProducts)
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false )

  useEffect(() => {
    dispatch(getTotalProducts())
    .then((Response) => {
      setLoader(false)

    })
    .catch(error => setError (error.message))
  }, [dispatch])

  if(loader){
    return (
      <div>
        <h1>Cargando..</h1>
      </div>
    )
  }

  return (
    <div>
      {
        allProducts.length > 0 ? (
          allProducts.map(e => {
            return (
              <div>
                <Product title={e.data.title} imagen={e.data.imagen} info= {e.data.info} price={e.data.price} animalCategory={e.data.animalCategory} category= {e.data.category}/>
              </div>
            )
          })
        ): (
        <div>
          <h1>Error, no hay datos</h1>
        </div>
      )
      } 

    </div>
  )
}

export default Products