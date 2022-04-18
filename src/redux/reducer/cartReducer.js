import { ADD_ITEM, EDIT_ITEM, OPEN_CART } from "../actions/cartActions";

const initialState = {
    openCart: {}
}
  
  
function cartReducer(state = initialState, action) {
    switch (action.type) {
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
        default:
            return state;
    }
     
}
  
export default cartReducer;