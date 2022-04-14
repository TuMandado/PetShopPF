import { async } from "@firebase/util";
import { getAllProducts  } from "../../firebase/Products/index";
import {getAllPets} from '../../firebase/Pets/index'

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
      console.log("-Action Flag-", jsonProduct);
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
      let jsonProduct = await getAllProducts(name);

      return dispatch({
        type: `GET_BY_NAME`,
        payload: jsonProduct,
      });
    } catch (error) {
      return alert(`Ups! No existe un producto con ese nombre.`);
    }
  };
}

export function getTotalPets() {
  return async function (dispatch) {
    try {
      let jsonPets = await getAllPets()
      console.log('esto es jsonPets', jsonPets)
      return dispatch({
        type: 'GET_ALL_PETS',
        payload:jsonPets
      })
    } catch (error) {
      console.log(error)
    }
  }

}
