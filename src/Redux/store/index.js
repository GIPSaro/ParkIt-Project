import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import registerReducer from "../reducers/registerReducer";
// import parkingReducer from "../reducers/parkingReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
//   parking: parkingReducer,

});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
