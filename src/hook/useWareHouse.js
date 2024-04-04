import { useDispatch, useSelector } from "react-redux";
import {wareHouseAction} from "../actions";
const useWareHouse = () => {
  const dispatch = useDispatch();
  const listWareHouseData = useSelector(
    (state) => state.wareHouse.listWareHousetData
  );
  const notificationData = useSelector(
    (state) => state.wareHouse.isNotification
  );
  const listWareHouseSearchData= useSelector(state=>state.wareHouse.listWareHouseSearchData);
  const textSearch = useSelector(state=>state.wareHouse.textSearch);
  
  const dispatchGetListWareHouse = () => {
    dispatch(wareHouseAction.listWareHouseRequest());
  };
  const dispatchUpdateProductPrice = (payload) => {
    dispatch(wareHouseAction.updateProductPriceRequest(payload));
  };
  const dispatchClearNotificationWareHouse = () => {
    dispatch(wareHouseAction.ClearNotificationListProduct());
  };
  const dispatchSearchListWareHouse= (payload)=>{
    dispatch(wareHouseAction.searchListWareHouseRequest(payload));
  }
  
  return {
    listWareHouseData,
    notificationData,
    listWareHouseSearchData,
    textSearch,
    dispatchGetListWareHouse,
    dispatchUpdateProductPrice,
    dispatchSearchListWareHouse,
    dispatchClearNotificationWareHouse,
  };
};
export default useWareHouse;