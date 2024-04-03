import { useDispatch, useSelector } from "react-redux";
import { importWareHouseAction } from "../actions"

export function useImportWareHouse() {
    const dispatch = useDispatch()
    const listImportWareHouseData = useSelector(state => state.importWareHouse.listImportWareHouseData);
    const dispatchGetListImportWareHouse = () => {
        dispatch(importWareHouseAction.listImportWareHouseRequest())
    };
    const listImportWareHouseSearchData = useSelector(state => state.importWareHouse.listImportWareHouseSearchData);
    const textSearch = useSelector(state => state.importWareHouse.textSearch);
    const dispatchSearchImportListWareHouse = (payload) => {
        dispatch(importWareHouseAction.searchListImportWareHouseRequest(payload))
    };

    const dispatchUpdateListWareHouse = (payload) => {
        dispatch(updateListImportWareHouseRequest(payload));
    };

    const dispatchCreateNewProduct  = (payload) => {
        dispatch(addNewProductImportWareHouseRequest(payload));
    };
    return {
        listImportWareHouseData,
        listImportWareHouseSearchData,
        textSearch,
        dispatchGetListImportWareHouse,
        dispatchSearchImportListWareHouse,
        dispatchUpdateListWareHouse ,
        dispatchCreateNewProduct
    }
}