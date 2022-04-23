import { getAllProducts, getProduct, getAllProductsCategories, getAllProductsSubCategory, getAllProductsAnimal, filterProducts,uploadProduct} from "../../firebase/Products/index";
import {getAllPets, filterByOwner,
  filterByState,
  filterByCategory,
  getAllCategories,
  getStatePets,
  uploadPet} from '../../firebase/Pets/index'
import { async } from "@firebase/util";
import { loginCart } from "../../firebase/Cart";
import {getAllAnimalCategory} from '../../firebase/AnimalCategory/index'
// import { pushAllProducts } from "../../firebase/PreLoadData/RandomProductsFunctions";
// import {pushAllPets} from '../../firebase/PreLoadData/RandomPetFunctions/index'

// import { async } from "@firebase/util";
// import { getAllProducts } from "../../firebase/Products/index";
// import { getAllPets } from "../../firebase/Pets/index";

export function setUser(payload) {
  return async function (dispatch) {
    try {
        let jsonProduct = await loginCart(payload);
        console.log("-login Flag-", jsonProduct);
        return dispatch({
          type: "SET_USER",
          payload,
        });
    } catch (error) {
        console.log(error);
    }
};
//     return {
//         type: "SET_USER",
//         payload,
//     };
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


export function detailVacio() {
    return {
        type: 'DETAIL_VACIO'
    }
}

export function getProductsCategories() {
    return async function (dispatch) {
        try {
            const categories = await getAllProductsCategories();
            const subcategories = await getAllProductsSubCategory();

            return dispatch({
                type: 'GET_PRODUCTS_CATEGORIES',
                payload: { categories, subcategories }
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export function getAnimalCategories() {
    return async function (dispatch) {
        try {
            const categories = await getAllProductsAnimal()
            return dispatch({
                type: "GET_ANIMAL_CATEGORIES",
                payload: categories
            })
        } catch(err) {
            console.log(err)
        }
    }
}


export function deleteFilters() {
    return {
        type: "DELETE_FILTERS"
    }
}

export function filterAllProducts(array, category, animal, minPrice, maxPrice) {
    return async function(dispatch) {
        const response = await filterProducts(array, category, animal, minPrice, maxPrice)
        console.log(response)
        return dispatch({
            type: "FILTER_PRODUCTS",
            payload: response
        })
    }
}

export function getTotalCategoryPets () {
   return async function (dispatch) {
     const jsonCategoryPets = await getAllAnimalCategory()
    //  console.log('esto es jsonCategoryPets', jsonCategoryPets)
     return dispatch ({
       type: 'GET_CATEGORY_PETS',
       payload: jsonCategoryPets
     })
   }
}

export function getStatePet () {
  return async function (dispatch) {
    const jsonState = await getStatePets()
    return dispatch ({
      type : 'GET_STATE_PETS',
      payload: jsonState
    })
  }
}

export function postPets (payload) {
  return async function (dispatch) {
    const jsonPetsPost = await uploadPet(payload)
    console.log('esto es jsonPetsPost', jsonPetsPost)
    return jsonPetsPost
  }

}
