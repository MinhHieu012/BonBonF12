import { useDispatch, useSelector } from "react-redux";
import { listProductAction, cartAction } from "../actions";
export const useProduct = () => {
  const dispatch = useDispatch();
  const listProductData = useSelector(
    (state) => state.listProduct.listProductData
  );
  const listSearchProductData = useSelector(
    (state) => state.listProduct.listProductSearchData
  );
  const notificationData = useSelector(
    (state) => state.listProduct.isNotification
  );
  const isFetching = useSelector((state) => state.listProduct.isFetching);
  const textSearch = useSelector((state) => state.listProduct.textSearch);

  const dispatchGetListProduct = () => {
    dispatch(listProductAction.listProductRequest());
  };

  const dispatchClearNotification = () => {
    dispatch(listProductAction.ClearNotificationListProduct());
  };

  const dispatchCreateItemProduct = (payload) => {
    dispatch(cartAction.createItemProductRequest(payload));
  };

  const dispatchSearchListProduct = (payload) => {
    dispatch(listProductAction.searchListProductRequest(payload));
  };

  return {
    notificationData,
    listProductData,
    isFetching,
    listSearchProductData,
    textSearch,
    dispatchClearNotification,
    dispatchGetListProduct,
    dispatchCreateItemProduct,
    dispatchSearchListProduct,
  };
};
