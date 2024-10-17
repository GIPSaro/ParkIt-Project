
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveToken = (token) => {
    return {
        type: SAVE_TOKEN,
        payload: token,
    };
};
export const loginAction = (userData, token) => {
    console.log("User data being passed:", userData);
  localStorage.setItem('token', token); 
  localStorage.setItem('user', JSON.stringify(userData));


  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: userData,
    });
    dispatch(saveToken(token)); 
  };
};

export const logoutAction = () => {
  localStorage.removeItem('token');
      localStorage.removeItem('user');
  return {
    type: LOGOUT,
  };
};
