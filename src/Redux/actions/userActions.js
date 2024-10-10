export const UPDATE_USER = "UPDATE_USER";

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});