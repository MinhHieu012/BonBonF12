import { useLocalStorage } from "../hook";
import { listImageProductData } from "../mockup";
import { imageProductTypes } from "../constants";
import { put, takeLatest } from "redux-saga/effects";
import { imageProductAction } from "../actions";

const { getData, setData } = useLocalStorage();
function* handleGetListImageProduct() {
  try {
    //import imageProductAction
    const listImageProductDataLocal = yield getData(listImageProductData.key);
    yield put(
      imageProductAction.getListImageProductSuccess({
        data: listImageProductDataLocal,
      })
    );
  } catch (error) {
    yield put(
      imageProductAction.getListImageProductFailure({
        errorMess: error.message,
      })
    );
  }
}
function* handleUpdateListImageProduct(payload) {
  try {
    const listImageProductDataLocal = yield getData(listImageProductData.key);
    const newListImageProductData = listImageProductDataLocal.filter(
      (item) => item.id !== payload.payload.id
    );

    yield setData(listImageProductData.key, newListImageProductData);
    yield handleGetListImageProduct();
  } catch (error) {
    yield put(
      imageProductAction.updateListImageProductFailure({
        errorMess: error.message,
      })
    );
  }
}

const importWareHouseSaga = [
  takeLatest(
    imageProductTypes.GET_IMAGE_PRODUCT_REQUEST,
    handleGetListImageProduct
  ),
  takeLatest(
    imageProductTypes.UPDATE_IMAGE_PRODUCT_REQUEST,
    handleUpdateListImageProduct
  ),
];
export default importWareHouseSaga;
