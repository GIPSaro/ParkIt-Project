import { UPDATE_USER } from "../actions/userActions";
import { SET_USER_ID } from "../actions/userActions";

const initialState = {
  email: '',
  role: '',
  id: null,   
  user: null, 
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload, 
      };
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload,  
      };
    default:
      return state;
  }
};

export default userReducer;
