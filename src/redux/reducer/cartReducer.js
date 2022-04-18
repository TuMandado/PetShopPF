import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, GET_CARTS, OPEN_CART } from "../actions/cartActions";

const initialState = {
    alCarts: [],
    openCart: {}
}
  
  
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARTS:
            return{
                ...state,
                allCarts: action.payload
            }
        case ADD_ITEM:
            return {
                ...state,
                openCart: action.payload,
             };
        case OPEN_CART:
            return {
                ...state,
                openCart: action.payload,
            };
        case EDIT_ITEM:
            return{
                ...state,
                openCart: action.payload,
            }
        case DELETE_ITEM:
            return{
                ...state,
                openCart: action.payload,
            }
        default:
            return state;
    }
     
}
  
export default cartReducer;