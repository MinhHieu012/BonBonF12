import * as actionTypes from "../constants";

const INITIAL_STATE = {
  isFetching: false,
  isNotification: false,
  isError: "",
  errorMess: "",
  listOrderData: [],
  textSearch: "",
  listOrderSearchData: [],
};

const listOrderTypes = actionTypes.listOrderTypes;
export default function listOrderReducer(
  state = INITIAL_STATE,
  { type, payload }
) {
  switch (type) {
    case listOrderTypes.GET_LIST_ORDER_REQUEST:
    case listOrderTypes.SEARCH_LIST_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
        textSearch: payload,
      };
    case listOrderTypes.GET_LIST_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listOrderData: payload.data,
      };
    case listOrderTypes.SEARCH_LIST_ORDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listOrderSearchData: payload.data,
      };
    case listOrderTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isNotification: true,
      };
    case listOrderTypes.GET_LIST_ORDER_FAILURE:
    case listOrderTypes.SEARCH_LIST_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: false,
        errorMess: payload.errorMess,
      };
    case listOrderTypes.NOTIFICATION_CLEAR:
      return {
        ...state,
        isNotification: false,
      };
    default:
      return state;
  }
}
