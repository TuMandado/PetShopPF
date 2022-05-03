
import { ADD_ITEM, CLEAR_CART, CLOSE_CART, DELETE_ITEM, EDIT_ITEM, GET_CARTS, GET_QUANTITY, LOGIN_CART, OPEN_CART, GET_CART, ALL_CARTS_DATA } from "../actions/cartActions";


const initialState = {
    cart:[],
    allCarts: [],
    allCartsData: [],
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
        case ALL_CARTS_DATA:
            return{
                ...state,
                allCartsData: action.payload
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
                openCart: {},
            }
        case GET_QUANTITY:
            return{
                ...state,
                quantity: action.payload,
            }
        case CLEAR_CART:
            return{
                ...state,
                openCart:action.payload,
            }
        default:
            return state;
    }
     
}
  
export default cartReducer;