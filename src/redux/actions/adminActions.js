import { getProduct, getAllProducts, uploadProduct, deleteProduct, getAllProductsCategories, editProduct, getReallyAllProducts } from "../../firebase/Products/index";
import { getAllUsers, deleteUser, getUser, uploadUser, editUser, userOn, userOff } from "../../firebase/Users";
import {getAllAnimalCategory} from '../../firebase/AnimalCategory/index'
import { deletePet, editPet, getFullPets, okPet } from "../../firebase/Pets";
export const GET_PRODUCTS = 'GET_PRODUCTS';


export function getTotalProducts() {
    return async function (dispatch) {
      try {
        let jsonProduct = await getReallyAllProducts();
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
  
  export function putProduct(uid, data) {
    return async function (dispatch) {
      try {
        let jsonputProduct = await editProduct(uid, data);
        return dispatch({
          type: 'PUT_PRODUCT',
        });
      } catch (error) {
        console.log(error);
      }
    };
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

  export function onUser(uid) {
    return async function (dispatch) {
        try {
            let jsonokUser = await userOn(uid);
            console.log("llegue al onuser 🍳", uid);
            return dispatch({
                type: `USER_ON`,
                payload: uid,
            });
        } catch (error) {
            console.log(error);
        }
    };
  }

  export function offUser(uid) {
    return async function (dispatch) {
        try {
            let jsonoffUser = await userOff(uid);
            return dispatch({
                type: `USER_OFF`,
                payload: uid,
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
        let jsonputUser = await editUser(uid, data);
        // console.log("putUser 🍳", uid, data);
        return dispatch({
          type: "PUT_USER",
          // payload: jsonUploadUser,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getAllTotalPets() {
    return async function (dispatch) {
        try {
            let jsonPets = await getFullPets();
            // console.log("esto es jsonPets", jsonPets);
            return dispatch({
                type: "GET_ALL_TOTAL_PETS",
                payload: jsonPets,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function putPet(uid, data) {
  return async function (dispatch) {
    try {
      let jsonputPet = await editPet(uid, data);
      // console.log("putPet 🍳", uid, data);
      return dispatch({
        type: "PUT_PET",
        // payload: jsonputPet,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

  export function deleteThisPet(uid) {
    return async function (dispatch) {
        try {
            let jsonDelete = await deletePet(uid);
            // console.log('esto es jsonDele', jsonDelete, 'esto es uid', uid)
            return dispatch({
                type: `DELETE_PET`,
                payload: uid,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

  export function okThisPet(uid) {
    return async function (dispatch) {
        try {
            let jsonOkPet = await okPet(uid);
            // console.log('esto es jsonDele', jsonOkPet, 'esto es uid', uid)
            return dispatch({
                type: `OK_PET`,
                payload: uid,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
  