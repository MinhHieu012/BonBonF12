import { useEffect, useMemo, useState } from "react";
import {
    EmptyDataCommon,
    FlatListOrderCommon,
    HeaderSearchCommon,
    LoadingCommon,
} from "../component";
import { useListOrder } from "../hook";
import { timeout, timeoutGet } from "../utils";

export default function ListOrderScreen(props) {
    const {
        listOrderData,
        listOrderSearchData,
        textSearch,
        dispatchGetListOrder,
        dispatchSearchListOrder,
    } = useListOrder();
    const [listData, setListData] = useState(listOrderData);
    const [isEmptyList, setIsEmptyList] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const onGetTextSearch = (data) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatchSearchListOrder(data);
        }, timeout);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatchGetListOrder();
            setLoading(false);
        }, timeoutGet);
    }, []);

    useMemo(() => {
        if (!listOrderSearchData?.length && textSearch?.length) {
            setIsEmptyList(true);
            return;
        }
        setIsEmptyList(false);
        if (listOrderSearchData?.length && textSearch?.length) {
            setListData(listOrderSearchData);
        } else if (!textSearch?.length) {
            setListData(listOrderData);
        }
    }, [textSearch, listOrderSearchData, listOrderData]);

    return (
        <>
            <HeaderSearchCommon {...props} onGetTextSearch={onGetTextSearch} />
            {isEmptyList ? (
                <EmptyDataCommon/>
            ) : (
                <FlatListOrderCommon data={listData} />
            )}
            <LoadingCommon isOpen={isLoading} />
        </>
    );
}