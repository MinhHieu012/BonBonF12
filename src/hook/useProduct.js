import { useDispatch, useSelector } from "react-redux";
import { listProductAction, cartAction } from '../actions'
export const useProduct = () => {
    const dispatch = useDispatch();
    
    const listProductData = useSelector((state) => state.listProduct.listProductData);

    const listSearchProductData = useSelector((state) => state.listProduct.listSearchProductData);
    
    const notificationData = useSelector((state) => state.listProduct.isNotification);

    const isFetching = useSelector((state) => state.listProduct.isFetching);

    const dispatchGetListProduct = (payload) => {
        dispatch(listProductAction.listProductRequest(payload))
    }
    const dispatchClearNotification = () => {
        dispatch(listProductAction.ClearNotificationListProduct())
    }
    const dispatchCreateItemProduct = (payload) => {
        dispatch(cartAction.createItemProductRequest(payload))
    }
    function dispatchSearchListProduct(payload) {
        dispatch(listProductAction.searchListProductRequest(payload));
    }

    return {
        notificationData,
        listProductData,
        isFetching,
        listSearchProductData,
        dispatchClearNotification,
        dispatchGetListProduct,
        dispatchCreateItemProduct,
        dispatchSearchListProduct,
    }
}