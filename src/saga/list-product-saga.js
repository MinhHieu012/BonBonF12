import { put, takeLatest } from "redux-saga/effects"
import { cartAction, listProductAction } from "../actions"
import { listProductTypes } from "../constants"
import { useLocalStorage } from "../hook"
import { adminCartData, listProductData, saleCartData } from "../mockup"
import { removeVietnameseTones } from "../utils"

const { getItemData, getData, setData } = useLocalStorage();

function* handleGetListProduct() {
    try {
        const listProductDataLocal = yield getData(listProductData.key)
        yield put(listProductAction.listProductSuccess({ data: listProductDataLocal }))
    } catch (error) {
        yield put(listProductAction.listProductFailure({ errorMess: error.message }))
    }
}
function* handleCreateItemProduct({ payload }) {
    const itemProduct = payload;
    const handleFindItemProduct = (DataStoreProduct) => {
        const findDataStoreCart = DataStoreProduct.find(element =>
            element.floorPrice === itemProduct.floorPrice &&
            element.isSalePrice === itemProduct.isSalePrice &&
            element.salePrice === itemProduct.salePrice &&
            element.codeProduct === itemProduct.codeProduct
        );
        if (!findDataStoreCart) {
            DataStoreProduct.push(itemProduct);
        } else {
            const totalQuantity = findDataStoreCart.quantity + itemProduct.quantity;
            DataStoreProduct.forEach(element => {
                if (element.floorPrice === itemProduct.floorPrice &&
                    element.isSalePrice === itemProduct.isSalePrice &&
                    element.salePrice === itemProduct.salePrice &&
                    element.codeProduct === itemProduct.codeProduct) {
                    element.quantity = totalQuantity;
                }
            })
        }
    }
    try {
        const role = yield getItemData("role");
        if (role === "admin") {
            const dataStoreAdminCart = yield getData(adminCartData.key);
            if (dataStoreAdminCart.listProduct.length === 0) {
                dataStoreAdminCart.listProduct.push(itemProduct);
                yield setData(adminCartData.key, dataStoreAdminCart);
                yield put(cartAction.createItemProductSucsses({ data: dataStoreAdminCart }))
            } else {
                handleFindItemProduct(dataStoreAdminCart.listProduct)
                yield setData(adminCartData.key, dataStoreAdminCart);
                yield put(cartAction.createItemProductSucsses({ data: dataStoreAdminCart }))
            }
        } else {
            const dataStoreSaleCart = yield getData(saleCartData.key);
            if (dataStoreSaleCart.listProduct.length === 0) {
                dataStoreSaleCart.listProduct.push(itemProduct);
                yield setData(saleCartData.key, dataStoreSaleCart);
                yield put(cartAction.CartSuccess({ data: dataStoreSaleCart }))
            } else {
                handleFindItemProduct(dataStoreSaleCart.listProduct);
                yield setData(saleCartData.key, dataStoreSaleCart)
                yield put(cartAction.createItemProductSucsses({ data: dataStoreSaleCart }))
            }
        }
    } catch (error) {
        yield put(cartAction.createItemProductFailure({ errorMess: error.message }))
    }
}

function* handleSearchListProduct({ payload: textSearch }) {
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
            yield put(listProductAction.searchListProductSuccess({
                data: result
            }))
        } else {
            yield put(listProductAction.searchListProductSuccess({
                data: []
            }))
        }
    } catch (error) {
        yield put(
            listProductAction.searchListProductFailure({
                errorMess: error.message
            })
        )
    }
}

const listProductSaga = [
    takeLatest(listProductTypes.GET_LIST_PRODUCT_REQUEST, handleGetListProduct),
    takeLatest(listProductTypes.ADD_ITEM_PRODUCT_REQUEST, handleCreateItemProduct),
    takeLatest(listProductTypes.SEARCH_LIST_PRODUCT_REQUEST, handleSearchListProduct),
];

export default listProductSaga