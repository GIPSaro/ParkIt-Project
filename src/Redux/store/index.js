import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
// import parkingReducer from "../reducers/parkingReducer";


const rootReducer = combineReducers({
  auth: authReducer,
//   parking: parkingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
