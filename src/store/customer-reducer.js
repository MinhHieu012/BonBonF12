import * as actionTypes from "../constants"

const INITIAL_STATE = {
    isFetching: false,
    isError: "",
    errorMess: "",
    listCustomerData: [],
    listCustomerSearchData: []
}

const customer = {...actionTypes.customerTypes}

export default customerReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case customer.GET_CUSTOMER_REQUEST || customer.SEARCH_CUSTOMER_REQUEST || customer.ADD_CUSTOMER_REQUEST:
            return {
                ...state,
                isFetching: true,
                textSearch: payload
            }
            case customer.GET_CUSTOMER_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    listCustomerData: payload.data
                }
            case customer.SEARCH_CUSTOMER_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    listCustomerSearchData: payload.data
                }
            case customer.GET_CUSTOMER_FAILURE || customer.SEARCH_CUSTOMER_FAILURE || customer.ADD_CUSTOMER_FAILURE:
                return {
                ...state,
                isFetching: false,
                isError: false,
                errorMess: payload.errorMess
            }
        case customer.ADD_CUSTOMER_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    textSearch: ""
                }
        default:
            return state    
    }
}