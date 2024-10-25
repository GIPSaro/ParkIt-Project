import { UPDATE_USER } from "../actions/userActions";
import { SET_USER_ID } from "../actions/userActions";

const savedUser = JSON.parse(localStorage.getItem('user')) || null;
const initialState = {
  email: savedUser ? savedUser.email : '',
  role: savedUser ? savedUser.role : '',
  id: savedUser ? savedUser.id : null,
  user: savedUser,
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload, 
        id: action.payload.id, 
        
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
