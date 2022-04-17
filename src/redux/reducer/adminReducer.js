import {
  GET_PRODUCTS,
} from "../actions/adminActions";

const initialState = {
    products: [],
    details: [],
    categories: [],
    filteredProducts: [],
    users:[],
    orders:[],
    form:[],
    animalCategory:[]
}


  function adminReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state, products: action.payload,
        };
      case 'POST_PRODUCT': {
        return {
          ...state,
          products: action.payload
        }
      }
      case 'GET_PRODUCT_CATEGORY': {
        return {
          ...state,
          categories:action.payload

        }
      }
      case 'GET_ANIMAL_CATEGORY': {
        return {
          ...state,
          animalCategory:action.payload
        }
      }
        default:
          return state;

    }
   
}

export default adminReducer;