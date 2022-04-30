import { ADD_ITEM, CLOSE_CART, DELETE_ITEM, EDIT_ITEM, GET_CARTS,GET_CART, GET_QUANTITY, LOGIN_CART, OPEN_CART } from "../actions/cartActions";

const initialState = {
    cart:[],
    allCarts: [],
    openCart: {},
    quantity: 0
}
  
  
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARTS:
            return{
                ...state,
                allCarts: action.payload
            }
        case GET_CART:
            return{
                ...state,
                cart: action.payload
            }
        case LOGIN_CART:
            return{
                ...state,
                openCart: action.payload,
            }
        case ADD_ITEM:
            return {
                ...state,
                openCart: action.payload,
                quantity: state.quantity +1
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
        case CLOSE_CART:
            return{
                ...state,
                openCart: action.payload,
            }
        case GET_QUANTITY:
            return{
                ...state,
                quantity: action.payload,
            }
        default:
            return state;
    }
     
}
  
export default cartReducer;