import * as actionTypes from '../constants'
const INITIAL_STATE = {
    listCartData: {},
    isFetching: false,
    isError: false,
    errorMess: "",
}
const CartType = {...actionTypes.cartTypes}
export default cartReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CartType.GET_CART_REQUEST:
        case CartType.UPDATE_CART_REQUEST:
            return {
                ...state,
                isFetching: false,
            };
        case CartType.GET_CART_SUCCESS:
            return {
                ...state,
                isFetching: false,
                listCartData: payload.data
            };
        case CartType.GET_CART_FAILURE:
            return {
                ...state,
                isFetching: false,
                isError: true,
                errorMess: payload.errorMess
            };
        default:
            return state;
    }
}