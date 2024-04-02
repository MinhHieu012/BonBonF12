import { put, takeLatest } from 'redux-saga/effects'
import cartAction from '../actions'
import {cartTypes} from '../constants'
import useLocalStorage from '../hook/useLocalStorage'
import { adminCartData, saleCartData } from '../mockup'

const { getData, getItemData, setData } = useLocalStorage();
function* handleGetListCart() {
    const role = yield getItemData("role");
    try {
        if (role === "admin") {
            const listProductAdminCart = yield ((getDataadminCartData.key));
            yield put(cartAction.cartSuccess({ data: listProductAdminCart }))
        } else {
            const listProductSaleCart = yield (getData(saleCartData.key));
            yield put(cartAction.CartSuccess({ data: listProductSaleCart }))
        }
    } catch (error) {
        yield put(cartAction.CartFailure({ errorMess: error.message }))
    }
}

function* handleUpdateCart(payload){
    const role = yield getItemData("role");
    try {
        if(role === "admin"){
            yield put(setData({
                key: "adminCartData",
                data: { ...payload, shipPrice }
            }));
        }else{
            yield put(setData({
                key: "saleCartData",
                data: { ...payload, shipPrice }
            }));
        }
        yield handleGetListCart()
    } catch (error) {
        yield put(cartAction.CartFailure({ errorMess: error.message }));
    }
}

const cartSaga = [
    takeLatest(cartTypes.GET_CART_REQUEST, handleGetListCart),
    takeLatest(cartTypes.UPDATE_CART_REQUEST, handleUpdateCart),
]

export default cartSaga