import { Feather } from "@expo/vector-icons";
import { Fab, Text } from "@gluestack-ui/themed";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import {
    CardProductCommon,
    EmptyDataCommon,
    HeaderSearchCommon,
    LoadingCommon,
    ToastNotificationCommon,
} from "../component";
import { useImportWareHouse } from "../hook";
import { timeout, timeoutGet } from "../utils";
import UpdateOldProductModal from "./update-old-product-modal";
export default function ImportWarehouseScreen(props) {
    const navigation = useNavigation();
    const [onData, setOnData] = useState();
    const [isClear, setClear] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [isShowModalNoti, setShowModalNoti] = useState(false);
    const [isEmptyList, setIsEmptyList] = useState(false);
    const [listData, setListData] = useState(listImportWareHouseData);
    const [isNotification, setIsNotificaton] = useState(notificationDataStore);

    const {
        listImportWareHouseData,
        listImportWareHouseSearchData,
        textSearch,
        notificationDataStore,
        dispatchGetListImportWareHouse,
        dispatchSearchImportListWareHouse,
        dispatchClearNotificationStore,
    } = useImportWareHouse();

    const onGetTextSearch = (data) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatchSearchImportListWareHouse(data);
        }, timeout);
    };
    const handleNavigateCart = () => {
        navigation.navigate("CreateProduct");
    };
    const isFocused = useIsFocused();

    const onOpenModalNoti = () => {
        setShowModalNoti(true);
        setTimeout(() => {
            setShowModalNoti(false);
        }, 1000 * 1.5);
    };
    const onOpentModal = (data) => {
        setShowModal(true);
        setOnData(data);
        setClear(false);
    };
    const closeModal = () => {
        setShowModal(false);
        setClear(true);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatchGetListImportWareHouse();
            setLoading(false);
        }, timeoutGet);
    }, [isFocused]);

    useMemo(() => {
        if (!listImportWareHouseSearchData?.length && textSearch?.length) {
            setIsEmptyList(true);
            return;
        }
        if (notificationDataStore) {
            setIsNotificaton(true);
            setShowModalNoti(true);
            setTimeout(() => {
                dispatchClearNotificationStore();
                setShowModalNoti(false);
                setIsNotificaton(false);
            }, 1000 * 1.5);
        }
        setIsEmptyList(false);
        if (listImportWareHouseSearchData?.length && textSearch?.length) {
            setListData(listImportWareHouseSearchData);
        } else if (!textSearch?.length) {
            setListData(listImportWareHouseData);
        }
        return;
    }, [
        textSearch,
        listImportWareHouseSearchData,
        listImportWareHouseData,
        notificationDataStore,
    ]);

    return (
        <>
            <HeaderSearchCommon {...props} onGetTextSearch={onGetTextSearch} />
            {!isShowModalNoti ? null : (
                <ToastNotificationCommon
                    Description={
                        isNotification
                            ? "Đã thêm thành công sản phẩm mới."
                            : "Đã cập nhật số lượng thành công."
                    }
                    Info="Thành công !!!"
                />
            )}
            {isEmptyList ? (
                <EmptyDataCommon />
            ) : (
                <CardProductCommon
                    data={listData}
                    {...props}
                    onShowModal={onOpentModal}
                />
            )}
            <UpdateOldProductModal
                onOpenModalNoti={onOpenModalNoti}
                isShowModal={isShowModal}
                closeModal={closeModal}
                onData={onData}
                isClear={isClear}
            />
            <LoadingCommon isOpen={isLoading} />
            <Fab
                size="lg"
                placement="bottom right"
                right={25}
                bottom={30}
                backgroundColor={"#0E6F64"}
                onPress={handleNavigateCart}
            >
                <Feather name="plus" size={24} color="#fff" />
                <Text color="#fff"></Text>
            </Fab>
        </>
    );
}
