import { put, takeLatest } from "redux-saga/effects"
import { cartAction, listProductAction, wareHouseAction } from "../actions"
import { listProductTypes } from "../constants"
import { useLocalStorage } from "../hook"
import { adminCartData, listProductData, saleCartData } from "../mockup"
import { removeVietnameseTones } from "../utils"

const { getItemData, getData, setData } = useLocalStorage();

function* handleGetListProduct() {
    try {
        const listProductDataLocal = yield getData(listProductData.key)
        // yield put({ type: 'listProductSuccess', data: listProductDataLocal });
        yield put(listProductAction.listProductSuccess({ data: listProductDataLocal }))
    } catch (error) {
        // yield put({ type: 'listProductFailure', errorMess: error.message });
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
            findDataStoreCart.quantity = totalQuantity;
        }
    }
    try {
        const role = yield getItemData("role");
        if (role === "admin") {
            const dataStoreAdminCart = yield getData(adminCartData.key);
            if (dataStoreAdminCart.length === 0) {
                dataStoreAdminCart.push(itemProduct);
                yield setData(adminCartData.key, dataStoreAdminCart);
                yield put(cartAction.CartSuccess({ data: dataStoreAdminCart }))
            } else {
                handleFindItemProduct(dataStoreAdminCart);
                yield setData(adminCartData.key, dataStoreAdminCart)
                yield put(cartAction.createItemProductSucsses({ data: dataStoreAdminCart }))
            }
        } else {
            const dataStoreSaleCart = yield getData(saleCartData.key);
            if (dataStoreSaleCart.length === 0) {
                dataStoreSaleCart.push(itemProduct);
                yield setData(saleCartData.key, dataStoreSaleCart);
                yield put(cartAction.CartSuccess({ data: dataStoreSaleCart }))
            } else {
                handleFindItemProduct(dataStoreSaleCart);
                yield setData(saleCartData.key, dataStoreSaleCart)
                yield put(cartAction.createItemProductSucsses({ data: dataStoreSaleCart }))
            }
        }
    } catch (error) {
        yield put(cartAction.createItemProductFailure({ errorMess: error.message }))
    }
}

function* handleSearchListProduct(textSearch) {
    const { getData } = useLocalStorage();
    const handleCheckString = (inputText) => {
        const formatTextSearch = textSearch.trim().toLowerCase();
        const formatInputText = inputText.trim().toLowerCase();
        const removeVietNameseTextSearch = removeVietnameseTones(formatTextSearch);
        const removeVietNameseInputText = removeVietnameseTones(formatInputText);
        return (includes(removeVietNameseTextSearch, removeVietNameseInputText));
    }
    try {
        const listProductDataLocal = yield getData(listProductData.key);
        const result = [];
        listProductDataLocal.forEach((item) => {
            const codeProduct = item.codeProduct;
            const name = item.name;
            if (handleCheckString(codeProduct) || handleCheckString(name)) {
                result.push(listProductDataLocal);
            }
        })
        if (result) {
            yield put(wareHouseAction.searchListWareHouseSuccess({ data: result }));
        } else {
            yield put(wareHouseAction.searchListWareHouseSuccess({ data: [] }))
        }
    } catch (error) {
        yield put(wareHouseAction.searchListWareHouseFailure({ errorMess: error.message }))
    }
}

const listProductSaga = [
    takeLatest(listProductTypes.GET_LIST_PRODUCT_REQUEST, handleGetListProduct),
    takeLatest(listProductTypes.ADD_ITEM_PRODUCT_REQUEST, handleCreateItemProduct),
    takeLatest(listProductTypes.SEARCH_LIST_PRODUCT_REQUEST, handleSearchListProduct),
];

export default listProductSaga