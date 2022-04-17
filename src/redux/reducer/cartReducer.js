import { ADD_ITEM } from "../actions/cartActions";

const initialState = {
    cart: {}
}
  
  
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                cart: action.payload,
             };
        default:
            return state;
    }
     
}
  
export default cartReducer;