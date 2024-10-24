export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SAVE_TOKEN = "SAVE_TOKEN";

export const saveToken = (token) => {
  return {
    type: SAVE_TOKEN,
    payload: token,
  };
};

export const loginAction = (userData, token, role) => {
  return (dispatch) => {
    const userWithRole = { ...userData, role };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userWithRole));

    dispatch({
      type: LOGIN,
      payload: { user: userWithRole, token },
    });

    dispatch(saveToken(token));
    console.log("Dati utente nel localStorage:", localStorage.getItem("user"));
    console.log("Token salvato:", localStorage.getItem("token"));

    console.log("User data being passed:", userWithRole);
    if (role === "ADMIN") {
      console.log("User is an admin");
    } else {
      console.log("User is not an admin");
    }
  };
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
};
