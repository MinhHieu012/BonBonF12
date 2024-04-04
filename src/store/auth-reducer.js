import { authType } from "../constants";
import { useLocalStorage } from "../hook";
const INITIAL_STATE = {
  token: null,
  isFetching: false,
  isError: false,
  message: "",
};
const { getData } = useLocalStorage();

export default authReducer = (state = INITIAL_STATE, { type, payload }) => {
  console.log(type, payload, "log state in file store authentication");
  switch (type) {
    case authType.LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.role,
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

