import {useLocalStorage} from "../hook"
import {listImageProductData} from "../mockup"
import {imageProductTypes} from "../constants"
import { put, takeLatest } from 'redux-saga/effects'


function* handleGetListImageProduct() {
    const { getData } = useLocalStorage();
    try {
        const listImageProductDataLocal = yield getData(listImageProductData.key);
        yield put(imageProductAction.getListImageProductSuccess({
            data: listImageProductDataLocal
        }))
    } catch (error) {
        yield put(imageProductAction.getListImageProductFailure({
            errorMess: error.message
        }))
    }
}
 function* handleUpdateListImageProduct(payload){
    const{getData} = useLocalStorage();
    try {
        const listImageProductDataLocal = yield call(getData, { key: listImageProductData });
        yield put(imageProductAction.getListImageProductSuccess({
            data: listImageProductDataLocal
        }))
        const newListImageProduct = listImageProductDataLocal.filter(item);
        yield setData(listImageProductData.key, newListImageProductData.key);
        yield handleGetListImageProduct();
        return ({
            payload: item.id != payload.payload.id
        })
    } catch (error) {
        yield put(imageProductAction.updateListImageProductFailure({
            errorMess: error.message
        }))
    }
}

const importWareHouseSaga = [
    takeLatest(imageProductTypes.GET_IMAGE_PRODUCT_REQUEST, handleGetListImageProduct),
    takeLatest(imageProductTypes.UPDATE_IMAGE_PRODUCT_REQUEST, handleUpdateListImageProduct),
]
export default importWareHouseSaga;