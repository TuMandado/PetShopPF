import { addCartItem, cartOpenUs, editCart } from "../../firebase/Cart";

export const ADD_ITEM = 'ADD_ITEM';
export const OPEN_CART = 'OPEN_CART';
export const EDIT_ITEM = 'EDIT_ITEM';

export function addItemCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await addCartItem(payload.user,payload.item, 2);
            //console.log("-AddCart Flag-", payload);
            return dispatch({
                type: ADD_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function openCartFront(payload) {
    return async function (dispatch) {
        try {
            console.log("payload", payload)
            let jsonProduct = await cartOpenUs(payload);
            console.log("OpenCart Flag-", jsonProduct);
            return dispatch({
             type: OPEN_CART,
             payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function editItemsCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await editCart(payload.user,payload.item, payload.number);
            //console.log("-editCart Flag-", payload);
            return dispatch({
                type: EDIT_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}