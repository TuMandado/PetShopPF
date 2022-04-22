import { getProduct, getAllProducts, uploadProduct, deleteProduct, getAllProductsCategories } from "../../firebase/Products/index";
import { getAllUsers, deleteUser, getUser } from "../../firebase/Users";
import {getAllAnimalCategory} from '../../firebase/AnimalCategory/index'
export const GET_PRODUCTS = 'GET_PRODUCTS';


export function getTotalProducts() {
    return async function (dispatch) {
      try {
        let jsonProduct = await getAllProducts();
        console.log("-Action Flag-", jsonProduct);
        return dispatch({
          type: `GET_PRODUCTS`,
          payload: jsonProduct,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

export function deleteThisProduct(id) {
    return async function (dispatch) {
      try {
        let jsonDelete = await deleteProduct(id);
        return dispatch({
          type: `DELETE_PRODUCT`,
          payload: id,
        });
      } catch (error) {
        console.log(error);
      }
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

  export function getProductCategory() {
    return async function (dispatch) {
      let jsonCategory = await getAllProductsCategories()
      // console.log('esto es json category',jsonCategory)
      return dispatch ({
        type: 'GET_PRODUCT_CATEGORY',
        payload: jsonCategory
      })
    }
  }

  export function getProductAnimalCategory() {
    return async function (dispatch) {
      let jsonAnimalCategory = await getAllAnimalCategory()
      console.log('esto es json anmimalCategory',jsonAnimalCategory)
      return dispatch ({
        type: 'GET_ANIMAL_CATEGORY',
        payload: jsonAnimalCategory
      })
    }
  }

  export function postProduct(payload) {
    return async function(dispatch) {
      const jsonPost = await uploadProduct(payload)
      console.log('esto es jsonPost', jsonPost)
      return jsonPost
    
    }
  }

  export function getTotalUsers() {
    return async function (dispatch) {
      try {
        let jsonUsers = await getAllUsers();
        console.log("getAllUsers👉", jsonUsers);
        return dispatch({
          type: `GET_USERS`,
          payload: jsonUsers,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function deleteThisUser(id) {
    return async function (dispatch) {
      try {
        let jsonDelete = await deleteUser(id);
        console.log("jsonDelete:👉🏾", jsonDelete);
        return dispatch({
          type: `DELETE_USER`,
          payload: id,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getDetailUser(uid) {
    return async function (dispatch) {
      try {
        let jsonUser = await getUser(uid);
        console.log("jsonUser", jsonUser);
        return dispatch({
          type: "GET_DETAIL_USER",
          payload: jsonUser,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  export function putUser(uid, data) {
    return async function (dispatch) {
      try {
        let uploadUser = await uploadUser(uid, data);
        console.log("uploadUser", uploadUser);
        return dispatch({
          type: "PUT_USER",
          payload: uploadUser,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  