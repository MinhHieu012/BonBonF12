import { useDispatch, useSelector } from "react-redux"
import { listOrderAction } from '../actions'

export const useListOrder = () => {
    const dispatch = useDispatch();
    const listOrderData = useSelector(state => state.listOrder.listOrderData);
    const listOrderSearchData = useSelector(state => state.listOrder.listOrderSearchData);
    const textSearch = useSelector(state => state.listOrder.textSearch)
    const dispatchGetListOrder = () => {
        dispatch(listOrderAction.listOrderRequest());
    };

    const notification = useSelector(state => state.listOrder.isNotification);

    const dispatchSearchListOrder = (payload) => {
        dispatch(listOrderAction.searchListOrderRequest(payload))
    }

    const dispatchClearNotificationStore = () => {
        dispatch(listOrderAction.clearNotificationStore())
    }

    const dispatchCreateOder = (payload) => {
        dispatch(listOrderAction.createOrderRequest(payload))
    }
    return { listOrderData, dispatchGetListOrder, listOrderSearchData, textSearch, dispatchSearchListOrder, dispatchClearNotificationStore, dispatchCreateOder, notification };
};