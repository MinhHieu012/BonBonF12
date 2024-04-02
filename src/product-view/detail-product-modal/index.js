import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
    Box,
    Button,
    ButtonGroup,
    FormControlErrorText,
    HStack,
    Image,
    Input,
    InputField,
    KeyboardAvoidingView,
    Modal,
    ModalBackdrop,
    ModalContent,
    Text,
    VStack,
    View,
} from "@gluestack-ui/themed";
import {
    Dimensions,
    Keyboard,
    LayoutAnimation,
    TouchableWithoutFeedback,
} from "react-native";
import styles from "./style";
import { color } from "../../utils";
import { textConst, numbericRegex } from "../../utils/constants";
import { formatMoney } from "../../utils/format";
import useProduct from "../../hook/useProduct";
import { useState, useEffect } from "react";
const DetailProductModal = (props) => {
    const { isOpen, closeModal, product } = props;
    const dispatchCreateItemProduct = useProduct();
    const productEditInitial = {
        floorPrice: "",
        quantity: "1",
        salePrice: "0",
        isSalePrice: true,
    };
    const initialValidate = {
        hasError: false,
        floorPrice: false,
        quantity: false,
        salePrice: fasle,
    };
    const [isDisableButtonSalePrice, setDisableButtonSalePrice] = useState(true);
    const [productEdit, setProductEdit] = useState(productEditInitial);
    const [validate, setValidate] = useState(initialValidate);
    const [isOpenCollapse, setIsOpenCollapse] = useState(false);
    useEffect(() => { }, [isOpen]);
    const onCheckDisable = (value) => {
        setProductEdit({
            ...productEdit,
            salePrice: value.replace(numbericRegex, ""),
        });
        if (!value || parseInt(newSalePrice) === 0) {
            setDisableButtonSalePrice(true);
        } else {
            setDisableButtonSalePrice(false);
        }
    };
    const resetData = () => {
        setDisableButtonSalePrice(true);
        setValidate({ ...initialValidate });
        setProductEdit({ ...productEditInitial });
        setIsOpenCollapse(false);
    };
    const onCloseModal = () => {
        resetData();
        closeModal();
    };
    const checkValidOfInput = (number, type) => {
        const numberValue = parseInt(number);
        switch (type) {
            case "floorPrice":
                if (
                    !numberValue ||
                    numberValue < 0.9 * product.floorPrice ||
                    numberValue > 1.1 * product.floorPrice
                )
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        floorPrice: true,
                    }));
                else
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        floorPrice: false,
                    }));
                break;
            case "salePrice":
                if (number > 0.1 * productEdit.floorPrice)
                    setValidate((prevValidate) => ({ ...prevValidate, salePrice: true }));
                else
                    setValidate((prevValidate) => ({
                        ...prevValidate,
                        salePrice: false,
                    }));
                break;
            case "quantity":
                if (number > product.quantity || number === 0 || !number)
                    setValidate((prevValidate) => ({ ...prevValidate, quantity: true }));
                else
                    setValidate((prevValidate) => ({ ...prevValidate, quantity: false }));
                break;
            default:
                break;
        }
    };

    const formatNumber = (value, type) => {
        switch (type) {
            case "floorPrice":
                setProductEdit((prevState) => ({
                    ...prevState,
                    floorPrice: `${value.replace(numbericRegex, "")}`,
                }));
                checkValidOfInput(value, type);
                break;
            case "quantity":
                setProductEdit((prevState) => ({
                    ...prevState,
                    quantity: `${value.replace(numbericRegex, "")}`,
                }));
                checkValidOfInput(value, type);
                break;
            case "salePrice":
                checkValidOfInput(value, type);
                onCheckDisable(value);
                break;
            default:
                break;
        }
    };

    const onChangeIsSale = () => {
        setProductEdit((prevState) => ({
            ...prevState,
            isSalePrice: !prevState.isSalePrice,
        }));
    };

    const checkValidate = () => {
        const validationArray = [
            validate.floorPrice,
            validate.quantity,
            validate.salePrice,
        ];
        const hasError = validationArray.some((value) => value === false);
        setValidate({ ...validate, hasError: hasError });
        return hasError;
    };

    const onAddCart = () => {
        if (productEdit.quantity > product.quantity) {
            setValidate((prevState) => ({
                ...prevState,
                quantity: true,
                hasError: true,
            }));
        } else {
            if (!checkValidate()) {
                const itemProduct = {
                    name: product.name,
                    quantity: productEdit.quantity,
                    floorPrice: productEdit.floorPrice,
                    unit: product.unit,
                    avatar: product.avatar,
                    codeProduct: product.codeProduct,
                    isChange: false,
                    salePrice: productEdit.salePrice,
                    isSalePrice: productEdit.isSalePrice,
                };
                dispatchCreateItemProduct(itemProduct);
                onCloseModal();
            }
        }
    };

    const onViewDetail = () => {
        setIsOpenCollapse((value) => !value);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const DetailCollapse = (product) => {
        <View
            style={[
                styles.list,
                isOpenCollapse === false ? styles.hidden : undefined,
            ]}
        >
            <VStack>
                <Text marginBottom={10} bold>
                    Mô tả ngắn:
                </Text>
                <Text marginBottom={20}>{product.description}</Text>
            </VStack>
        </View>;
    };
    return (
        <>
            <TouchableWithoutFeedback>
                <Modal isOpen={isOpen}>
                    <ModalBackdrop onPress={() => onCloseModal()} />
                    <ModalContent
                        bgColor="white"
                        width={Dimensions.get("window").width * 0.94}
                    >
                        <VStack style={styles.container}>
                            <HStack style={styles.content}>
                                <Box width={"52%"} height={"90%"}>
                                    <Image
                                        source={{ uri: product.avatar }}
                                        style={styles.image}
                                        alt="anh"
                                    />
                                </Box>
                                <VStack style={styles.infor}>
                                    <Text
                                        height={18}
                                        lineHeight={20}
                                        fontSize={18}
                                        bold
                                        numberOfLines={1}
                                    >
                                        {product.name}
                                    </Text>
                                    <Text
                                        height={13}
                                        lineHeight={15}
                                        bold
                                        fontSize={14}
                                        color={color.plumRed}
                                    >
                                        {formatMoney(product.floorPrice)}
                                    </Text>
                                    <Text
                                        height={11}
                                        lineHeight={1}
                                        fontSize={10}
                                        color={color.gray}
                                    >
                                        Tồn kho: {product.quantity}
                                    </Text>
                                    <Input
                                        justifyContent="center"
                                        alignItems="center"
                                        style={styles.input}
                                    >
                                        <Text style={styles.textInput}>Sửa giá: </Text>
                                        <InputField
                                            height={30}
                                            keyboardType="numeric"
                                            size="30"
                                            onChangeText={(value) =>
                                                formatNumber(value, "floorPrice")
                                            }
                                            value={formatMoney(product.floorPrice)}
                                        >
                                            {formatMoney(product.floorPrice)}
                                        </InputField>
                                    </Input>
                                    {validate.hasError && validate.floorPrice && (
                                        <FormControlErrorText fontSize={10}>
                                            {productEdit.floorPrice < 0.9 * product.floorPrice
                                                ? textConst.VALIDATE_LOWER_SALE_PRICE
                                                : textConst.VALIDATE_EDIT_PRICE}
                                        </FormControlErrorText>
                                    )}
                                    <Input
                                        isInvalid={validate.hasError && validate.salePrice}
                                        value={2000}
                                        justifyContent="space-between"
                                        style={styles.input}
                                    >
                                        <Button
                                            isDisabled={isDisableButtonSalePrice}
                                            bgColor={
                                                productEdit.isSalePrice
                                                    ? color.darkGreen
                                                    : color.plumRed
                                            }
                                            onPress={() => onChangeIsSale()}
                                        >
                                            <AntDesign
                                                name={productEdit.isSalePrice ? "plus" : "minus"}
                                                boldsize={12}
                                                color="white"
                                            />
                                        </Button>
                                        <InputField
                                            value={formatMoney(productEdit.salePrice)}
                                            onChangeText={(value) => formatNumber(value, "salePrice")}
                                            height={30}
                                            size="30"
                                            placeholder="0"
                                            bold
                                            keyboardType="numeric"
                                        ></InputField>
                                    </Input>
                                    {validate.hasError && validate.salePrice && (
                                        <FormControlErrorText fontSize={10}>
                                            {textConst.VALIDATE_SALE_PRICE_MODAL}
                                        </FormControlErrorText>
                                    )}
                                    <Input
                                        isInvalid={validate.hasError && validate.quantity}
                                        justifyContent="center"
                                        style={styles.input}
                                    >
                                        <Text style={styles.textInput}>Số lượng:</Text>
                                        <InputField
                                            value={formatMoney(productEdit.quantity)}
                                            onChangeText={(value) => formatNumber(value, "quantity")}
                                            placeholder="1"
                                            keyboardType="numeric"
                                            height={30}
                                            size="30"
                                        ></InputField>
                                    </Input>
                                    {validate.hasError && validate.quantity && (
                                        <FormControlErrorText fontSize={10}>
                                            {productEdit.quantity === "" ||
                                                productEdit.quantity === "00"
                                                ? textConst.VALIDATE_ZERO_QUANTITY
                                                : textConst.VALIDATE_QUANTITY_MODAL}
                                        </FormControlErrorText>
                                    )}
                                </VStack>
                            </HStack>
                            <DetailCollapse product={product} />
                            <ButtonGroup style={styles.groupButton}>
                                <Button
                                    onPress={onViewDetail}
                                    borderRadius={20}
                                    alignItems="center"
                                    width={"35%"}
                                    bgColor={color.blueSky}
                                >
                                    {!isOpenCollapse ? "Xem chi tiết" : "Thu gọn"}
                                    <Ionicons
                                        name={
                                            isOpenCollapse
                                                ? "chevron-up-outline"
                                                : "chevron-down-outline"
                                        }
                                        size={18}
                                        color="white"
                                    />
                                </Button>
                                <Button
                                    onPress={onCloseModal}
                                    borderRadius={20}
                                    width={"28%"}
                                    bgColor={color.plumRed}
                                >
                                    <Text style={styles.text} color={"white"}>
                                        Hủy
                                    </Text>
                                </Button>
                                <Button
                                    onPress={onAddCart}
                                    borderRadius={20}
                                    width={"32%"}
                                    bgColor={color.darkGreen}
                                >
                                    <Text style={styles.text} color={"white"}>
                                        Thêm
                                    </Text>
                                </Button>
                            </ButtonGroup>
                        </VStack>
                    </ModalContent>
                </Modal>
            </TouchableWithoutFeedback>
        </>
    );
};
export default DetailProductModal;