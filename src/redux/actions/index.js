import { getAllProducts } from "../../firebase/Products/index";

export function setUser(payload) {
  return {
    type: "SET_USER",
    payload,
  };
}

export function getTotalProducts() {
  return async function (dispatch) {
    try {
      let jsonProduct = await getAllProducts();
      return dispatch({
        type: `GET_TOTAL_PRODUCT`,
        payload: jsonProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProductName(name) {
  return async function (dispatch) {
    try {
      if (name.search(/^[a-zA-Zñáéíóúü]*$/)) {
        return alert("El nombre solo debe contener letras. ¡Intenta de nuevo!");
      }

      return dispatch({
        type: `GET_BY_NAME`,
        payload: name,
      });
    } catch (error) {
      return alert(`Ups! No existe un producto con ese nombre.`);
    }
  };
}
