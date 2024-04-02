import * as actionTypes from "../constants"

const INITIAL_STATE = {
    listImportWareHouseData: [],
    isFetching: false,
    isError: false,
    errorMess: "",
    isNotification: false,
    listOrderData: [],
    textSearch: "",
    listOrderSearchData: []
}

const importWareHouse = {...actionTypes.importWareHouse}

export default listProductReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case importWareHouse.GET_IMPORT_WARE_HOUSE_REQUEST:
            return {
                isFetching: true
            }
        case importWareHouse.GET_IMPORT_WARE_HOUSE_SUCCESS: // cần check lại TMSPVK-172
            return {
                isFetching: false,
                listCartData: action.payload
            }
        case importWareHouse.GET_IMPORT_WARE_HOUSE_FAILURE:
            return {
                isFetching: false,
                isError: true,
                errorMess: action.payload.errorMess
            }

            case importWareHouse.ADD_IMPORT_WARE_HOUSE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case importWareHouse.ADD_IMPORT_WARE_HOUSE_SUCCESS: 
            return {
                ...state,
                isFetching: true,
                listImportWareHouseData: payload
            }
        case importWareHouse.ADD_IMPORT_WARE_HOUSE_FAILURE:
            return {
                ...state,
                isFetching: false,
               isError: false ,
               errorMess: payload.errorMess
            }

        case importWareHouse.UPDATE_IMPORT_WARE_HOUSE_REQUEST:
            return {
                isFetching: true,
                textSearch: payload
            }
        case importWareHouse.UPDATE_IMPORT_WARE_HOUSE_SUCCESS:
            return {
                isFetching: false,
                listImportWareHouseData: payload.data
            }
        case importWareHouse.UPDATE_IMPORT_WARE_HOUSE_FAILURE:
            return {
                isFetching: false,
                isError: true,
                errorMess: payload.errorMess
            }
        case importWareHouse.SEARCH_IMPORT_WARE_HOUSE_REQUEST:
            return {
                isFetching: true,
                textSearch: payload,
            }
        case importWareHouse.SEARCH_IMPORT_WARE_HOUSE_SUCCESS:
            return {
                isFetching: false,
                listImportWareHouseSearchData: payload.data
            }
        case importWareHouse.SEARCH_IMPORT_WARE_HOUSE_FAILURE:
            return {
                isFetching: false,
                isError: false,
                errorMess: payload.errorMess
            }
        default:
            return state
    }
}