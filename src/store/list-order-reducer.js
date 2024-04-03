import * as actionTypes from '../constants'
const INITIAL_STATE = {
    isFetching: false,
    isError: "",
    errorMess: "",
    isNotification: false,
    listOrderData: [],
    textSearch: "",
    listOrderSearchData: [],
};
const listOrderTypes = {...actionTypes.listOrderTypes}

export default listOrderReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case listOrderTypes.GET_LIST_ORDER_REQUEST:
            return {
                ...state,
                isFetching: true,
                textSearch: payload,
            };
        case listOrderTypes.GET_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listOrderData: payload.data
            };
        case listOrderTypes.GET_LIST_ORDER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: false,
                listOrderData: payload.errorMess
            };
        case listOrderTypes.SEARCH_LIST_ORDER_REQUEST:
            return {
                ...state,
                isFetching: true,
                textSearch: payload
            }
        case listOrderTypes.SEARCH_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listOrderSearchData: payload.data
            }
        case listOrderTypes.SEARCH_LIST_ORDER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: false,
                errorMess: payload.errorMess
            }
        default:
            return state;
    }
}
