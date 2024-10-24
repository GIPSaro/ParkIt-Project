export const UPDATE_USER = "UPDATE_USER";
export const SET_USER_ID = "SET_USER_ID";


export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: {
    ...user,
    id: user.id, 
  },
});

export const setUserId = (id) => ({
  type: SET_USER_ID,
  payload: id,
});

