import { CLEAR_REVIEWS, GET_ALL_REVIEWS, GET_PRODUCT_REVIEWS, GET_USER_REVIEWS, POST_REVIEW, REVIEW_SCORE } from "../actions/reviewsActions";

const initialState = {
    allReviews: [],
    productReviews: [],
    userReviews: [],
    productScore: 0,
}

function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return{
                ...state,
                allReviews: action.payload,
            }
        case GET_PRODUCT_REVIEWS:
            return{
                ...state,
                productReviews: action.payload,
            }
        case GET_USER_REVIEWS:
            return{
                ...state,
                userReviews: action.payload,
            }
        case POST_REVIEW:
            return{
                ...state,
                productReviews: [...state.productReviews,action.payload]
                
            }
        case REVIEW_SCORE:
            return{
                ...state,
                productScore: action.payload,
            }
        case CLEAR_REVIEWS:
            return {
                ...state,
                productReviews: [],
            }
        default:
            return state;
    }
     
}
  
export default reviewsReducer;