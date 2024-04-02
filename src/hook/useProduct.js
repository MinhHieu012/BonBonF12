import {useDispatch, useSelector } from "react-redux";
import { listProductAction, cartAction } from '../actions'
export const useProduct=()=>{
    const dispatch = useDispatch();
    const listProductData = useSelector((state) => state.listProductData);

    const notificationData = useSelector((state)=> state.isNotification);

    const isFetching = useSelector((state) => state.isFetching );

    const dispatchGetListProduct =(payload) =>{
        dispatch(listProductRequest(payload))
    }
    const dispatchClearNotification = (payload)=>{
        dispatch(ClearNotificationListProduct(payload))
    }
    const dispatchCreateItemProduct = (payload)=>{
        dispatch(cartAction.createItemProductRequest(payload))
    }
    function dispatchSearchListProduct(payload ){
        dispatch(searchListProductRequest(payload));
    }
    return {
        notificationData,
        listProductData,
        listProductSearchData,
        isFetching,
        dispatchClearNotification,
        dispatchGetListProduct,
        dispatchCreateItemProduct,
        dispatchSearchListProduct
    }
}