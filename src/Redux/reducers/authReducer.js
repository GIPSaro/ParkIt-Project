import { LOGIN, LOGOUT, SAVE_TOKEN } from "../actions/authActions";

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token, 
            };
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: null,
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


};

export default authReducer;
