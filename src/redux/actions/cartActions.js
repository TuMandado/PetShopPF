import { addCartItem, cartOpenUs, deleteItem, editCart, getAllCartsFirebase } from "../../firebase/Cart";

export const GET_CARTS = 'GET_CARTS';
export const ADD_ITEM = 'ADD_ITEM';
export const OPEN_CART = 'OPEN_CART';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export function getAllCarts(){
    return async function (dispatch){
        try {
            let jsonProduct = await getAllCartsFirebase();
            console.log("-GetAllCarts Flag-", jsonProduct);
            return dispatch({
                type: GET_CARTS,
                payload: jsonProduct,
            });
        }catch (error) {
            console.log(error);
        };
    };
}

export function addItemCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await getAllCartsFirebase();
            console.log("-GetAllCarts Flag-", jsonProduct);
            //let jsonProduct = await addCartItem(payload.user,payload.item);
            //console.log("-AddCart Flag-", jsonProduct);
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
            //console.log("OpenCart Flag-", jsonProduct);
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
            //console.log("-editCart Flag-", jsonProduct);
            return dispatch({
                type: EDIT_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function deleteItemsCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await deleteItem(payload.user,payload.item);
            //console.log("-deleteCart Flag-", jsonProduct);
            return dispatch({
                type: DELETE_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
    }