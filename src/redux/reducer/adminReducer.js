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
}


  function adminReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state, products: action.payload,
        };
        default:
          return state;
    }
   
}

export default adminReducer;