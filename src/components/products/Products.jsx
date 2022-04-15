import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getTotalProducts } from '../../redux/actions'
import Product from '../product/Product'
import  {Loader}  from '../../page/loader/Loader'
import {Link} from 'react-router-dom'


const Products = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.backup)
  console.log('esto es allProducts', allProducts)
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
        <Loader/>
      </div>
    )
  }

  return (
    <div>
      {
        allProducts.length > 0 ? (
          allProducts.map(e => {
            return (
              <div key={e.uid}>
                <Link to={'/product/' + e.uid}>
                <Product title={e.data.title} image={e.data.image} info= {e.data.info} price={e.data.price} animalCategory={e.data.animalCategory} category= {e.data.category}/>
                
                </Link>
              </div>
            )
          })
        ): (
        <div>
          <h1>Error, no hay datos</h1>
        </div>
      )
      } 
      <Link to= '/'>
         <button>Ir al Home</button>
      </Link>

    </div>
  )
}

export default Products
