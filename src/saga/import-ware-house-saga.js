import { put, takeLatest } from "redux-saga/effects";
import { importWareHouseAction } from "../actions/index";
import { importWareHouseTypes } from "../constants";
import { useLocalStorage } from "../hook";
import { listProductData } from "../mockup";
import { removeVietnameseTones } from "../utils";

function* handleGetListImportWareHouse() {
    const { getData } = useLocalStorage();
    try {
        const listProductDataLocal = yield getData(listProductData.key);
        yield put(
            importWareHouseAction.listImportWareHouseSuccess(listProductDataLocal)
        );
    } catch (error) {
        yield put(importWareHouseAction.listImportWareHouseFailure(error.message));
    }
}

function* handleUpdateListImportWareHouse(data) {
    const { getData, setData } = useLocalStorage();
    try {
        const listProductLocal = yield getData(listProductData.key);
        let findItemProductLocal = listProductLocal.find(
            (item) => item.id === data.payload.id
        );
        findItemProductLocal.quantity += data.payload.quantity;
        yield setData(listProductData.key, listProductLocal);
        yield put(
            importWareHouseAction.updateListImportWareHouseSuccess(
                findItemProductLocal
            )
        );
        yield handleGetListImportWareHouse();
    } catch (error) {
        yield put(
            importWareHouseAction.updateListImportWareHouseFailure(error.message)
        );
    }
}
function* handleAddNewProductImportWareHouse({ payload }) {
    const { getData, setData } = useLocalStorage();
    try {
        let listProductLocal = yield getData(listProductData.key);
        payload.id = listProductLocal.length + 1;
        listProductLocal.unshift(payload);
        yield setData(listProductData.key, listProductLocal);
        yield put(importWareHouseAction.addNewProductImportWareHouseSuccess());
        yield handleGetListImportWareHouse();
    } catch (error) {
        yield put(
            importWareHouseAction.addNewProductImportWareHouseFailure({
                errorMess: error.message,
            })
        );
    }
}

function* handleSearchListImportWareHouse({ payload: textSearch }) {
    const { getData } = useLocalStorage();
    const handleCheckString = (inputText) => {
        const formatTextSearch = textSearch.trim().toLowerCase();
        const formatInputText = inputText.trim().toLowerCase();
        const removeVietNameseTextSearch = removeVietnameseTones(formatTextSearch);
        const removeVietNameseInputText = removeVietnameseTones(formatInputText);
        return removeVietNameseInputText.includes(removeVietNameseTextSearch);
    };
    try {
        const listProductDataLocal = yield getData(listProductData.key);
        let result = [];
        for (let i = 0; i < listProductDataLocal.length; i++) {
            if (
                handleCheckString(listProductDataLocal[i].codeProduct) ||
                handleCheckString(listProductDataLocal[i].name)
            ) {
                result.push(listProductDataLocal[i]);
            }
        }
        if (result) {
            yield put(
                importWareHouseAction.searchListImportWareHouseSuccess({
                    data: result,
                })
            );
        } else {
            yield put(
                importWareHouseAction.searchListImportWareHouseSuccess({
                    data: [],
                })
            );
        }
    } catch (error) {
        yield put(
            importWareHouseAction.searchListImportWareHouseFailure({
                errorMess: error.message,
            })
        );
    }
}

const importWareHouseSaga = [
    takeLatest(
        importWareHouseTypes.GET_IMPORT_WARE_HOUSE_REQUEST,
        handleGetListImportWareHouse
    ),
    takeLatest(
        importWareHouseTypes.ADD_IMPORT_WARE_HOUSE_REQUEST,
        handleAddNewProductImportWareHouse
    ),
    takeLatest(
        importWareHouseTypes.UPDATE_IMPORT_WARE_HOUSE_REQUEST,
        handleUpdateListImportWareHouse
    ),
    takeLatest(
        importWareHouseTypes.SEARCH_IMPORT_WARE_HOUSE_REQUEST,
        handleSearchListImportWareHouse
    ),
];

export default importWareHouseSaga;