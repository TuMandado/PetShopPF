import { combineReducers  } from 'redux';
import clientReducer from './clientReducer';
import adminReducer from './adminReducer';
import cartReducer from './adminReducer';

const rootReducer = combineReducers ({
  clientReducer,
  adminReducer,
  cartReducer,
})

export default rootReducer;
