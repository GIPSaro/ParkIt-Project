
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

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
