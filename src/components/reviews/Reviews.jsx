import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewsByProductFront, porductScore } from '../../redux/actions/reviewsActions'

const Reviews = ({id}) => {
    const dispatch = useDispatch()
    const productReviews= useSelector(state => state.reviewsReducer.productReviews)
    const productScore= useSelector(state => state.reviewsReducer.productScore)

   

    useEffect(() => {
        dispatch(getReviewsByProductFront(id))
    }, [])

    useEffect(() => {
      dispatch(porductScore(id))
    }, [])
    
    let reviewsByTime =[];
    
    if(productReviews){
      reviewsByTime = productReviews.sort(function(a,b){
        if(a.data.createdAt > b.data.createdAt){
          return 1
        }
        if(a.data.createdAt< b.data.createdAt){
          return -1
        }
        return 0
      })
    }

    return (
    <div>
      <h1>Reviews here</h1>
      <p>Puntaje total: {productScore}</p>
      {reviewsByTime.length ? reviewsByTime.map(el =>{
        return(
          <div>
            {el.data.displayName ? (<p>Usuario: {el.data.displayName}</p>):(<p>Usuario: {el.data.email}</p>)}
            <p>Score: {el.data.score}/5</p>
            <p>{el.data.review}</p>  
          </div>
        )
      }): (<p>no hay comentarios todavia, se el primero en dejar tu opinion</p>)}
    </div>
  )
}

export default Reviews
