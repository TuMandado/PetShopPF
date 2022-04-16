const initialState = {
  products: [],
  productsCategories: [],
  backup: [],
  pets: [],
  backupPets: [],
  users: [],
  filter: [],
  details: {},
  backupDetail: {},
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
        details: {},
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        products: action.payload ? [] : state.products,
      };
    case "GET_PRODUCTS_CATEGORIES":
      let totalCategories = action.payload.categories.concat(
        action.payload.subcategories
      );
      return {
        ...state,
        productsCategories: totalCategories,
      };
    case "FILTER_PETS_BY_STATE": {
      return {
        ...state,
        backupPets: action.payload,
      };
    }
    default:
      return state;
  }
}

export default clientReducer;
