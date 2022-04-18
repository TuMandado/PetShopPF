import { ADD_ITEM, OPEN_CART } from "../actions/cartActions";

const initialState = {
    cart: {},
    openCart: {}
}
  
  
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                cart: action.payload,
             };
        case OPEN_CART:
            return {
                ...state,
                openCart: action.payload,
            };
        default:
            return state;
    }
     
}
  
export default cartReducer;