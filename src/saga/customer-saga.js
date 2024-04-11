import { put, takeLatest } from "redux-saga/effects"
import { customerAction } from "../actions"
import { customerTypes } from "../constants"
import { useLocalStorage } from "../hook"
import { listCustomerData } from "../mockup"
import { removeVietnameseTones } from "../utils"

const { getData, setData } = useLocalStorage();
function* handleGetListCustomer() {
    try {
        const listCustomerDataLocal = yield getData(listCustomerData.key)
        yield put(customerAction.listCustomerSuccess(
            { data: listCustomerDataLocal }
        ))
    } catch (error) {
        yield put(customerAction.listCustomerFailure(
            { errorMess: error.message }
        ))
    }
}

function* handleSearchListCustomer({ payload: textSearch }) {
    const handleCheckString = (inputText) => {
        const formatTextSearch = textSearch.trim().toLowerCase()
        const formatInputText = inputText.trim().toLowerCase()
        const removeVietNameseTextSearch = removeVietnameseTones(formatTextSearch)
        const removeVietNameseInputText = removeVietnameseTones(formatInputText)
        return removeVietNameseInputText.includes(removeVietNameseTextSearch)
    }
    try {
        const listCustomerDataLocal = yield getData(listCustomerData.key)
        let result = []
        for (let i = 0; i < listCustomerDataLocal.length; i++) {
            if (handleCheckString(listCustomerDataLocal[i].phoneNumber) || handleCheckString(listCustomerDataLocal[i].fullName)) {
                result.push(listCustomerDataLocal[i])
            }
        }
        if (result) {
            yield put(customerAction.searchListCustomerSuccess({ data: result }))
        } else {
            yield put(customerAction.searchListCustomerSuccess({ data: [] }))
        }
    } catch (error) {
        yield put(customerAction.searchListCustomerFailure({ errorMess: error.message }))
    }
}

function* handleCreateCustomer(data) {
    try {
        const listCustomerDataLocal = yield getData(listCustomerData.key)
        data.payload.id = listCustomerDataLocal.length + 1;
        listCustomerDataLocal.unshift(data.payload);
        yield setData(listCustomerData.key, listCustomerDataLocal)
        yield put(customerAction.addCustomerSuccess);
        yield handleGetListCustomer();
    } catch (error) {
        yield put(customerAction.addCustomerFailure({ errorMess: error.message }))
    }
}

const customerSaga = [
    takeLatest(customerTypes.GET_CUSTOMER_REQUEST, handleGetListCustomer),
    takeLatest(customerTypes.SEARCH_CUSTOMER_REQUEST, handleSearchListCustomer),
    takeLatest(customerTypes.ADD_CUSTOMER_REQUEST, handleCreateCustomer)
]
export default customerSaga