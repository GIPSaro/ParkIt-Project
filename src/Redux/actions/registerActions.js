export const REGISTER_USER = "REGISTER_USER";

export const registerAction = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});