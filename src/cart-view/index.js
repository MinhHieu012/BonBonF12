import { AntDesign } from "@expo/vector-icons";
import { Box, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { cloneDeep, isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { HeaderBackCommon, ToastNotificationCommon, TotalPriceCommon } from "../component";
import { useCart, useListOrder, useProduct } from "../hook";
import { shipPrice, timeoutGet } from "../utils";
import ConfirmOderCreationModal from "./confirm-order-creation-modal";
import DeleteProductModal from "./delete-product-modal";
import SearchCustomerModal from "./search-customer-modal";
import styles from "./style";
import SwipeList from "./swipe-list";

let listCartProduct = [];

export default function CartScreen() {
    const navigate = useNavigation();
    const { listCartData, dispatchGetListCart, dispatchUpdateCart } = useCart();
    const { listProductData } = useProduct();
    const { dispatchCreateOder, listOrderData } = useListOrder();
    const [listLocalProduct, setListLocalProduct] = useState([]);
    const [isClearTextSearch, setClearTextSearch] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [isNotification, setNotification] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isDeleteAll, setIsDeleteAll] = useState(false);
    const [isOpenModalCreateOrder, setIsOpenModalCreateOrder] = useState(false);
    const [isValidateDataCart, setIsValidateDataCart] = useState(false);
    const [cartCustomer, setCartCustomer] = useState({});
    const [productDelete, setProductDelete] = useState({
        index: 0,
        productName: "Default Name Product",
    });

    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [arrCodeProduct, setArrCodeProduct] = useState([]);

    const listProductSwipe = useMemo(
        () =>
            listLocalProduct.map((item, index) => {
                return { ...item, key: index + 1 };
            }),
        [listLocalProduct]
    );

    useMemo(() => {
        if (listCartData.customer) {
            setCartCustomer(listCartData.customer);
        }
    }, [listCartData.customer]);

    useEffect(() => {
        dispatchGetListCart();
    }, []);

    useEffect(() => {
        if (listCartData.listProduct.length > 0) {
            setListLocalProduct(listCartData.listProduct);
        }
        getDataValidate();
    }, [listCartData.listProduct]);

    useEffect(() => {
        getDataValidate();
    }, [listLocalProduct]);

    const updateCartCurrentData = (data) => {
        listCartProduct[data.index].isSalePrice = data.isSalePrice;
        listCartProduct[data.index].salePrice = data.salePrice;
        listCartProduct[data.index].currentQuantity = data.quantity;
        updateDataValidate(data);
        matchTotalPrice();
    };

    const mergeDataProductChange = () => {
        const clonedProductData = cloneDeep(listLocalProduct);
        clonedProductData.forEach((_itemClone, indexClone) => {
            listCartProduct.forEach((item, index) => {
                if (indexClone === index) {
                    clonedProductData[indexClone].isSalePrice = item.isSalePrice;
                    clonedProductData[indexClone].quantity = item.currentQuantity;
                    clonedProductData[indexClone].salePrice = item.salePrice;
                }
            });
        });
        return clonedProductData;
    };

    const deleteCartCurrentData = (productIndex) => {
        if (isDeleteAll) {
            setListLocalProduct([]);
        } else {
            const filterProductData = listLocalProduct.filter((_item, index) => productIndex !== index);
            setListLocalProduct(filterProductData);
        }
    };

    const closeCreateOderModal = () => {
        setIsOpenModalCreateOrder(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModal(false);
    };

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const onOpenDeleteProductModal = (data, rowMap) => {
        setProductDelete({ index: data.index, productName: data.item.name });
        setIsDeleteModal(true);
        setIsDeleteAll(false);
        closeRow(rowMap, data.item.key);
    };

    const onOpenDeleteAllModal = () => {
        setIsDeleteAll(true);
        setIsDeleteModal(true);
    };

    const submitDeleteProduct = () => {
        deleteCartCurrentData(productDelete.index);
        setIsDeleteModal(false);
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 1000 * 1.5);
    };

    const onBack = () => {
        const dataToStore = mergeDataProductChange();
        dispatchUpdateCart({
            id: listCartData.id,
            customer: cartCustomer,
            listProduct: dataToStore,
        });
        navigate.navigate("ProductScreen");
    };

    const toggleSearchCustomerModal = () => {
        setShowModal(!isShowModal);
        setClearTextSearch(!isClearTextSearch);
    };

    const onChooseCustomer = (data) => {
        setCartCustomer(data);
        setShowModal(false);
    };
    const matchTotalPrice = () => {
        if (listCartProduct.length > 0) {
            const totalPrice = listCartProduct.reduce((sum, item) => {
                let sumPriceProduct;
                if (item.isSalePrice) {
                    sumPriceProduct = (item.floorPrice + item.salePrice) * item.currentQuantity;
                } else {
                    sumPriceProduct = (item.floorPrice - item.salePrice) * item.currentQuantity;
                }
                return sum + sumPriceProduct;
            }, shipPrice);
            setCartTotalPrice(totalPrice);
        } else {
            setCartTotalPrice(0);
        }
    };

    const getDataValidate = () => {
        listCartProduct = listLocalProduct.map((item, index) => {
            for (let i in listProductData) {
                if (listProductData[i].codeProduct === item.codeProduct) {
                    return {
                        index,
                        ...item,
                        quantity: listProductData[i].quantity,
                        currentQuantity: item.quantity,
                        isValidateMaxQuantity: false,
                        isValidateMinQuantity: false,
                        isValidateSalePrice: false,
                    };
                }
            }
        });
        getListCodeProductCart();
        matchTotalPrice();
    };

    const updateDataValidate = (data) => {
        setIsValidateDataCart(false);
        listCartProduct?.forEach((item, index) => {
            if (item.index === data.index) {
                listCartProduct[index].currentQuantity = data.quantity;
                listCartProduct[index].salePrice = data.salePrice;
            }
        });
    };

    const getListCodeProductCart = () => {
        const arrCode = listCartProduct?.map((item) => item.codeProduct);
        let removeDuplicateCode = arrCode.filter((value, index) => arrCode.indexOf(value) === index);
        setArrCodeProduct(removeDuplicateCode);
    };

    const checkValidateQuantity = () => {
        const arrCheckQuantity = [];
        arrCodeProduct.forEach((codeProduct) => {
            const totalQuantity = listCartProduct.reduce((total, item) => {
                if (item.codeProduct === codeProduct) {
                    return total + item.currentQuantity;
                }
                return total;
            }, 0);
            listCartProduct.forEach((item, index) => {
                if (item.codeProduct === codeProduct) {
                    listCartProduct[index].isValidateMinQuantity = listCartProduct[index].currentQuantity === 0;
                    listCartProduct[index].isValidateMaxQuantity = totalQuantity > item.quantity;
                    if (totalQuantity > item.quantity || listCartProduct[index].currentQuantity === 0) {
                        arrCheckQuantity.push(codeProduct);
                    }
                }
            });
        });
        return arrCheckQuantity;
    };

    const checkValidateSalePrice = () => {
        const arrCheckSalePrice = [];
        listCartProduct.forEach((item, index) => {
            if (!item.isChange) {
                listCartProduct[index].isValidateSalePrice = item.salePrice > item.floorPrice * 0.1;
                if (listCartProduct[index].isValidateSalePrice) {
                    arrCheckSalePrice.push(index);
                }
            }
        });
        return arrCheckSalePrice;
    };

    const onPressCreateOrder = () => {
        const arrCheckSalePrice = checkValidateSalePrice();
        const arrCheckQuantity = checkValidateQuantity();
        if (arrCheckSalePrice.length || arrCheckQuantity.length) {
            setIsValidateDataCart(true);
        } else {
            setIsOpenModalCreateOrder(true);
        }
    };

    const confirmCreateOrderModal = () => {
        closeCreateOderModal();
        dispatchCreateOder({
            cartTotalPrice: cartTotalPrice,
            customer: cartCustomer,
            listProduct: listCartProduct,
        })
        setTimeout(() => {
            navigate.navigate("ProductScreen");
        }, timeoutGet);

    };
    return (
        <SafeAreaView style={styles.container}>
            <Box style={styles.boxHeaderBack}>
                <HeaderBackCommon isDeleteAll={!isEmpty(listCartProduct)} onDeleteAll={onOpenDeleteAllModal} onBack={onBack} />
            </Box>
            {!isNotification ? null : (
                <ToastNotificationCommon
                    Info="Xóa thành công!!!!"
                    Description={isDeleteAll ? "Đã xóa tất cả sản phẩm" : `Đã xóa sản phẩm ${productDelete.productName}`}
                />
            )}
            <SwipeList
                listProductSwipe={listProductSwipe}
                updateCartCurrentData={updateCartCurrentData}
                listCartProduct={listCartProduct}
                isValidateDataCart={isValidateDataCart}
                onOpenDeleteProductModal={onOpenDeleteProductModal}
            />
            <SearchCustomerModal
                isShowModal={isShowModal}
                onChooseCustomer={onChooseCustomer}
                CloseModal={toggleSearchCustomerModal}
                isClearTextSearch={isClearTextSearch}
            />
            <DeleteProductModal
                isOpen={isDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={submitDeleteProduct}
                isDeleteAll={isDeleteAll}
                productName={productDelete.productName}
            />
            <ConfirmOderCreationModal isOpen={isOpenModalCreateOrder} onClose={closeCreateOderModal} onConfirm={confirmCreateOrderModal} />
            {listProductSwipe.length === 0 ? (
                <VStack alignItems="center" marginBottom={"60%"}>
                    <AntDesign name="warning" size={54} color="#ccc" />
                    <Text marginTop={"5%"} size="md">
                        Không có sản phẩm nào!
                    </Text>
                </VStack>
            ) : (
                <></>
            )}
            <TotalPriceCommon
                customer={cartCustomer}
                isButton={true}
                totalPrice={cartTotalPrice}
                onOpenModalSearchCustomer={toggleSearchCustomerModal}
                onPressCreateOrder={onPressCreateOrder}
                isDisableCreateCart={isEmpty(listCartProduct) || isEmpty(cartCustomer)}
            />
        </SafeAreaView>
    );
}