import { useEffect, useMemo, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { Fab, Text } from "@gluestack-ui/themed"
import { CardProductCommon, EmptyDataCommon, HeaderSearchCommon, LoadingCommon, ToastNotificationCommon } from "../component"
import { useImportWareHouse } from "../hook"
import { timeout, timeoutGet } from "../utils"
import UpdateOldProductModal from './update-old-product-modal'

export default function ImportWarehouseScreen(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const { listOrderSearchData, textSearch, dispatchSearchListOrder } = useListOrder();
    const { listImportWareHouseData, dispatchGetListImportWareHouse } = useImportWareHouse()
    const [listData, setListData] = useState(listImportWareHouseData)
    const [isLoading, setLoading] = useState(false)
    const [isEmptyList, setIsEmptyList] = useState(false)

    const handleNavigateCart = () => {
        navigation.navigate("CreateProduct")
    }
    const [isShowModal, setShowModal] = useState(false)
    const [onData, setOnData] = useState('')
    const [isClear, setClear] = useState(false)
    const closeModal = () => {
        setShowModal(false)
        setClear(true)
    }
    const onOpenModalNoti = () => {
        setShowModal(true)
        setTimeout(setShowModal(false), 1500)
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(async () => {
            await dispatchGetListImportWareHouse()
            setLoading(false)
        })
    }, [isFocused])

    useMemo(() => {
        if (listWareHouseSearchData.length === 0) {
            setIsEmptyList(true)
        }
        return;
    }, [listWareHouseData])

    function onGetTextSearch(data) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatchSearchImportListWareHouse(data);
        }, timeout);

        useMemo(() => {
            if (textSearch && listOrderSearchData.length === 0) {
                setIsEmptyList(true);
            }
            setIsEmptyList(false);
            if (textSearch && listOrderSearchData.length !== 0) {
                setListData(listOrderSearchData);
            } else {
                setListData(listOrderData);
            }
        }, [textSearch, listOrderSearchData, listOrderData]);
    }

    return (
        <>
            <HeaderSearchCommon
                onGetTextSearch={onGetTextSearch} />
            <ToastNotificationCommon Info="Thành công !!!" />
            <EmptyDataCommon />
            <CardProductCommon />
            <UpdateOldProductModal />
            <LoadingCommon
                isOpen={isLoading} />
            <Fab
                size="lg"
                placement="bottom right"
                right={25}
                bottom={30}
                backgroundColor={"#0E6F64"}>
                <Feather
                    name="plus"
                    size={24}
                    color="#fff"
                />
                <Text color="#fff" onOpenModalNoti={onOpenModalNoti}
                    isShowModal={isShowModal}
                    closeModal={closeModal}
                    onData={onData}
                    isClear={isClear}></Text>
            </Fab>
            {isEmptyList ? (
                <EmptyDataCommon />
            ) : (
                <FlatListOrderCommon data={listData} />
            )}
        </>
    )
}



