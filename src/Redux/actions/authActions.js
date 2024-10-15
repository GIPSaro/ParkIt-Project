
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        payload: token,
    };
};
export const loginAction = (userData) => {
  return {
    type: LOGIN,
    payload: userData,
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
