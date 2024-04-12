import moment from "moment";
import { put, takeLatest } from "redux-saga/effects";
import { listOrderAction } from "../actions";
import { listOrderTypes } from "../constants";
import { useLocalStorage } from "../hook/index";
import {
  adminCartData,
  listOrderData,
  listProductData,
  saleCartData,
} from "../mockup/index";
import { dateFormat, removeVietnameseTones, statusOrder } from "../utils";

function getTotalProductPrice(data) {
  return data.isSalePrice
    ? (data.floorPrice + data.salePrice) * data.currentQuantity
    : (data.floorPrice - data.salePrice) * data.currentQuantity;
}

function transformListProductCart(listData) {
  return listData.map((item, index) => {
    return {
      idProduct: index,
      name: item.name,
      priceEdit: item.floorPrice,
      quantity: item.currentQuantity,
      unit: item.unit,
      totalProductPrice: getTotalProductPrice(item),
      avatar: item.avatar,
    };
  });
}

function transformCreateOrder({ customer, listProduct, cartTotalPrice }) {
  const orderCode = `11.${Math.floor(Math.random() * 1000000)}.001`;
  return {
    customer: {
      id: customer.id,
      address: customer.address,
      fullName: customer.fullName,
      phoneNumber: customer.phoneNumber,
      avatar: customer.avatar,
    },
    orderPrice: cartTotalPrice,
    status: statusOrder.THANH_CONG,
    listProduct: transformListProductCart(listProduct),
    orderTime: moment().format(dateFormat.DATE_TIME),
    orderCode,
  };
}

function mappingProductCart(dataCart) {
  const listCodeCart = [];
  dataCart.forEach((item) => {
    if (!listCodeCart.includes(item.codeProduct)) {
      listCodeCart.push(item.codeProduct);
    }
  });

  return listCodeCart.map((itemCode) => {
    const quantity = dataCart.reduce((acc, cur) => {
      if (cur.codeProduct === itemCode) {
        return acc + cur.currentQuantity;
      }
      return acc;
    }, 0);
    return {
      codeProduct: itemCode,
      quantity: quantity,
    };
  });
}

function mappingProduct({ listProductLocal, listProductCart }) {
  return listProductLocal.map((product) => {
    const cart = listProductCart.find(
      (item) => item.codeProduct === product.codeProduct
    );
    if (cart && cart.codeProduct === product.codeProduct) {
      const newQuantity = product.quantity - cart.quantity;
      return {
        ...product,
        quantity: newQuantity,
      };
    } else {
      return {
        ...product,
      };
    }
  });
}

export function* handleGetListOrder() {
  const { getData } = useLocalStorage();
  try {
    const listOrderDataLocal = yield getData(listOrderData.key);
    yield put(listOrderAction.listOrderSuccess({ data: listOrderDataLocal }));
  } catch (error) {
    yield put(
      listOrderAction.listOrderFailure({
        errorMess: error.message,
      })
    );
  }
}

function* handleSearchListOrder({ payload: textSearch }) {
  const { getData } = useLocalStorage();
  const handleCheckString = (inputText) => {
    const formatTextSearch = textSearch.trim().toLowerCase();
    const formatInputText = inputText.trim().toLowerCase();
    const removeVietNameseTextSearch = removeVietnameseTones(formatTextSearch);
    const removeVietNameseInputText = removeVietnameseTones(formatInputText);
    return removeVietNameseInputText.includes(removeVietNameseTextSearch);
  };
  try {
    const listOrderDataLocal = yield getData(listOrderData.key);
    const flatListCustomer = listOrderDataLocal.map((item) => {
      return {
        orderCode: item.orderCode,
        fullName: item.customer.fullName,
      };
    });
    let result = [];
    for (let i = 0; i < flatListCustomer.length; i++) {
      if (
        handleCheckString(flatListCustomer[i].orderCode) ||
        handleCheckString(flatListCustomer[i].fullName)
      ) {
        result.push(listOrderDataLocal[i]);
      }
    }
    if (result) {
      yield put(
        listOrderAction.searchListOrderSuccess({
          data: result,
        })
      );
    } else {
      yield put(
        listOrderAction.searchListOrderSuccess({
          data: [],
        })
      );
    }
  } catch (error) {
    yield put(
      listOrderAction.searchListOrderFailure({
        errorMess: error.message,
      })
    );
  }
}

function* handleCreateOrder({ payload: dataOrder }) {
  const { getData, setData, getItemData } = useLocalStorage();
  try {
    const listOrderDataLocal = yield getData(listOrderData.key);
    const listProductDataLocal = yield getData(listProductData.key);
    const tranFormDataCreateOrder = transformCreateOrder(dataOrder);
    listOrderDataLocal.unshift({
      id: listOrderDataLocal.length + 1,
      ...tranFormDataCreateOrder,
    });
    const role = yield getItemData("role");
    if (role === "admin") {
      yield setData(adminCartData.key, {
        ...tranFormDataCreateOrder,
        listProduct: [],
        customer: {},
      });
    }
    if (role === "sale") {
      yield setData(saleCartData.key, {
        ...tranFormDataCreateOrder,
        listProduct: [],
        customer: {},
      });
    }
    const listProductCart = mappingProductCart(dataOrder.listProduct);
    const newListProduct = mappingProduct({
      listProductLocal: listProductDataLocal,
      listProductCart: listProductCart,
    });
    yield setData(listOrderData.key, listOrderDataLocal);
    yield setData(listProductData.key, newListProduct);
    yield put(listOrderAction.createOrderSuccess());
  } catch (error) {
    yield put(listOrderAction.createOrderFailure({ errorMess: error.message }));
  }
}

const listOrderSaga = [
  takeLatest(listOrderTypes.GET_LIST_ORDER_REQUEST, handleGetListOrder),
  takeLatest(listOrderTypes.SEARCH_LIST_ORDER_REQUEST, handleSearchListOrder),
  takeLatest(listOrderTypes.CREATE_ORDER_REQUEST, handleCreateOrder),
];

export default listOrderSaga;
