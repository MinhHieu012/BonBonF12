import { useDispatch, useSelector } from "react-redux";
import { importWareHouseAction } from "../actions";

export function useImportWareHouse() {
  const dispatch = useDispatch();

  const listImportWareHouseData = useSelector(
    (state) => state.importWareHouse.listImportWareHouseData
  );

  const listImportWareHouseSearchData = useSelector(
    (state) => state.importWareHouse.listImportWareHouseSearchData
  );

  const textSearch = useSelector((state) => state.importWareHouse.textSearch);

  const notificationDataStore = useSelector(
    (state) => state.importWareHouse.isNotification
  );

  const dispatchGetListImportWareHouse = () => {
    dispatch(importWareHouseAction.listImportWareHouseRequest());
  };

  const dispatchSearchImportListWareHouse = (payload) => {
    dispatch(importWareHouseAction.searchListImportWareHouseRequest(payload));
  };

  const dispatchUpdateListWareHouse = (payload) => {
    dispatch(importWareHouseAction.updateListImportWareHouseRequest(payload));
  };

  const dispatchCreateNewProduct = (payload) => {
    dispatch(
      importWareHouseAction.addNewProductImportWareHouseRequest(payload)
    );
  };

  const dispatchClearNotificationStore = () => {
    dispatch(importWareHouseAction.ClearNotificationListProduct());
  };

  return {
    listImportWareHouseData,
    listImportWareHouseSearchData,
    textSearch,
    notificationDataStore,
    dispatchGetListImportWareHouse,
    dispatchSearchImportListWareHouse,
    dispatchUpdateListWareHouse,
    dispatchCreateNewProduct,
    dispatchClearNotificationStore,
  };
}
