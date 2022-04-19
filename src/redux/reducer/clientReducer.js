const initialState = {
  products: [],
  productsCategories: [],
  productsAnimalCategories: [],
  backup: [],
  pets: [],
  backupPets: [],
  users: [],
  filter: [],
  details: {},
  backupDetail: {},
  categoryPets:[],
  user: null,
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
        backup: action.payload,
      };
    }
    case "GET_ALL_PETS": {
      return {
        ...state,
        pets: action.payload,
        backupPets: action.payload,
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
      let totalCategories = new Set(
        action.payload.categories.concat(action.payload.subcategories)
      );
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
    default:
      return state;
  }
}

export default clientReducer;
