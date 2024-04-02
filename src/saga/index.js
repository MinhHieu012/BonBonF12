import wareHouseSaga from "./ware-house-saga"
import { all } from "redux-saga/effects"
import importWareHouseSaga from "./import-ware-house-saga"
import cartSaga from "./cart-saga"
import listOrderSaga from "./list-order-saga"
import listProductSaga from "./list-product-saga"
import customerSaga from "./customer-saga"
import listImageProductSaga from "./list-image-product-saga"

function* rootSaga() {
    yield all([
        ...importWareHouseSaga,
        ...wareHouseSaga,
        ...cartSaga,
        ...listOrderSaga,
        ...listProductSaga,
        ...customerSaga,
        ...listImageProductSaga
    ])
}
export default rootSaga;