import * as actionTypes from '../constants'

const INITIAL_STATE = {
    isFetching: false,
    isNotification: false,
    isError: "",
    errorMess: "",
    listProductData: [],
    listProductSearchData: [],
}

const listProductTypes = {...actionTypes.listProductTypes}

export default listProductReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case listProductTypes.GET_LIST_PRODUCT_REQUEST:
            return {
                ...state,
                isFetching: true,
                // textSearch: payload
            }

        case listProductTypes.GET_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listProductData: payload.data
            }

        case listProductTypes.GET_LIST_PRODUCT_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: false,
                errorMess: payload.errorMess
            }
        case listProductTypes.NOTIFICATION_CLEAR:
            return {
                ...state,
                isNotification: false
            }


        case listProductTypes.ADD_ITEM_PRODUCT_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case listProductTypes.GET_LIST_PRODUCT_SUCCESS:
        case listProductTypes.ADD_ITEM_PRODUCT_SUCCESS:   
            return {
                ...state,
                isFetching: false,
                isNotification: true
            }

        case listProductTypes.ADD_ITEM_PRODUCT_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: true,
                errorMess: payload.errorMess
            }

        case listProductTypes.SEARCH_LIST_PRODUCT_REQUEST:
            return {
                isFetching: true,
                textSearch: payload
            }

        case listProductTypes.SEARCH_LIST_PRODUCT_SUCCESS:
            return {
                isFetching: false,
                listProductData: payload.data
            }

        case listProductTypes.SEARCH_LIST_PRODUCT_FAILURE:
            return {
                isFetching: false,
                isError: false,
                errorMess: payload.errorMess
            }
        default:
            return state;
    }
}