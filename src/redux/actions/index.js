import { getAllProducts, getProduct } from "../../firebase/Products/index";
import {
  getAllPets,
  filterByOwner,
  filterByState,
  filterByCategory,
} from "../../firebase/Pets/index";

// import { async } from "@firebase/util";
// import { getAllProducts } from "../../firebase/Products/index";
// import { getAllPets } from "../../firebase/Pets/index";

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
      let jsonPets = await getAllPets();
      // console.log("esto es jsonPets", jsonPets);
      return dispatch({
        type: "GET_ALL_PETS",
        payload: jsonPets,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setLoading(value) {
  return {
    type: `SET_LOADING`,
    payload: value,
  };
}

export function getDetailProducts(uid) {
  return async function (dispatch) {
    try {
      let jsonDetail = await getProduct(uid);
      console.log("jsonDetail", jsonDetail);
      return dispatch({
        type: "GET_DETAIL_PRODUCTS",
        payload: jsonDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterOwner(payload) {
  return async function (dispatch) {
    try {
      let filterxOwner = await filterByOwner(payload.array, payload.Owner);
      return dispatch({
        type: "FILTER_PETS_BY_OWNER",
        payload: filterxOwner,
      });
    } catch (error) {
      console.log("Hubo un error al cargar este filtro => Owner");
    }
  };
}

export function filterState(payload) {
  return async function (dispatch) {
    try {
      let filterPetsState = filterByState(payload.array, payload.state);

      return dispatch({
        type: "FILTER_PETS_BY_STATE",
        payload: filterPetsState,
      });
    } catch (error) {
      console.log("Hubo un error al cargar este filtro => State");
    }
  };
}

export function filterCategory(payload) {
  return async function (dispatch) {
    try {
      let filterxCategory = await filterByCategory(
        payload.array,
        payload.Category
      );
      return dispatch({
        type: "FILTER_PETS_BY_CATEGORY",
        payload: filterxCategory,
      });
    } catch (error) {
      console.log("Hubo un error al cargar este filtro => Category");
    }
  };
}

export function detailVacio() {
  return {
    type: "DETAIL_VACIO",
  };
}
