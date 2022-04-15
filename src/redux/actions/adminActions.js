import { getAllProducts } from "../../firebase/Products/index";

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
  