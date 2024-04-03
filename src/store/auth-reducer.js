import * as actionTypes from "../constants";

const INITIAL_STATE = {
  token: null,
  isFetching: false,
  isError: false,
  message: "",
};
const authTypes = {...actionTypes.authType}
export default authReducer = (state = INITIAL_STATE, action) => {
  console.log(action,"log state in file store authentication");
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        // token: action.payload,
        token:state.role,
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

