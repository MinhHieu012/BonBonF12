import * as actionTypes from "../constants";

const INITIAL_STATE = {
  token: null,
  isFetching: false,
  isError: false,
  message: "",
};
const authTypes = {...actionTypes.authType}
export default authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isFetching: false,
        isError: false,
        message: "",
      };
    case authTypes.LOGOUT_SUCCESS:
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