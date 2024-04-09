import { useEffect, useState, useMemo, Children } from 'react'
import { Dimensions, View } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Box, Button, ButtonIcon, HStack, Image, Input, InputField, Text, VStack, FormControlErrorText } from '@gluestack-ui/themed'
import { color, formatMoney, textConst, formatMoneyStringToNumber } from '../../utils'
import styles from './style'
import { useIsFocused } from "@react-navigation/native";

export default function ProductCard({ data, index, onUpdateCart, validateData, isValidateDataCart }) {
    const [productUpdate, setProductUpdate] = useState({
        index: 0,
        isSalePrice: true,
        salePrice: 0,
        quantity: 0
    });
    const [sumPrice, setSumPrice] = useState(0);
    const [isDefaultData, setIsDefaultData] = useState(true)
    const isFocused = useIsFocused();
    useEffect(() => {
        setProductUpdate({
            index: index,
            isSalePrice: data.isSalePrice,
            salePrice: data.salePrice,
            quantity: data.quantity
        });
    }, [isFocused, data]);
    useMemo(() => {
        let newSumPrice;
        if (productUpdate.isSalePrice) {
            newSumPrice = (data.floorPrice + productUpdate.salePrice) * productUpdate.quantity;
        } else {
            newSumPrice = (data.floorPrice - productUpdate.salePrice) * productUpdate.quantity;
        }
        setSumPrice(newSumPrice);
    }, [productUpdate]);

    const onPressIsSalePrice = () => {
        setProductUpdate({
            ...productUpdate,
            isSalePrice: !productUpdate.isSalePrice
        });
        setIsDefaultData(false);
    }

    const handleCheckEmpty = (value) => {
        if (value === '' || parseFloat(value) < 0) {
            return 0;
        } else {
            return value;
        }
    }

    const onChangeInputQuantity = (data) => {
        const quantity = parseInt(handleCheckEmpty(data));

        setProductUpdate({
            ...productUpdate,
            quantity: quantity
        });
        setIsDefaultData(false);
        setIsShowValidateMaxQuantity(false)
        setIsShowValidateMinQuantity(false)
    }

    const onPressUpButton = () => {
        setProductUpdate({
            ...productUpdate,
            quantity: productUpdate.quantity + 1
        });
        setIsDefaultData(false);
        setIsShowValidateMaxQuantity(false)
        setIsShowValidateMinQuantity(false)
    }

    const onPressDownButton = () => {
        setProductUpdate({
            ...productUpdate,
            quantity: productUpdate.quantity - 1
        });
        setIsDefaultData(false);
        setIsShowValidateMaxQuantity(false)
        setIsShowValidateMinQuantity(false)
    }

    const onChangeInputSalePrice = (data) => {
        const newData = formatMoneyStringToNumber(data);
        if (newData === 0) {
            setProductUpdate({
                ...productUpdate,
                salePrice: parseInt(handleCheckEmpty(newData)),
                isSalePrice: true
            });
        } else {
            setProductUpdate({
                ...productUpdate,
                salePrice: parseInt(handleCheckEmpty(newData))
            });
        }
        setIsDefaultData(false);
        setIsShowValidateSalePrice(false)
    }

    useMemo(() => {
        if (!isDefaultData && !data.isChange) {
            onUpdateCart(productUpdate);
        }
    }, [productUpdate]);

    const [isShowValidateSalePrice, setIsShowValidateSalePrice] = useState(false);
    const [isShowValidateMaxQuantity, setIsShowValidateMaxQuantity] = useState(false);
    const [isShowValidateMinQuantity, setIsShowValidateMinQuantity] = useState(false);

    useEffect(() => {
        if (isValidateDataCart) {
            validateData.forEach((item) => {
                if (item.index === data.index) {
                    setIsShowValidateSalePrice(item.isValidateSalePrice);
                    setIsShowValidateMaxQuantity(item.isValidateMaxQuantity);
                    setIsShowValidateMinQuantity(item.isValidateMinQuantity);
                }
            });
        }
    }, [isValidateDataCart, validateData, data]);

    const showValidateSalePrice = useMemo(() => isShowValidateSalePrice && !data.isChange, [isShowValidateSalePrice, data.isChange]);
    const showValidateMaxQuantity = useMemo(() => isShowValidateMaxQuantity && !data.isChange, [isShowValidateMaxQuantity, data.isChange]);
    const showValidateMinQuantity = useMemo(() => isShowValidateMinQuantity && !data.isChange, [isShowValidateMinQuantity, data.isChange]);

    return (
        <>
            <HStack
                style={styles.contentCart}
                justifyContent="space-between" >
                <View
                    style={styles.boxImg} >
                    <Image
                        style={styles.imgProduct}
                        alt="Ảnh thuốc"
                        source={{ uri: data.avatar }} />
                </View>
                <VStack
                    style={styles.inforProduct}
                    justifyContent="center" >
                    <Text
                        size="md"
                        fontWeight="bold"
                        numberOfLines={1}
                        style={{ marginBottom: Dimensions.get('window').height * 0.0255 }}
                        color={color.blackName}
                        children={data.name} >
                    </Text>
                    <VStack>
                        <HStack
                            justifyContent="space-between"
                            style={{ marginBottom: Dimensions.get('window').height * 0.00505 }} >
                            <VStack>
                                <Text size="sm"
                                    color={color.blueSky}
                                    children={formatMoney(data.floorPrice)} >
                                </Text>
                                <Text size="xs"
                                    color={color.lightGrayCart}
                                    children={data.unit} >
                                </Text>
                            </VStack>
                            <VStack
                                justifyContent="space-between">
                                <Ionicons
                                    name="md-close"
                                    size={20}
                                    color={color.blueSky} />
                            </VStack>
                            <Box style={styles.inpQuantity}>
                                <Input
                                    width="75%"
                                    height={32}
                                    isDisabled={data.isChange}
                                    isInvalid={showValidateSalePrice} >
                                    <InputField
                                        keyboardType="number-pad"
                                        textAlign="center"
                                        size=""
                                        color={color.blueSky}
                                        value={productUpdate.quantity.toString()}
                                        onChangeText={onChangeInputQuantity} />
                                </Input>
                            </Box>
                            <Button
                                style={styles.btnUpdateQuantity}
                                size="xs"
                                isDisabled={data.isChange}
                                onPress={onPressUpButton} >
                                <ButtonIcon>
                                    <AntDesign
                                        name="caretup"
                                        size={13}
                                        color={color.blueSky} />
                                </ButtonIcon>
                            </Button>
                        </HStack>
                        <HStack
                            justifyContent="space-between"
                            alignItems="center" >
                            <Button
                                style={styles.btnSalePrice}
                                textAlign="center"
                                size="xs"
                                isDisabled={data.isChange || formatMoney(productUpdate.salePrice) === "0"}
                                onPress={onPressIsSalePrice}>
                                <FontAwesome
                                    size={15}
                                    name={productUpdate.isSalePrice ? "plus" : "minus"}
                                    color={productUpdate.isSalePrice ? color.darkGreen : color.plumRed} />
                            </Button>
                            <Input
                                style={styles.inpSalePrice}
                                isDisabled={data.isChange}
                                isInvalid={showValidateMaxQuantity || showValidateMinQuantity} >
                                <InputField
                                    keyboardType="number-pad"
                                    size="sm"
                                    lineHeight={17}
                                    color={productUpdate.isSalePrice ? 'color.darkGreen' : 'color.plumRed'}
                                    value={formatMoney(productUpdate.salePrice)}
                                    onChangeText={onChangeInputSalePrice} />
                            </Input>
                            <VStack justifyContent="center">
                                <Text
                                    textAlign="center"
                                    size={"sm"}
                                    color={color.plumRed}
                                    children={formatMoney(sumPrice)} >
                                </Text>
                            </VStack>
                            <Button
                                style={styles.btnUpdateQuantity}
                                size="xs"
                                isDisabled={data.isChange || productUpdate.quantity <= 1}
                                onPress={onPressDownButton} >
                                <ButtonIcon>
                                    <AntDesign
                                        name="caretdown"
                                        size={13}
                                        color={color.blueSky} />
                                </ButtonIcon>
                            </Button>
                        </HStack>
                    </VStack>
                    <FormControlErrorText
                        fontSize={10} style={{ display: showValidateMaxQuantity ? 'block' : 'none' }} >{textConst.VALIDATE_QUALITY_MAX}
                    </FormControlErrorText>
                    <FormControlErrorText
                        fontSize={10} style={{ display: showValidateMinQuantity ? 'block' : 'none' }} >{textConst.VALIDATE_QUALITY_MIN}
                    </FormControlErrorText>
                    <FormControlErrorText
                        fontSize={10} style={{ display: showValidateSalePrice ? 'block' : 'none' }} >{textConst.VALIDATE_EDIT_PRICE}
                    </FormControlErrorText>
                </VStack>
            </HStack>
        </>
    );
}