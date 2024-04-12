import { createAction } from "@reduxjs/toolkit";
import {
  listProductTypes,
  imageProductTypes,
  listOrderTypes,
  customerTypes,
  cartTypes,
  importWareHouseTypes,
  authType,
  wareHouseTypes,
  importWareHouse,
} from "../constants";
export const listProductAction = {
  listProductRequest: createAction(listProductTypes.GET_LIST_PRODUCT_REQUEST),
  listProductSuccess: createAction(listProductTypes.GET_LIST_PRODUCT_SUCCESS),
  listProductFailure: createAction(listProductTypes.GET_LIST_PRODUCT_FAILURE),
  searchListProductRequest: createAction(
    listProductTypes.SEARCH_LIST_PRODUCT_REQUEST
  ),
  searchListProductSuccess: createAction(
    listProductTypes.SEARCH_LIST_PRODUCT_SUCCESS
  ),
  searchListProductFailure: createAction(
    listProductTypes.SEARCH_LIST_PRODUCT_FAILURE
  ),
  updateProductPriceRequest: createAction(
    listProductTypes.UPDATE_PRODUCT_PRICE_REQUEST
  ),
  updateProductPriceSuccess: createAction(
    listProductTypes.UPDATE_PRODUCT_PRICE_SUCCESS
  ),
  updateProductPriceFailure: createAction(
    listProductTypes.UPDATE_PRODUCT_PRICE_FAILURE
  ),
  ClearNotificationListProduct: createAction(
    listProductTypes.NOTIFICATION_CLEAR
  ),
};

export const listOrderAction = {
  listOrderRequest: createAction(listOrderTypes.GET_LIST_ORDER_REQUEST),
  listOrderSuccess: createAction(listOrderTypes.GET_LIST_ORDER_SUCCESS),
  listOrderFailure: createAction(listOrderTypes.GET_LIST_ORDER_FAILURE),

  createOrderRequest: createAction(listOrderTypes.CREATE_ORDER_REQUEST),
  createOrderSuccess: createAction(listOrderTypes.CREATE_ORDER_SUCCESS),
  createOrderFailure: createAction(listOrderTypes.CREATE_ORDER_FAILURE),

  searchListOrderRequest: createAction(
    listOrderTypes.SEARCH_LIST_ORDER_REQUEST
  ),
  searchListOrderSuccess: createAction(
    listOrderTypes.SEARCH_LIST_ORDER_SUCCESS
  ),
  searchListOrderFailure: createAction(
    listOrderTypes.SEARCH_LIST_ORDER_FAILURE
  ),
  clearNotificationStore: createAction(listOrderTypes.NOTIFICATION_CLEAR),
};

export const authAction = {
  loginRequest: createAction(authType.LOGIN_REQUEST),
  loginSuccess: createAction(authType.LOGIN_SUCCESS),
  loginFailure: createAction(authType.LOGIN_FAILURE),
  logoutRequest: createAction(authType.LOGOUT_REQUEST),
  logoutSuccess: createAction(authType.LOGOUT_SUCCESS),
  logoutFailure: createAction(authType.LOGOUT_FAILURE),
};

export const imageProductAction = {
  getListImageProductRequest: createAction(
    imageProductTypes.GET_IMAGE_PRODUCT_REQUEST
  ),
  getListImageProductSuccess: createAction(
    imageProductTypes.GET_IMAGE_PRODUCT_SUCCESS
  ),
  getListImageProductFailure: createAction(
    imageProductTypes.GET_IMAGE_PRODUCT_FAILURE
  ),

  updateListImageProductRequest: createAction(
    imageProductTypes.UPDATE_IMAGE_PRODUCT_REQUEST
  ),
  updateListImageProductSuccess: createAction(
    imageProductTypes.UPDATE_IMAGE_PRODUCT_SUCCESS
  ),
  updateListImageProductFailure: createAction(
    imageProductTypes.UPDATE_IMAGE_PRODUCT_FAILURE
  ),
};

export const importWareHouseAction = {
  addNewProductImportWareHouseRequest: createAction(
    importWareHouseTypes.ADD_IMPORT_WARE_HOUSE_REQUEST
  ),
  addNewProductImportWareHouseSuccess: createAction(
    importWareHouseTypes.ADD_IMPORT_WARE_HOUSE_SUCCESS
  ),
  addNewProductImportWareHouseFailure: createAction(
    importWareHouseTypes.ADD_IMPORT_WARE_HOUSE_FAILURE
  ),
  listImportWareHouseRequest: createAction(
    importWareHouse.GET_IMPORT_WARE_HOUSE_REQUEST
  ),
  listImportWareHouseSuccess: createAction(
    importWareHouse.GET_IMPORT_WARE_HOUSE_SUCCESS
  ),
  listImportWareHouseFailure: createAction(
    importWareHouse.GET_IMPORT_WARE_HOUSE_FAILURE
  ),
  searchListImportWareHouseRequest: createAction(
    importWareHouseTypes.SEARCH_IMPORT_WARE_HOUSE_REQUEST
  ),
  searchListImportWareHouseSuccess: createAction(
    importWareHouseTypes.SEARCH_IMPORT_WARE_HOUSE_SUCCESS
  ),
  searchListImportWareHouseFailure: createAction(
    importWareHouseTypes.SEARCH_IMPORT_WARE_HOUSE_FAILURE
  ),
  updateListImportWareHouseRequest: createAction(
    importWareHouseTypes.UPDATE_IMPORT_WARE_HOUSE_REQUEST
  ),
  updateListImportWareHouseSuccess: createAction(
    importWareHouseTypes.UPDATE_IMPORT_WARE_HOUSE_SUCCESS
  ),
  updateListImportWareHouseFailure: createAction(
    importWareHouseTypes.UPDATE_IMPORT_WARE_HOUSE_FAILURE
  ),
  ClearNotificationListProduct: createAction(
    listProductTypes.NOTIFICATION_CLEAR
  ),
};

export const wareHouseAction = {
  listWareHouseRequest: createAction(wareHouseTypes.GET_WARE_HOUSE_REQUEST),
  listWareHouseSuccess: createAction(wareHouseTypes.GET_WARE_HOUSE_SUCCESS),
  listWareHouseFailure: createAction(wareHouseTypes.GET_WARE_HOUSE_FAILURE),
  searchListWareHouseRequest: createAction(
    wareHouseTypes.SEARCH_WARE_HOUSE_REQUEST
  ),
  searchListWareHouseSuccess: createAction(
    wareHouseTypes.SEARCH_WARE_HOUSE_SUCCESS
  ),
  searchListWareHouseFailure: createAction(
    wareHouseTypes.SEARCH_WARE_HOUSE_FAILURE
  ),
  updateProductPriceRequest: createAction(
    listProductTypes.UPDATE_PRODUCT_PRICE_REQUEST
  ),
  updateProductPriceSuccess: createAction(
    listProductTypes.UPDATE_PRODUCT_PRICE_SUCCESS
  ),
  updateProductPriceFailure: createAction(
    listProductTypes.UPDATE_PRODUCT_PRICE_FAILURE
  ),
  ClearNotificationListProduct: createAction(
    listProductTypes.NOTIFICATION_CLEAR
  ),
};

export const cartAction = {
  CartRequest: createAction(cartTypes.GET_CART_REQUEST),
  CartSuccess: createAction(cartTypes.GET_CART_SUCCESS),
  CartFailure: createAction(cartTypes.GET_CART_FAILURE),
  createItemProductRequest: createAction(
    listProductTypes.ADD_ITEM_PRODUCT_REQUEST
  ),
  createItemProductSucsses: createAction(
    listProductTypes.ADD_ITEM_PRODUCT_SUCCESS
  ),
  createItemProductFailure: createAction(
    listProductTypes.ADD_ITEM_PRODUCT_FAILURE
  ),
  updateCartRequest: createAction(cartTypes.UPDATE_CART_REQUEST),
  updateCartSuccess: createAction(cartTypes.UPDATE_CART_SUCCESS),
  updateCartFailure: createAction(cartTypes.UPDATE_CART_FAILURE),
};

export const customerAction = {
  addCustomerRequest: createAction(customerTypes.ADD_CUSTOMER_REQUEST),
  addCustomerSuccess: createAction(customerTypes.ADD_CUSTOMER_SUCCESS),
  addCustomerFailure: createAction(customerTypes.ADD_CUSTOMER_FAILURE),

  listCustomerRequest: createAction(customerTypes.GET_CUSTOMER_REQUEST),
  listCustomerSuccess: createAction(customerTypes.GET_CUSTOMER_SUCCESS),
  listCustomerFailure: createAction(customerTypes.GET_CUSTOMER_FAILURE),

  searchListCustomerRequest: createAction(
    customerTypes.SEARCH_CUSTOMER_REQUEST
  ),
  searchListCustomerSuccess: createAction(
    customerTypes.SEARCH_CUSTOMER_SUCCESS
  ),
  searchListCustomerFailure: createAction(
    customerTypes.SEARCH_CUSTOMER_FAILURE
  ),
};
