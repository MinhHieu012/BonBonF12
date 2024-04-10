import { useEffect, useMemo, useState } from "react";
import { EmptyDataCommon, FlatListOrderCommon, HeaderSearchCommon, LoadingCommon } from '../component'
import { useListOrder } from '../hook'
import { timeout, timeoutGet } from '../utils'

export default function ListOrderScreen(props) {
    const { listOrderData, dispatchGetListOrder } = useListOrder();
    const [listData, setListData] = useState(listOrderData);
    const [isEmptyList, setIsEmptyList] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { listOrderSearchData, textSearch, dispatchSearchListOrder } = useListOrder()

    const onGetTextSearch = (data) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            dispatchSearchListOrder(data)
        }, timeout);
    }
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatchGetListOrder();
            setLoading(false)
        })
    }, [])

    useMemo(() => {
        if (textSearch && listOrderSearchData.length === 0) {
            setIsEmptyList(true);
            return;
        }

        setIsEmptyList(false);

        if (textSearch && listOrderSearchData.length !== 0) {
            setListData(listOrderSearchData);
        } else if(textSearch === "") {
            setListData(listOrderData);
        }
    }, [textSearch, listOrderSearchData, listOrderData]);

    return (
        <>
            <HeaderSearchCommon {...props} onGetTextSearch={onGetTextSearch} />
            {isEmptyList ? (<EmptyDataCommon />) : (<FlatListOrderCommon data={listData}/>)}
            <LoadingCommon isOpen={isLoading} />
        </>
    );
}

