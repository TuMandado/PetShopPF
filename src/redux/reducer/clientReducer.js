import { PetsRounded } from "@mui/icons-material";

const initialState = {
    products: [],
    productsCategories: [],
    productsAnimalCategories: [],
    backup: [],
    pets: [],
    petsSpecies: [],
    backupPets: [],
    users: [],
    filter: [],
    details: {},
    backupDetail: {},
    categoryPets: [],
    petsCategory: [],
    statePets: [],
    user: null,
    settings: {},
    visitId: null,
    userOrders: [],
};

function clientReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };

        case `GET_TOTAL_PRODUCT`:
            return {
                ...state,
                products: action.payload,
                backup: action.payload,
            };

        case `GET_BY_NAME`: {
            return {
                ...state,
                products: action.payload,
            };
        }
        case "GET_ALL_PETS": {
            return {
                ...state,
                pets: action.payload,
                backupPets: action.payload,
            };
        }

        case "GET_DETAIL_PET": {
            return {
                ...state,
                details: action.payload,
                backupDetail: action.payload,
            };
        }

        case "GET_DETAIL_PRODUCTS": {
            return {
                ...state,
                details: action.payload,
                backupDetail: action.payload,
            };
        }

        case "DETAIL_VACIO": {
            return {
                ...state,
                details: [],
                backupDetail: {},
            };
        }

        case "SET_LOADING":
            return {
                ...state,
                products: action.payload ? [] : state.products,
            };
        case "GET_PRODUCTS_CATEGORIES":
            let totalCategories = new Set(action.payload.categories);
            totalCategories = Array.from(totalCategories);
            return {
                ...state,
                productsCategories: totalCategories,
            };
        case "GET_ANIMAL_CATEGORIES":
            return {
                ...state,
                productsAnimalCategories: action.payload,
            };
        case "FILTER_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "DELETE_FILTERS":
            return {
                ...state,
                products: state.backup,
            };
        case 'GET_CATEGORY_PETS':
            return {
                ...state,
                categoryPets: action.payload
            }
        case "GET_SPECIES_PETS":
            let fixedSpecies = action.payload.map(el => {
                if (el === 'gato') return "Gato"
                if (el === 'perro' || el === 'dog') return "Perro"
                return el
            })
            fixedSpecies = new Set(fixedSpecies)
            fixedSpecies = [...fixedSpecies]
            return {
                ...state,
                petsSpecies: fixedSpecies
            }
        case "FILTER_ALL_PETS":
            return {
                ...state,
                pets: action.payload
            }
        case "RESET_PET_FILTERS":
            return {
                ...state,
                pets: state.backupPets
            }
        case 'GET_STATE_PETS':
            return {
                ...state,
                statePets: action.payload
            }
        case 'SET_SETTINGS':
            return {
                ...state,
                settings: action.payload
            }
        case 'SET_VISIT_ID':
            return {
                ...state,
                visitId: action.payload
            }
        case "SEARCH_PET":
            return {
                ...state,
                pets: action.payload
            }

        case "GET_MY_ORDERS":
            return {
                ...state,
                userOrders: action.payload

        case "DELETE_PET": {
                return {  
                  ...state,
                  backupPets: state.backupPets.filter(
                    (backupPets) => backupPets.uid !== action.payload
                  ),
                  pets: state.pets.filter(
                    (pets) => pets.uid !== action.payload
                  )
                };
            }
        default:
            return state;
    }
}

export default clientReducer;