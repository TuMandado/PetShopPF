import {
    addCartItem,
    cartOpenUs,
    closeCartFirebase,
    deleteItem,
    editCart,
    editCartFirebase,
    getAllCartsFirebase,
    getAllCartsclose,
    getCartFirebase,
    loginCart,
} from "../../firebase/Cart";

export const GET_CARTS = "GET_CARTS";
export const GET_CART ='GET_CART'
export const ADD_ITEM = "ADD_ITEM";
export const OPEN_CART = "OPEN_CART";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const CLOSE_CART = "CLOSE_CART";
export const LOGIN_CART = "LOGIN_CART";
export const GET_QUANTITY = "GET_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";
export const ALL_CARTS_DATA = "ALL CARTS DATA";

export function getAllCarts() {
    return async function (dispatch) {
        try {
            let jsonProduct = await getAllCartsFirebase();
            //console.log("-GetAllCarts Flag-", jsonProduct);
            return dispatch({
                type: GET_CARTS,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export async function getCart(uid) {
    try {
        let jsonProduct = await getCartFirebase(uid);
        return jsonProduct
    } catch (error) {
        console.log(error);
    }
}

// Recibe el sig. objeto:
// let item={
//     user: user,
//     item:{
//             createdAt:Date(),
//             title,
//             quantity: 1,
//             price,
//             id,
//             image, 
//         }
// }
export function addItemCartFront(payload) {
    //   console.log("Flag-Payload-Add", payload);
    return async function (dispatch) {
        try {
            let jsonProduct = await addCartItem(payload.user, payload.item);
            //   console.log("-AddCart-Flag-Json", jsonProduct);
            return dispatch({
                type: ADD_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

///Recibe usuario, devuelve su carrito
export function openCartFront(payload) {
    return async function (dispatch) {
        try {
              console.log("payload", payload);
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

//Recibe un objeto con las propiedades{user,item,number},
//siendo number el numero final que queda en la base de datos
export function editItemsCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await editCart(
                payload.user,
                payload.item,
                payload.number
            );
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

//Recibe un objeto con {user,item} item es un objeto(impotante, la propiedad "id" dentro)

export function getAllCartsData() {
   return async function (dispatch) {
        try {
            let jsonAllCartsData = await getAllCartsclose()
            console.log("=> jsonAllCartsData Flag =>", jsonAllCartsData);
            return dispatch({
                type: ALL_CARTS_DATA,
                payload: jsonAllCartsData,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function deleteItemsCartFront(payload) {
    console.log("payload-delete", payload);
    return async function (dispatch) {
        try {
            let jsonProduct = await deleteItem(payload.user, payload.item);
            console.log("-deleteCart Flag-", jsonProduct);
            return dispatch({
                type: DELETE_ITEM,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

///Recibe user
export function closeCartFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await closeCartFirebase(payload);
            //console.log("-CloseCart Flag-", jsonProduct);
            return dispatch({
                type: CLOSE_CART,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function cartLoginFront(payload) {
    return async function (dispatch) {
        try {
            let jsonProduct = await loginCart(payload);
            console.log("-Logincart Flag-", jsonProduct);
            return dispatch({
                type: LOGIN_CART,
                payload: jsonProduct,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getQuantity(payload){
    return async function (dispatch){
        let total = 0
        if(payload && payload.length){
            payload.map(el => total = total + el.quantity)
        }
        if(payload=== undefined){
            total = 0
        }
        return dispatch({
            type: GET_QUANTITY,
            payload: total
        })
    }
}

export function clearCart(payload) {
    return async function (dispatch) {
        try {
            let cart = []
            if(payload.user){
                await editCartFirebase(payload.id,{items:[]})
                cart = getCartFirebase(payload.id)
            }else {
                localStorage.clear();
            }
            //console.log("-clearCart Flag-", cart);
            return dispatch({
                type: CLEAR_CART,
                payload: cart,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

