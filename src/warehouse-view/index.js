import {
    CardProductCommon,
    LoadingCommon,
    HeaderSearchCommon,
    ToastNotificationCommon,
    EmptyDataCommon
} from "../component";
// import HeaderSearchCommon from "../component/header-search-common";
import { useEffect, useMemo, useState } from "react";
import {useIsFocused} from "@react-navigation/native";
import useWareHouse from "../hook/useWareHouse";
import { timeout, timeoutGet } from "../utils";
import {UpdatePriceProductModal} from "./update-price-product-modal";

const WarehouseScreen = (props) => {
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(false);
    const {
        listWareHouseData,
        listWareHouseSearchData,
        textSearch,
        notificationData,
        dispatchSearchListWareHouse,
        dispatchGetListWareHouse,
        dispatchClearNotificationWareHouse,
        dispatchUpdateProductPrice,
    } = useWareHouse();
    const [isUpdatePriceModal, setIsUpdatePriceModal] = useState(false);
    const [productSelected, setProductSelected] = useState({});
    const [isNotification, setIsNotification] = useState(notificationData);
    const updateProductPrice = (data)=>{
        dispatchUpdateProductPrice(data);
        setIsUpdatePriceModal(false);
    };
    const onSelectProduct = (data)=>{
        setProductSelected(data);
        setIsUpdatePriceModal(true);
    };
    
    const useMemo = ()=>{
        if (listWareHouseSearchData.length===0&&textSearch.length>0){
            setIsEmptyList(true);
        }
        if (notificationData){
            setIsNotification(true);
            setTimeout(()=>{
                dispatchClearNotificationWareHouse();
            },1000*1.5)
        }else {
            setIsEmptyList(false);
        }
        if (listWareHouseSearchData.length>0&&textSearch.length>0){
            setListData(listWareHouseSearchData);
        }else if (textSearch.length===0){
            setListData(listWareHouseData);
        }
        const closeUpdatePriceModal = ()=>{
            setIsUpdatePriceModal(false);
        }
        const updateProductPrice = (data)=>{
            dispatchUpdateProductPrice(data);
            setIsUpdatePriceModal(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatchGetListWareHouse();
            setLoading(false);
        }, timeoutGet);
    }, [isFocused]);
    return (
        <>
            <HeaderSearchCommon {...props} />
            <CardProductCommon onShowModal= {onSelectProduct } data={listWareHouseData} {...props} />
            <EmptyDataCommon />
            <LoadingCommon isOpen={isLoading} />
            <UpdatePriceProductModal updatePrice = {updateProductPrice} data={productSelected }/>
            {!isNotification&&<ToastNotificationCommon Info="Cập nhật giá sàn thành công !!!" Description="Đã cập nhất giá sàn thành công" />}
        </>
    );
};
export default WarehouseScreen;
