import * as actionTypes from "../constants";
const INITIAL_STATE = {
  isFetching: false,
  isError: "",
  errorMess: "",
  isNotification: false,
  listWareHousetData: [],
  listWareHouseSearchData: [],
};

const wareHouseTypes = {...actionTypes.wareHouseTypes}
const listProductTypes = {...actionTypes.listProductTypes}
export default listProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case wareHouseTypes.GET_WARE_HOUSE_REQUEST:
    case wareHouseTypes.SEARCH_WARE_HOUSE_REQUEST:
      return {
        ...state,
        isFetching: true,
        textSearch: action.payload,
      };
    case wareHouseTypes.GET_WARE_HOUSE_SUCCESS:
    case wareHouseTypes.SEARCH_WARE_HOUSE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listWareHousetData: action.payload.data,
      };
    case wareHouseTypes.GET_WARE_HOUSE_FAILURE:
    case wareHouseTypes.SEARCH_WARE_HOUSE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMess: action.payload.errorMess,
      };
    case listProductTypes.UPDATE_PRODUCT_PRICE_REQUEST:
      return { ...state, isNotification: true };
    case listProductTypes.NOTIFICATION_CLEAR:
      return { ...state, isNotification: false };
    default:
      return state;
  }
};
