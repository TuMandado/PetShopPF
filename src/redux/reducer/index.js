import { combineReducers  } from 'redux';
import clientReducer from './clientReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers ({
  clientReducer,
  adminReducer,

})

export default rootReducer;
