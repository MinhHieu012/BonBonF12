import { authType } from "../constants";

const INITIAL_STATE = {
  token: null,
  isFetching: false,
  isError: false,
  message: "",
};

export default authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case authType.LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isFetching: false,
        isError: false,
        message: "",
      };
    case authType.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isFetching: false,
        isError: false,
        message: "",
      };
    default:
      return state;
  }
};
