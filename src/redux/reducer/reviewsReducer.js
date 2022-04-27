import { GET_ALL_REVIEWS, GET_PRODUCT_REVIEWS, GET_USER_REVIEWS } from "../actions/reviewsActions";

const initialState = {
    allReviews: [],
    productReviews: [],
    userReviews: []
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
        default:
            return state;
    }
     
}
  
export default reviewsReducer;