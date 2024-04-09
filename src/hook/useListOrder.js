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

    const dispatchSearchListOrder = (payload) => {
        dispatch(listOrderAction.searchListOrderRequest(payload))
    }

    const dispatchClearNotificationStore = () => {
        dispatch(listOrderAction.clearNotificationStore())
    }
    return { listOrderData, dispatchGetListOrder, listOrderSearchData, textSearch, dispatchSearchListOrder, dispatchClearNotificationStore };
};