const initialState = {
  products: [],
  backup: [],
  pets: [],
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
      const nameSearch = state.products.filter((e) => {
        return e.title === action.payload;
      });
      if (nameSearch.length !== 0) {
        return {
          ...state,
          backup: nameSearch,
        };
      } else {
        return {
          ...state,
          products: false,
        };
      }
    }
    default:
      return state;
  }
}

export default rootReducer;
