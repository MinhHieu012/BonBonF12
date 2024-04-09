import { useEffect, useMemo, useState } from "react";


import { Feather } from "@expo/vector-icons";
import { Box, Fab, FabLabel, Text } from "@gluestack-ui/themed";
import { useIsFocused, useNavigation } from "@react-navigation/native";


import { CardProductCommon, EmptyDataCommon, HeaderSearchCommon, LoadingCommon, ToastNotificationCommon } from "../component";
import { useCart, useListOrder, useProduct } from "../hook";
import { timeout, timeoutGet } from "../utils";
import DetailProductModal from "./detail-product-modal";
import { styles } from "./style";


export default function ProductScreen(props) {
    const {
        notificationData,
        listProductData,
        listProductSearchData,
        textSearch,
        dispatchClearNotification,
        dispatchGetListProduct,
        dispatchSearchListProduct,
    } = useProduct();
    const { dispatchGetListCart, listCartData } = useCart();

    const { dispatchClearNotificationStore, notification } = useListOrder();
    const totalItemCart = useMemo(() => listCartData ? listCartData.length : 0, [listCartData])
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isEmptyList, setIsEmptyList] = useState(false);
    const [listData, setListData] = useState(listProductData);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        id: 0,
        name: "",
        quantity: 0,
        description: "",
        rootPrice: 0,
        floorPrice: 0,
        expiry: "",
        updateAt: "",
        unit: "",
        supply: "",
        origin: "",
        avatar: "",
        codeProduct: "",
        phoneNumber: "",
    });

    const onGetTextSearch = (data) => {
        setLoading(true);
        setTimeout(() => {
            dispatchSearchListProduct(data);
            setLoading(false);
        }, timeout);
    };
    const onOpenDetailProductModal = (data) => {
        setProduct(data);
        setIsOpenModal(true);
    };

    const onCloseModal = () => {
        setIsOpenModal(false);
    };

    const handleNavigateCart = () => {
        navigation.navigate("CartScreen");
    };

    useEffect(() => {
        //notification không có trong code design
        // Đổi điều kiện thành true
        if (isNotification == true || notificationData == true) {
            dispatchGetListProduct();
            dispatchGetListCart();
        } else {
            setLoading(true);
            setTimeout(() => {
                dispatchGetListProduct();
                dispatchGetListCart();
                setLoading(false);
            }, timeoutGet);
        }
    }, [isFocused]);

    useMemo(() => {
        if (!listProductSearchData?.length && textSearch?.length) {
            setIsEmptyList(true);
            return;
        }
        if (notificationData) {
            setIsNotification(true);
            setTimeout(() => {
                setIsNotification(false);
                dispatchClearNotification();
            }, 1000 * 1.5);
        }
        if (notification) {
            setIsNotification(true);
            setTimeout(() => {
                setIsNotification(false);
                dispatchClearNotificationStore();
            }, 1000 * 1.5);
        }
        setIsEmptyList(false);
        if (listProductSearchData?.length && textSearch?.length) {
            setListData(listProductSearchData);
        } else if (!textSearch?.length) {
            setListData(listProductData);
        }
    }, [textSearch, listProductSearchData, listProductData, notificationData, notification]);

    return (
        <>
            <HeaderSearchCommon {...props} onGetTextSearch={onGetTextSearch} />
            {!isNotification ? null : (
                <ToastNotificationCommon
                    Info={notification ? "Đã tạo đơn hàng thành công." : "Thêm vào giỏ hàng thành công."}
                    Description={notification ? "Vui lòng vào màn Danh sách yêu cầu để xem chi tiết." : "Vui lòng vào giỏ hàng để xem chi tiết."}
                />
            )}
            {isEmptyList ? (
                <EmptyDataCommon />
            ) : (
                <CardProductCommon
                    data={listData}
                    {...props}
                    onShowModal={(data) => {
                        onOpenDetailProductModal(data);
                    }}
                />
            )}
            <LoadingCommon isOpen={isLoading} />
            <Fab size="lg" placement="bottom right" right={25} bottom={30} backgroundColor={"#0E6F64"} onPress={handleNavigateCart}>
                <Feather name="shopping-cart" size={24} color="#fff" marginRight={5} />
                <FabLabel>Giỏ hàng</FabLabel>
                <Box style={styles.cartIcon}>
                    <Text color="#fff">{totalItemCart}</Text>
                </Box>
            </Fab>
            <DetailProductModal
                isOpen={isOpenModal}
                closeModal={() => {
                    onCloseModal();
                }}
                product={product}
                changePrice={() => {
                    changePrice();
                }}
            ></DetailProductModal>
        </>
    );
}