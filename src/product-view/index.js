import { useEffect, useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Box, Fab, FabLabel, Text } from "@gluestack-ui/themed";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import CardProductCommon from "../component/card-product-common/index";
import EmptyDataCommon from "../component/empty-data-common/index";
import LoadingCommon from "../component/loading-common/index";
import ToastNotificationCommon from "../component/toast-notification-common/index";
import styles from "./style";
import { useCart, useListOrder, useProduct } from "../hook";
import DetailProductModal from "./detail-product-modal"
import { timeoutGet } from "../utils";
import { flatMap,constant } from "lodash";
import HeaderSearchCommon from "../component/header-search-common"

export default function ProductScreen(props) {
    const [isNotification, setIsNotification] = useState(false);
    const [isOpenModal ,setIsOpenModal ] = useState(false);
    const [product, setProduct] = useState({
        id: 0,
        name: '',
        quantity: 0,
        description: '',
        rootPrice: 0,
        floorPrice: 0,
        expiry: '',
        updateAt: '',
        unit: '',
        supply: '',
        origin: '',
        avatar: '',
        codeProduct: '',
        phoneNumber: ''
      });
    
    const onCloseModal = ()=>{
         setIsOpenModal(false);

    }
    const {dispatchClearNotificationStore,notification} = useListOrder();
    const [isEmptyList ,setIsEmptyList ] = useState(false);
    const {notificationData,listProductData, dispatchClearNotification, dispatchGetListProduct,dispatchSearchListProduct } = useProduct();
    const [listData,setListData] = useState (listProductData);
    const [isLoading , setLoading ] = useState(false);
    const handleNavigateCart =() => {
    }
    const {dispatchGetListCart, listCartData} = useCart ();
    const totalItemCart = useMemo(()=>{
        return listCartData.listProduct.length;
    },[listCartData.listProduct])
    const isFocused  = useIsFocused();
    useEffect(()=>{
        if (notification == false || notificationData == false) {
            dispatchGetListProduct();
            dispatchGetListCart();
        }
        else{
            setLoading(true);
            setTimeout(()=>{
                dispatchGetListProduct();
                dispatchGetListCart();
                setLoading(false)
            },timeoutGet)
        }
    }
    )
    useMemo(()=>{
        if (notificationData ==true) {
            setIsNotification(true);
            setTimeout(()=>{
                setIsNotification(false);
                dispatchClearNotification()
            },1500)
        }
        if (notification == true) {
            setIsNotification(true);
            setTimeout(()=>
            {
                setIsNotification(false);
                dispatchClearNotificationStore();
            },1500)
            setIsEmptyList (false)
        }
    })
    function onGetTextSearch(data) {
        setLoading(true);
        setTimeout(() => {
            dispatchSearchListProduct(data),
            setLoading(false)
        }, constant.timeout)
    }
    return (
        
        <>
        {isNotification === false ? null : <ToastNotificationCommon 
        Description = {Info= notification == true ? "Vui lòng vào màn Danh sách yêu cầu để xem chi tiết.": "Vui lòng vào giỏ hàng để xem chi tiết."}
        Info = {isNotification==true?"Đã tạo đơn hàng thành công.":" Thêm vào giỏ hàng thành công."}
        />}
        {isEmptyList === false ? <EmptyDataCommon /> : <CardProductCommon data = {listData } {...props.ProductScreen}/>}
            <HeaderSearchCommon />
            <ToastNotificationCommon />
            <EmptyDataCommon />
            <CardProductCommon />
            <LoadingCommon isOpen = {isLoading} />
            <Fab size="lg" placement="bottom right" right={25} bottom={30}
                backgroundColor={"#0E6F64"} onPress={()=>handleNavigateCart()} >
                <Feather name="shopping-cart" size={24} color="#fff" marginRight={5} />
                <FabLabel>Giỏ hàng</FabLabel>
                <Box style={styles.cartIcon}>
                    <Text color="#fff">{totalItemCart ? totalItemCart : 0}</Text>
                </Box>
            </Fab>
            <DetailProductModal isOpen = {isOpenModal} product = {product} closeModal={onCloseModal}/>
        </>
    )
}
