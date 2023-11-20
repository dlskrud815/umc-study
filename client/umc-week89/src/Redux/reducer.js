import * as types from "./actionTypes";

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  userInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
