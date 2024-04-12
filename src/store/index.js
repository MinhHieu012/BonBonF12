import listOrderReducer from "./list-order-reducer";
import authReducer from "./auth-reducer";
import wareHouseReducer from "./ware-house-reducer";
import cartReducer from "./cart-reducer";
import listProductReducer from "./list-product-reducer";
import importWareHouseReducer from "./import-ware-house-reducer";
import customerReducer from "./customer-reducer";
import listImageProductReducer from "./list-image-product-reducer";

const combineReducers = {
  listOrder: listOrderReducer,
  listProduct: listProductReducer,
  wareHouse: wareHouseReducer,
  importWareHouse: importWareHouseReducer,
  customer: customerReducer,
  cart: cartReducer,
  listImageProduct: listImageProductReducer,
  auth: authReducer,
};
export default combineReducers;
