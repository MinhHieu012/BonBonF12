import { put, takeLatest } from "redux-saga/effects";
import { wareHouseAction, listProductAction } from "../actions";
import { wareHouseTypes, listProductTypes } from "../constants";
import { useLocalStorage } from "../hook";
import { adminCartData, listProductData, saleCartData } from "../mockup";
import { removeVietnameseTones } from "../utils";
import { isEmpty } from "lodash";

function* handleGetListWareHouse() {
  const { getData } = useLocalStorage();
  try {
    const listProductDataLocal = yield getData(listProductData.key);
    yield put(
      wareHouseAction.listWareHouseSuccess({ data: listProductDataLocal })
    );
  } catch (error) {
    yield put(
      wareHouseAction.listWareHouseFailure({ errorMess: error.message })
    );
  }
}

function* handleSearchListWareHouse({ payload: textSearch }) {
  const { getData } = useLocalStorage();
  const handleCheckString = (inputText) => {
    const formatTextSearch = textSearch.trim().toLowerCase()
    const formatInputText = inputText.trim().toLowerCase()
    const removeVietNameseTextSearch = removeVietnameseTones(formatTextSearch);
    const removeVietNameseInputText = removeVietnameseTones(formatInputText);
    return removeVietNameseInputText.includes(removeVietNameseTextSearch)
  }
  try {
    const listProductDataLocal = yield getData(listProductData.key);
    let result = []
    for (let i = 0; i < listProductDataLocal.length; i++) {
      if (handleCheckString(listProductDataLocal[i].codeProduct) || handleCheckString(listProductDataLocal[i].name)) {
        result.push(listProductDataLocal[i])
      }
    }
    if (result) {
      yield put(wareHouseAction.searchListWareHouseSuccess({
        data: result
      }))
    } else {
      yield put(wareHouseAction.searchListWareHouseSuccess({
        data: []
      }))
    }
  } catch (error) {
    yield put(
      wareHouseAction.searchListWareHouseFailure({
        errorMess: error.message
      })
    )
  }
}

function* handleUpdateProductPrice({ payload }) {
  const { getData, setData } = useLocalStorage();
  try {
    const listProductDataLocal = yield getData(listProductData.key);
    const adminCartDataLocal = yield getData(adminCartData.key);
    const saleCartDataLocal = yield getData(saleCartData.key);
    if (!isEmpty(adminCartDataLocal)) {
      adminCartDataLocal.map((item, index) => {
        if (item.codeProduct === payload.codeProduct) {
          adminCartDataLocal.listProduct[index].floorPrice = true;
        }
      });
    }
    if (!isEmpty(saleCartDataLocal)) {
      saleCartDataLocal.map((item, index) => {
        if (item.codeProduct === payload.codeProduct) {
          saleCartDataLocal.listProduct[index].floorPrice = true;
        }
      });
    }
    if (!isEmpty(listProductDataLocal)) {
      listProductDataLocal.map((item, index) => {
        if (item.codeProduct === payload.codeProduct) {
          listProductDataLocal[index].floorPrice = payload.floorPrice;
        }
      });
    }
    yield setData(listProductData.key, listProductDataLocal);
    yield setData(adminCartData.key, adminCartDataLocal);
    yield setData(saleCartData.key, saleCartDataLocal);
    yield handleGetListWareHouse()
  } catch (error) {
    yield put(listProductAction.listProductFailure({
      errorMess: error.message,
    }));
  }
}

const wareHouseSaga = [
  takeLatest(wareHouseTypes.GET_WARE_HOUSE_REQUEST, handleGetListWareHouse),
  takeLatest(wareHouseTypes.SEARCH_WARE_HOUSE_REQUEST, handleSearchListWareHouse),
  takeLatest(listProductTypes.UPDATE_PRODUCT_PRICE_REQUEST, handleUpdateProductPrice),
];

export default wareHouseSaga;