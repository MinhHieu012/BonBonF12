import { put, takeLatest } from 'redux-saga/effects'
import { listOrderAction } from '../actions'
import { listOrderTypes } from '../constants'
import { useLocalStorage } from '../hook'
import { adminCartData, listOrderData, listProductData, saleCartData } from '../mockup/'
import { dateFormat, removeVietnameseTones, statusOrder } from '../utils'
import moment from 'moment/moment'

function getTotalProductPrice(data) {
    return data.isSalePrice ? (data.floorPrice + productUpdate.salePrice * productUpdate.quantity) : (data.floorPrice - productUpdate.salePrice * productUpdate.quantity)
}

function transformListProductCart(listData) {
    return listData.map((item, index) => ({
        name: item.name,
        priceEdit: item.floorPrice,
        quantity: item.currentQuantity,
        unit: item.unit,
        totalProductPrice: getTotalProductPrice(item),
        avatar: item.avatar
    }));
}

function transformCreateOrder(customer, listProduct, cartTotalPrice) {
    const orderCode = generateOrderCode();

    const customerObj = {
        id: customer.id,
        address: customer.address,
        fullName: customer.fullName,
        phoneNumber: customer.phoneNumber,
        avatar: customer.avatar
    };

    const transformOrder = {
        customer: customerObj,
        orderPrice: cartTotalPrice,
        status: statusOrder.THANH_CONG,
        listProduct: transformListProductCart(listProduct),
        orderTime: moment().format(dateFormat.DATE_TIME),
        orderCode: orderCode
    };

    return transformOrder;
}

function mappingProductCart(dataCart) {
    let listCodeCart = [];

    dataCart.forEach(item => {
        if (!listCodeCart.includes(item.codeProduct)) {
            listCodeCart.push(item.codeProduct);
        }
    });

    let result = [];

    listCodeCart.forEach(code => {
        let totalQuantity = dataCart.reduce((accumulator, currentValue) => {
            if (currentValue.codeProduct === code) {
                return accumulator + currentValue.quantity;
            }
            return accumulator;
        }, 0);

        result.push({
            codeProduct: code,
            quantity: totalQuantity
        });
    });

    return result;
}

function mappingProduct({ listProductLocal, listProductCart }) {
    const updatedListProductLocal = [...listProductLocal];

    listProductCart.forEach(cartItem => {
        const productIndex = updatedListProductLocal.findIndex(localItem => localItem.codeProduct === cartItem.codeProduct);

        if (productIndex !== -1) {
            updatedListProductLocal[productIndex].quantity -= cartItem.quantity;
            if (updatedListProductLocal[productIndex].quantity < 0) {
                updatedListProductLocal[productIndex].quantity = 0;
            }
        }
    });

    return updatedListProductLocal;
}

function* handleCreateOrder({ payload: dataOrder }) {
    try {
        const { getData, getItemData, setData } = useLocalStorage();
        const listOrderDataLocal = yield getData(listOrderData.key);
        const listProductDataLocal = yield getData(listProductData.key);
        const tranFormDataCreateOrder = transformCreateOrder(dataOrder);
        const newOrder = {
            id: listOrderDataLocal.length + 1,
            ...tranFormDataCreateOrder
        };
        listOrderDataLocal.unshift(newOrder);
        const role = yield getItemData('role');

        if (role === 'admin') {
            yield setData(adminCartData.key, {
                ...tranFormDataCreateOrder,
                listProduct: [],
                customer: {}
            });
        } else if (role === 'sale') {
            yield setData(saleCartData.key, {
                ...tranFormDataCreateOrder,
                listProduct: [],
                customer: {}
            });
        }
        const listProductCart = mappingProductCart(dataOrder.listProduct);
        const newListProduct = mappingProduct(listProductDataLocal, listProductCart);
        yield setData(listOrderData.key, listOrderDataLocal);
        yield setData(listProductData.key, newListProduct);
        yield put(listOrderAction.createOrderSuccess());

    } catch (error) {
        yield put(listOrderAction.createOrderFailure({ errorMess: error.message }));
    }
}

function* handleGetListOrder() {
    const { getData } = useLocalStorage
    try {
        const listOrderDataLocal = yield getData({ listOrderData });
        yield put(listOrderAction.listOrderSuccess({ data: listOrderDataLocal }));
    } catch (error) {
        yield put(listOrderAction.listOrderFailure({ errorMess: error.message }));
    }
}

function* handleSearchListOrder({ payload }) {
    const { getData } = useLocalStorage()
    const handleCheckString = (inputText) => {
        const formatTextSearch = textSearch.trim().toLowerCase();
        const formatInputText = inputText.trim().toLowerCase();
        const removeVietNameseTextSearch = removeVietnameseTones(formatTextSearch);
        const removeVietNameseInputText = removeVietnameseTones(formatInputText);
        return removeVietNameseInputText.includes(removeVietNameseTextSearch);
    }

    try {
        const listOrderDataLocal = yield getData(listOrderData.listProduct)
        const flatListCustomer = listOrderDataLocal.map(({ orderCode, fullName }) => ({ orderCode, fullName }))
        let result = [];
        flatListCustomer.forEach(item => {
            if (handleCheckString(item.orderCode) || handleCheckString(item.fullName)) {
                result.push(item);
            }
        })
        if (result) {
            yield put(searchListOrderSuccess({ data: result }));
        } else {
            yield put(searchListOrderSuccess({ data: [] }));
        }
    } catch (error) {
        yield put(searchListOrderFailure({ errorMess: error.message }));
    }
}


const listOrderSaga = [
    takeLatest(listOrderTypes.GET_LIST_ORDER_REQUEST, handleGetListOrder),
    takeLatest(listOrderTypes.SEARCH_LIST_ORDER_REQUEST, handleSearchListOrder),
    takeLatest(listOrderTypes.CREATE_ORDER_REQUEST, handleCreateOrder)
]
export default listOrderSaga




