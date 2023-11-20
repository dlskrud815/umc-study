import * as types from "./actionTypes";

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = (userInfo) => ({
  type: types.LOGIN_SUCCESS,
  userInfo,
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  error,
});
