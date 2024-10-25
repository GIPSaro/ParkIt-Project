export const UPDATE_USER = "UPDATE_USER";
export const SET_USER_ID = "SET_USER_ID";


export const updateUserAction = (user) => {
  console.log('Dati utente:', user); 
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: UPDATE_USER,
    payload: {
      ...user,
      id: user.id, 
    },
  };
};

export const setUserId = (id) => {
  console.log('ID utente settato:', id);  
  return {
    type: SET_USER_ID,
    payload: id,
  };
};


