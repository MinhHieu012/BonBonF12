import { createAction } from '@reduxjs/toolkit'
import { listProductTypes, imageProductTypes, listOrderTypes, customerTypes, cartTypes, importWareHouseTypes, authType, wareHouseTypes , importWareHouse} from "../constants"

export const authAction = {
    loginRequest: createAction(authType.LOGIN_REQUEST),
    loginSuccess: createAction(authType.LOGIN_SUCCESS),
    loginFailure: createAction(authType.LOGIN_FAILURE),
    logoutRequest: createAction(authType.LOGOUT_REQUEST),
    logoutSuccess: createAction(authType.LOGOUT_SUCCESS),
    logoutFailure: createAction(authType.LOGOUT_FAILURE),
};