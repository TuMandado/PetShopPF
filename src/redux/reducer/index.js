const initialState = {
  products: [],
  backup: [],
  pets: [],
  backupPets: [],
  users: [],
  filter: [],
  details: {},
  backupDetail: {},
  user: null,
};

function rootReducer(state = initialState, action) {
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
    case "GET_TOTAL_PETS": {
      return {
        ...state,
        pets: action.payload,
        backupPets: action.payload,
      };
    }

    case 'GET_DETAIL_PRODUCTS': {
      return {
        ...state,
        details: action.payload,
        backupDetail: action.payload
      }
    }
    case 'DETAIL_VACIO' : {
      return {
        ...state,
        details:{}
      }
    }

    case "SET_LOADING":
      return {
        ...state,
        products: action.payload ? [] : state.products,
      };

    default:
      return state;
  }
}

export default rootReducer;
