import { combineReducers  } from 'redux';
import clientReducer from './clientReducer';
import adminReducer from './adminReducer';
import cartReducer from './cartReducer';
import reviewsReducer from './reviewsReducer';

const rootReducer = combineReducers ({
  clientReducer,
  adminReducer,
  cartReducer,
  reviewsReducer,
})

export default rootReducer;
