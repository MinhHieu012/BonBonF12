import { useDispatch, useSelector } from "react-redux";
import * as wareHouseAction from "../actions";
const useWareHouse = () => {
  const dispatch = useDispatch();
  const listWareHouseData = useSelector(
    (state) => state.wareHouse.listWareHousetData
  );
  const notificationData = useSelector(
    (state) => state.wareHouse.notificationData
  );
  const dispatchGetListWareHouse = () => {
    dispatch(wareHouseAction.wareHouseAction.listProductRequest);
  };
  const dispatchUpdateProductPrice = (payload) => {
    dispatch(wareHouseAction.updateListImportWareHouseRequest(payload));
  };
  const dispatchClearNotificationWareHouse = () => {
    dispatch(wareHouseAction.ClearNotificationListProduct);
  };
  return {
    listWareHouseData,
    dispatchGetListWareHouse,
    notificationData,
    dispatchUpdateProductPrice,
    dispatchClearNotificationWareHouse,
  };
};
export default useWareHouse;
