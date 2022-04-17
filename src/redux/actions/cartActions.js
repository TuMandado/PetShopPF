import { addCartItem } from "../../firebase/Cart";

export const ADD_ITEM = 'ADD_ITEM';

export function addItemCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await addCartItem(payload.user,payload.item);
            console.log("-AddCart Flag-", payload);
            return dispatch({
                type: ADD_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}