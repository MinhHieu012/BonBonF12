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
import { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from "react-native";

import { useProduct } from "../../hook";
import { numbericRegex } from "../../utils";
import { color } from "../../utils";
import { textConst } from "../../utils/constants";
import { formatMoney } from "../../utils/format";
import { styles } from "./style";

const DetailProductModal = (props) => {
  const { isOpen, closeModal, product } = props;
  const { dispatchCreateItemProduct } = useProduct();
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
    salePrice: false,
  };

  const [isDisableButtonSalePrice, setDisableButtonSalePrice] = useState(true);
  const [productEdit, setProductEdit] = useState({ ...productEditInitial });
  const [validate, setValidate] = useState({ ...initialValidate });
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProductEdit({
        ...productEdit,
        floorPrice: `${product.floorPrice}`,
      });
    }
  }, [isOpen]);

  const onCheckDisable = (value) => {
    setProductEdit({
      ...productEdit,
      salePrice: `${value.replace(numbericRegex, "")}`,
    });
    if (!value || Number(value) === 0) {
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

  const checkValidOfInput = (numbers, type) => {
    switch (type) {
      case "floorPrice":
        {
          const isInputPriceMoreFloorPrice =
            parseInt(numbers.replace(numbericRegex, "")) >
            product.floorPrice * 1.1;
          const isInputPriceLowerFloorPrice =
            parseInt(numbers.replace(numbericRegex, "")) <
            product.floorPrice * 0.9;
          const isClearInputPrice = numbers == "";
          if (
            isInputPriceMoreFloorPrice ||
            isInputPriceLowerFloorPrice ||
            isClearInputPrice
          ) {
            setValidate({
              ...validate,
              floorPrice: true,
            });
          } else {
            setValidate({
              ...validate,
              floorPrice: false,
            });
          }
        }
        break;
      case "salePrice":
        {
          const isOverSalePrice =
            parseInt(numbers.replace(numbericRegex, "")) >
            parseInt(productEdit.floorPrice) * 0.1;
          if (isOverSalePrice) {
            setValidate({
              ...validate,
              salePrice: true,
            });
          } else {
            setValidate({
              ...validate,
              salePrice: false,
            });
          }
        }
        break;
      case "quantity":
        {
          const isQuantityMoreOverWareHouse =
            parseInt(numbers.replace(numbericRegex, "")) > product.quantity;
          const isQuantityEqualZero =
            parseInt(numbers.replace(numbericRegex, "")) == 0;
          const isRemoveAllInputValue = numbers == "";
          if (
            isQuantityMoreOverWareHouse ||
            isQuantityEqualZero ||
            isRemoveAllInputValue
          ) {
            setValidate({
              ...validate,
              quantity: true,
            });
          } else {
            setValidate({
              ...validate,
              quantity: false,
            });
          }
        }
        break;
      default:
        break;
    }
  };

  const formatNumber = (value, type) => {
    switch (type) {
      case "floorPrice":
        {
          setProductEdit({
            ...productEdit,
            floorPrice: `${value.replace(numbericRegex, "")}`,
          });
          checkValidOfInput(value, type);
        }
        break;
      case "quantity":
        {
          setProductEdit({
            ...productEdit,
            quantity: `${value.replace(numbericRegex, "")}`,
          });
          checkValidOfInput(value, type);
        }
        break;
      case "salePrice":
        {
          checkValidOfInput(value, type);
          onCheckDisable(value);
        }
        break;
      default:
        break;
    }
  };

  const onChangeIsSale = () => {
    setProductEdit({
      ...productEdit,
      isSalePrice: !productEdit.isSalePrice,
    });
  };

  const checkValidate = () => {
    const arrValidationStatus = [
      validate.floorPrice,
      validate.quantity,
      validate.salePrice,
    ];
    const isAllInValid = arrValidationStatus.some((status) => status);
    if (isAllInValid) {
      setValidate({
        ...validate,
        hasError: true,
      });
    }
    return isAllInValid;
  };

  const onAddToCart = () => {
    if (productEdit.quantity.replace(numbericRegex, "") > product.quantity) {
      setValidate({
        ...validate,
        quantity: true,
        hasError: true,
      });
    } else {
      if (!checkValidate()) {
        let itemProduct = {
          name: product.name,
          quantity: parseInt(productEdit.quantity),
          floorPrice: parseInt(productEdit.floorPrice),
          unit: product.unit,
          avatar: product.avatar,
          codeProduct: product.codeProduct,
          isChange: false,
          salePrice: parseInt(productEdit.salePrice),
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
    return (
      <View style={[styles.list, !isOpenCollapse ? styles.hidden : undefined]}>
        <VStack>
          <Text marginBottom={10} bold>
            Mô tả ngắn:
          </Text>
          <Text marginBottom={20}>{product.product.description}</Text>
        </VStack>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal isOpen={isOpen}>
          <ModalBackdrop
            onPress={() => {
              onCloseModal();
            }}
          />
          <ModalContent
            bgColor="white"
            width={Dimensions.get("window").width * 0.94}
          >
            <VStack style={styles.container}>
              <HStack style={styles.content}>
                <Box width={"52%"} height={"90%"}>
                  <Image
                    style={styles.image}
                    alt="anh"
                    source={{ uri: product.avatar }}
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
                    lineHeight={11}
                    fontSize={10}
                    color={color.gray}
                  >
                    Tồn kho: {product.quantity}
                  </Text>
                  <Input
                    justifyContent="center"
                    alignItems="center"
                    style={styles.input}
                    isInvalid={
                      validate.hasError && validate.floorPrice ? true : false
                    }
                  >
                    <Text style={styles.textInput}> Sửa giá:</Text>
                    <InputField
                      placeholder={formatMoney(product.floorPrice)}
                      onChangeText={(value) => {
                        formatNumber(value, "floorPrice");
                      }}
                      height={30}
                      keyboardType="numeric"
                      size="30"
                      value={formatMoney(productEdit.floorPrice)}
                    ></InputField>
                  </Input>
                  <FormControlErrorText
                    fontSize={10}
                    display={
                      validate.hasError && validate.floorPrice ? "flex" : "none"
                    }
                  >
                    {parseInt(productEdit.floorPrice) < product.floorPrice * 0.9
                      ? textConst.VALIDATE_LOWER_SALE_PRICE
                      : textConst.VALIDATE_EDIT_PRICE}
                  </FormControlErrorText>
                  <Input
                    value={2000}
                    justifyContent="space-between"
                    style={styles.input}
                    isInvalid={
                      validate.hasError && validate.salePrice ? true : false
                    }
                  >
                    <Button
                      isDisabled={isDisableButtonSalePrice}
                      onPress={() => {
                        onChangeIsSale();
                      }}
                      bgColor={
                        productEdit.isSalePrice
                          ? color.darkGreen
                          : color.plumRed
                      }
                    >
                      <AntDesign
                        bold
                        name={productEdit.isSalePrice ? "plus" : "minus"}
                        size={12}
                        color="white"
                      />
                    </Button>
                    <InputField
                      height={30}
                      size="30"
                      placeholder="0"
                      bold
                      keyboardType="numeric"
                      onChangeText={(value) => formatNumber(value, "salePrice")}
                      value={formatMoney(productEdit.salePrice)}
                    ></InputField>
                  </Input>
                  <FormControlErrorText
                    fontSize={10}
                    display={
                      validate.hasError && validate.salePrice ? "flex" : "none"
                    }
                  >
                    {textConst.VALIDATE_SALE_PRICE_MODAL}
                  </FormControlErrorText>
                  <Input
                    justifyContent="center"
                    style={styles.input}
                    isInvalid={
                      validate.hasError && validate.quantity ? true : false
                    }
                  >
                    <Text style={styles.textInput}> Số lượng: </Text>
                    <InputField
                      placeholder="1"
                      onChangeText={(value) => formatNumber(value, "quantity")}
                      value={formatMoney(productEdit.quantity)}
                      keyboardType="numeric"
                      height={30}
                      size="30"
                    ></InputField>
                  </Input>
                  <FormControlErrorText
                    fontSize={10}
                    display={
                      validate.hasError && validate.quantity ? "flex" : "none"
                    }
                  >
                    {productEdit.quantity == "" || productEdit.quantity == "00"
                      ? textConst.VALIDATE_ZERO_QUANTITY
                      : textConst.VALIDATE_QUANTITY_MODAL}
                  </FormControlErrorText>
                </VStack>
              </HStack>
              <DetailCollapse product={product} />
              <ButtonGroup style={styles.groupButton}>
                <Button
                  borderRadius={20}
                  alignItems="center"
                  width={"35%"}
                  bgColor={color.blueSky}
                  onPress={onViewDetail}
                >
                  {!isOpenCollapse ? (
                    <Text style={styles.text}>
                      Xem chi tiết<Text> </Text>
                    </Text>
                  ) : (
                    <Text style={styles.text}>
                      Thu gọn<Text> </Text>
                    </Text>
                  )}
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
                  onPress={() => {
                    onCloseModal();
                  }}
                  borderRadius={20}
                  width={"28%"}
                  bgColor={color.plumRed}
                >
                  <Text style={styles.text} color={"white"}>
                    Hủy
                  </Text>
                </Button>
                <Button
                  borderRadius={20}
                  width={"32%"}
                  bgColor={color.darkGreen}
                  onPress={() => {
                    onAddToCart();
                  }}
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
    </KeyboardAvoidingView>
  );
};
export default DetailProductModal;
