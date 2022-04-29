import {
    getAllProducts,
    getProduct,
    getAllProductsCategories,
    getAllProductsSubCategory,
    getAllProductsAnimal,
    filterProducts,
    uploadProduct,
    editProduct,
} from "../../firebase/Products/index";
import {
    getAllPets,
    filterPets,
    getAllCategories,
    uploadPet,
    getPet,
    getStatePets
} from "../../firebase/Pets/index";
import { async } from "@firebase/util";
import { loginCart } from "../../firebase/Cart";
import { getAllAnimalCategory } from "../../firebase/AnimalCategory/index";




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


export function detailVacio() {
    return {
        type: "DETAIL_VACIO",
    };
}

export function getProductsCategories() {
    return async function (dispatch) {
        try {
            const categories = await getAllProductsCategories();
            const subcategories = await getAllProductsSubCategory();

            return dispatch({
                type: "GET_PRODUCTS_CATEGORIES",
                payload: { categories, subcategories },
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function getAnimalCategories() {
    return async function (dispatch) {
        try {
            const categories = await getAllProductsAnimal();
            return dispatch({
                type: "GET_ANIMAL_CATEGORIES",
                payload: categories,
            });
        } catch (err) {
            console.log(err);
        }
    };
}

export function deleteFilters() {
    return {
        type: "DELETE_FILTERS",
    };
}

export function filterAllProducts(array, category, animal, minPrice, maxPrice) {
    return async function (dispatch) {
        const response = await filterProducts(
            array,
            category,
            animal,
            minPrice,
            maxPrice
        );
        console.log(response);
        return dispatch({
            type: "FILTER_PRODUCTS",
            payload: response,
        });
    };
}

export function getTotalCategoryPets() {
    return async function (dispatch) {
        const jsonCategoryPets = await getAllAnimalCategory();
        console.log("esto es jsonCategoryPets", jsonCategoryPets);
        return dispatch({
            type: "GET_CATEGORY_PETS",
            payload: jsonCategoryPets,
        });
    };
}

export function postPets(payload) {
    return async function (dispatch) {
        const jsonPetsPost = await uploadPet(payload);
        console.log("esto es jsonPetsPost", jsonPetsPost);
        return jsonPetsPost;
    };
}

export function petDetails(uid) {
    return async function (dispatch) {
        try {
            let petDetail = await getPet(uid);
            console.log("Pet Details =>", petDetail);
            return dispatch({
                type: "GET_DETAIL_PET",
                payload: petDetail,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function getSpeciesPets() {
    return async function (dispatch) {
        const species = await getAllCategories()
        dispatch({
            type: "GET_SPECIES_PETS",
            payload: species
        })
    }
};

export function filterAllPets(array, animal, gender, state, owner) {
    return async function (dispatch) {
        const filteredPets = await filterPets(array, animal, gender, state, owner)
        dispatch({
            type: "FILTER_ALL_PETS",
            payload: filteredPets
        })
    }
};

export function resetPetFilters() {
    return {
        type: "RESET_PET_FILTERS"
    }
};

export function getStatePet () {
    return async function (dispatch) {
        const jsonState = await getStatePets()
        dispatch ({
            type: 'GET_STATE_PETS',
            payload: jsonState
        })
    }

}

export function setSettings(payload) {
    return {
        type: 'SET_SETTINGS',
        payload
    }
<<<<<<< Updated upstream
=======
}

export function setVisitId(payload) {
    return {
        type: 'SET_VISIT_ID',
        payload
    }
}

//payload es un objeto con uid del producto y un objeto {stock: cantidad final del stock}
export async function editStock(payload){
    return async function (dispatch) {
        try {
            let jsonStock = await editProduct(payload)
            console.log("-stock Flag-", jsonStock);
            return dispatch({
                type: `EDIT_STOCK`,
                payload: jsonStock,
            });
        } catch (error) {
            console.log(error);
        }
    };
>>>>>>> Stashed changes
}