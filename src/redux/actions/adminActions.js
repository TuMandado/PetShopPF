import { getAllProducts, uploadProduct, getAllProductsCategories } from "../../firebase/Products/index";
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
  