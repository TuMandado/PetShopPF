const initialState = {
  products: [],
  backup: [],
  pets: [],
  backupPets:[],
  users: [],
  filter: [],
  details: {},
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
    case 'GET_TOTAL_PETS' : {
      return {
        ...state,
        pets: action.payload,
        backupPets: action.payload
      }

    }
    default:
      return state;
  }
}

export default rootReducer;
