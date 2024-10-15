import { LOGIN, LOGOUT } from "../actions/authActions";
import { SAVE_TOKEN } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: localStorage.getItem('token') || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
      case SAVE_TOKEN:
        localStorage.setItem('token', action.payload); 
        return {
            ...state,
            token: action.payload,
        };
    default:
      return state;
  }
}

export default authReducer;
