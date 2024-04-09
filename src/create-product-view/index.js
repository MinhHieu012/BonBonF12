import {
    Box,
    Button,
    Center,
    FabLabel,
    FormControlErrorText,
    HStack,
    Image,
    Input,
    InputField,
    KeyboardAvoidingView,
    Text,
    Textarea,
    TextareaInput,
    VStack,
} from "@gluestack-ui/themed";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";

import { HeaderBackCommon } from "../component";
import { useImportWareHouse, useListImageProduct, useProduct } from "../hook";
import { formatMoney, numbericRegex, textConst, color } from "../utils";
import ChooseImageProductModal from "./choose-image-product-modal";
import styles from "./style";

export default function CreateProductScreen() {
    const { dispatchCreateNewProduct } = useImportWareHouse();
    const {
        dispatchGetListImageProduct,
        listImageProductData,
        dispatchUpdateListImageProduct,
    } = useListImageProduct();
    const { listProductData, dispatchGetListProduct } = useProduct();

    const uriImg =
        "https://www.shutterstock.com/image-vector/photo-camera-vector-icon-600nw-1345025204.jpg";
    const initialProduct = {
        id: 0,
        name: "",
        quantity: "",
        description: "",
        rootPrice: "",
        floorPrice: "",
        expiry: "",
        unit: "",
        supply: "",
        origin: "",
        avatar: uriImg,
        codeProduct: "S00" + `${listProductData.length + 1}`,
        phoneNumber: "",
    };
    const initialValidate = {
        name: true,
        quantity: true,
        unit: true,
        avatar: true,
    };

    const [isShowModalChooseImg, setShowModalChooseImg] = useState(false);
    const [isOpenLabel, setIsOpentLabel] = useState(false);
    const [isCheckDisplay, setCheckDisplay] = useState(false);
    const [nameCheckInput, setNameCheckInput] = useState("");
    const [newProduct, setNewProduct] = useState({ ...initialProduct });
    const [validate, setValidate] = useState({ ...initialValidate });

    const refInput = useRef(null);
    const refInput2 = useRef(null);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        dispatchGetListProduct();
        dispatchGetListImageProduct();
    }, [isFocused]);

    useEffect(() => {
        if (nameCheckInput === "price") {
            refInput.current.focus();
        } else if (nameCheckInput === "quantity") {
            refInput2.current.focus();
        } else {
            setCheckDisplay(false);
        }
    }, [nameCheckInput]);

    const onToggleModalChooseImg = () => {
        setShowModalChooseImg(!isShowModalChooseImg);
    };
    const setStateAndCheckEmpty = (string, type, statusValidate) => {
        if (statusValidate === "checkValidate") {
            setValidate({
                ...validate,
                [type]: string !== "",
            });
        }
        setNewProduct({
            ...newProduct,
            [type]: string,
        });
    };

    const setStateAndFormat = (value, type, statusValidate) => {
        if (statusValidate === "checkValidate") {
            setValidate({
                ...validate,
                [type]: value !== "",
            });
        }
        if (type === "quantity") {
            if (parseInt(value.replace(numbericRegex, "")) > 999999) {
                setNewProduct({ ...newProduct });
            } else {
                setNewProduct({
                    ...newProduct,
                    [type]: value.replace(numbericRegex, ""),
                });
            }
        } else {
            setNewProduct({
                ...newProduct,
                [type]: value.replace(numbericRegex, ""),
            });
        }
    };

    const settingState = (value, type) => {
        switch (type) {
            case "name":
            case "unit":
                setStateAndCheckEmpty(value, type, "checkValidate");
                break;
            case "quantity":
                setStateAndFormat(value, type, "checkValidate");
                break;
            case "floorPrice":
            case "rootPrice":
                setStateAndFormat(value, type, "notCheckValidate");
                break;
            default:
                setStateAndCheckEmpty(value, type, "notCheckValidate");
                break;
        }
        return;
    };

    const handleSetImage = (data) => {
        setIsOpentLabel(true);
        setNewProduct({ ...newProduct, ...data });
        setValidate({ ...initialValidate });
        setShowModalChooseImg(false);
    };

    const handleNavigateProduct = () => {
        clearState();
        navigation.navigate("ImportWareHouseScreen");
    };

    const clearState = () => {
        setNewProduct({ ...initialProduct });
        setValidate({ ...initialValidate });
    };

    const checkValidate = () => {
        const arrValidData = [
            newProduct.name !== "",
            newProduct.quantity !== "",
            newProduct.unit !== "",
            newProduct.avatar !== uriImg,
        ];
        const isAnyInValid = arrValidData.some((status) => !status);

        setValidate({
            name: newProduct.name !== "",
            quantity: newProduct.quantity !== "",
            unit: newProduct.unit !== "",
            avatar: newProduct.avatar !== uriImg,
        });
        return isAnyInValid;
    };

    const handleCreate = () => {
        checkValidate();
        if (!checkValidate()) {
            let newProductToCart = {
                ...newProduct,
                quantity: parseInt(newProduct.quantity),
                rootPrice: parseInt(newProduct.rootPrice),
                floorPrice: parseInt(newProduct.floorPrice),
                avatar: newProduct.avatar,
                codeProduct: initialProduct.codeProduct,
            };
            dispatchCreateNewProduct(newProductToCart);
            dispatchUpdateListImageProduct(newProduct);
            clearState();
            navigation.navigate("ImportWareHouseScreen");
        }
    };

    const handleTakePhoto = () => {
        alert("Chức năng đang được hoàn thiện");
    };
    const checkFocus = (data) => {
        if (data) {
            setCheckDisplay(true);
            setNameCheckInput(data);
        }
    };
    return (
        <SafeAreaView style={styles.screen}>
            <HeaderBackCommon
                title={textConst.CREATE_PRODUCT}
                onBack={handleNavigateProduct}
            />
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss;
                    setNameCheckInput("");
                }}
            >
                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior={isCheckDisplay ? "null" : "position"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
                        style={{ flex: 1 }}
                    >
                        <VStack style={styles.container}>
                            <HStack style={styles.hstack_img}>
                                <Box style={styles.img}>
                                    <Image
                                        width={"100%"}
                                        height={"100%"}
                                        objectFit="contain"
                                        alt="Ảnh thuốc mới"
                                        source={newProduct.avatar ? newProduct.avatar : uriImg}
                                    ></Image>
                                    <Center>
                                        <FormControlErrorText
                                            fontSize={10}
                                            display={
                                                !validate.avatar && newProduct.avatar === uriImg
                                                    ? "flex"
                                                    : "none"
                                            }
                                        >
                                            {textConst.VALIDATE_IMPORT_IMAGE_PRODUCT}
                                        </FormControlErrorText>
                                    </Center>
                                </Box>

                                <VStack style={styles.vstack_right}>
                                    <VStack style={styles.vstack_input}>
                                        <Input style={styles.inputNearImg}>
                                            <Text style={styles.text_input}> Mã: </Text>
                                            <Text
                                                style={styles.text_input}
                                                marginLeft={10}
                                                lineHeight={14}
                                            >
                                                {initialProduct.codeProduct}
                                            </Text>
                                        </Input>
                                        <Input
                                            boderWidth="1.5"
                                            style={styles.inputNearImg}
                                            isDisabled={true}
                                        >
                                            <Text style={styles.text_input}> Giá bán:</Text>
                                            <InputField
                                                keyboardType="numeric"
                                                onChangeText={(value) =>
                                                    settingState(value, "floorPrice")
                                                }
                                                value={formatMoney(newProduct.floorPrice)}
                                                size="sm"
                                                bold
                                                lineHeight={16}
                                                color={color.plumRed}
                                                onFocus={() => checkFocus("price")}
                                                ref={refInput}
                                            ></InputField>
                                        </Input>
                                        <Input
                                            style={styles.inputNearImg}
                                            isInvalid={
                                                !validate.quantity && newProduct.quantity === ""
                                            }
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <Text style={styles.text_input}> SL tồn: (*)</Text>
                                            <InputField
                                                keyboardType="numeric"
                                                onChangeText={(value) =>
                                                    settingState(value, "quantity")
                                                }
                                                value={formatMoney(newProduct.quantity)}
                                                size="sm"
                                                lineHeight={16}
                                                onFocus={() => checkFocus("quantity")}
                                                ref={refInput2}
                                            ></InputField>
                                        </Input>
                                        <FormControlErrorText
                                            fontSize={10}
                                            display={
                                                !validate.quantity && newProduct.quantity === ""
                                                    ? "flex"
                                                    : "none"
                                            }
                                        >
                                            {textConst.VALIDATE_IMPORT_QUANTITY}
                                        </FormControlErrorText>
                                    </VStack>
                                    <HStack style={styles.hstack_button}>
                                        <Button
                                            onPress={onToggleModalChooseImg}
                                            style={styles.btn_taiAnh}
                                        >
                                            <Text style={styles.text_btn}>Tải ảnh</Text>
                                        </Button>
                                        <Button
                                            onPress={handleTakePhoto}
                                            style={styles.btn_chupAnh}
                                        >
                                            <Text style={styles.text_btn}>Chụp ảnh</Text>
                                        </Button>
                                    </HStack>
                                </VStack>
                            </HStack>

                            <VStack style={styles.vstack_form_btn}>
                                <HStack style={styles.hstack_unit_HSD_Gia}>
                                    <VStack width={"100%"}>
                                        <FabLabel
                                            display={!isOpenLabel ? "none" : "flex"}
                                            color={"gray"}
                                            bold
                                            bgColor="white"
                                            height={15}
                                            size="sm"
                                            lineHeight={16}
                                            width={200}
                                        >
                                            {" "}
                                            Tên sản phẩm:
                                        </FabLabel>
                                        <Input
                                            width={"100%"}
                                            height={"100%"}
                                            alignItems="center"
                                            placeholder="Tên SP: (*)"
                                            isInvalid={!validate.name && newProduct.name === ""}
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <InputField
                                                onChangeText={(value) => settingState(value, "name")}
                                                size="sm"
                                                placeholder="Tên SP: (*)"
                                                height={"80%"}
                                                value={newProduct.name}
                                            ></InputField>
                                        </Input>
                                        <FormControlErrorText
                                            fontSize={10}
                                            display={
                                                !validate.name && newProduct.name === ""
                                                    ? "flex"
                                                    : "none"
                                            }
                                        >
                                            {textConst.VALIDATE_NAME_PRODUCT}
                                        </FormControlErrorText>
                                    </VStack>
                                </HStack>

                                <HStack style={styles.hstack_unit_HSD_Gia}>
                                    <VStack width={"43%"}>
                                        <FabLabel
                                            display={!isOpenLabel ? "none" : "flex"}
                                            color={"gray"}
                                            bold
                                            bgColor="white"
                                            height={14}
                                            size="sm"
                                            lineHeight={14}
                                            width={100}
                                        >
                                            {" "}
                                            Đơn vị:
                                        </FabLabel>
                                        <Input
                                            width={"100%"}
                                            height={"100%"}
                                            alignItems="center"
                                            isInvalid={!validate.unit && newProduct.unit === ""}
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <InputField
                                                size="sm"
                                                onChangeText={(value) => settingState(value, "unit")}
                                                placeholder="Đơn vị tính: (*)"
                                                value={newProduct.unit}
                                                height={"80%"}
                                            ></InputField>
                                        </Input>
                                        <FormControlErrorText
                                            fontSize={10}
                                            display={
                                                !validate.unit && newProduct.unit === ""
                                                    ? "flex"
                                                    : "none"
                                            }
                                        >
                                            {textConst.VALIDATE_UNIT}
                                        </FormControlErrorText>
                                    </VStack>
                                    <VStack width={"30%"}>
                                        <FabLabel
                                            display={!isOpenLabel ? "none" : "flex"}
                                            color={"gray"}
                                            bold
                                            bgColor="white"
                                            height={14}
                                            size="sm"
                                            lineHeight={14}
                                            width={100}
                                        >
                                            {" "}
                                            HSD:
                                        </FabLabel>
                                        <Input
                                            width={"100%"}
                                            alignItems="center"
                                            height={"100%"}
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <InputField
                                                onChangeText={(value) => settingState(value, "expiry")}
                                                size="sm"
                                                placeholder="HSD:"
                                                value={newProduct.expiry}
                                            ></InputField>
                                        </Input>
                                    </VStack>
                                    <VStack width={"25%"}>
                                        <FabLabel
                                            display={!isOpenLabel ? "none" : "flex"}
                                            color={"gray"}
                                            bold
                                            bgColor="white"
                                            height={14}
                                            size="sm"
                                            lineHeight={14}
                                            width={100}
                                        >
                                            {" "}
                                            Giá:
                                        </FabLabel>
                                        <Input
                                            width={"100%"}
                                            alignItems="center"
                                            height={"100%"}
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <InputField
                                                keyboardType="numeric"
                                                onChangeText={(value) =>
                                                    settingState(value, "rootPrice")
                                                }
                                                value={formatMoney(newProduct.rootPrice)}
                                                size={"sm"}
                                                lineHeight={16}
                                                placeholder="Giá"
                                            ></InputField>
                                        </Input>
                                    </VStack>
                                </HStack>

                                <VStack height={"10%"}>
                                    <FabLabel
                                        display={!isOpenLabel ? "none" : "flex"}
                                        color={"gray"}
                                        bold
                                        bgColor="white"
                                        height={15}
                                        size="sm"
                                        lineHeight={16}
                                        width={100}
                                    >
                                        {" "}
                                        Xuất xứ:
                                    </FabLabel>
                                    <Input
                                        height={"100%"}
                                        alignItems="center"
                                        boderWidth="1.5"
                                        isDisabled={true}
                                    >
                                        <InputField
                                            onChangeText={(value) => settingState(value, "origin")}
                                            placeholder="Xuất xứ:"
                                            size="sm"
                                            value={newProduct.origin}
                                            height={"80%"}
                                        ></InputField>
                                    </Input>
                                </VStack>

                                <HStack style={styles.hstack_nguoncung}>
                                    <VStack width={"63%"}>
                                        <FabLabel
                                            display={!isOpenLabel ? "none" : "flex"}
                                            color={"gray"}
                                            bold
                                            bgColor="white"
                                            height={16}
                                            size="sm"
                                            lineHeight={16}
                                            width={100}
                                        >
                                            {" "}
                                            Nguồn cung:
                                        </FabLabel>
                                        <Input
                                            height={"100%"}
                                            width={"100%"}
                                            alignItems="center"
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <InputField
                                                size="sm"
                                                placeholder="Nguồn cung:"
                                                onChangeText={(value) => settingState(value, "supply")}
                                                value={newProduct.supply}
                                                height={"80%"}
                                            ></InputField>
                                        </Input>
                                    </VStack>
                                    <VStack width={"35%"}>
                                        <FabLabel
                                            display={!isOpenLabel ? "none" : "flex"}
                                            color={"gray"}
                                            bold
                                            bgColor="white"
                                            height={15}
                                            size="sm"
                                            lineHeight={16}
                                            width={100}
                                        >
                                            {" "}
                                            SĐT:
                                        </FabLabel>
                                        <Input
                                            height={"100%"}
                                            alignItems="center"
                                            boderWidth="1.5"
                                            isDisabled={true}
                                        >
                                            <InputField
                                                keyboardType="numeric"
                                                size="sm"
                                                placeholder="SĐT:"
                                                onChangeText={(value) =>
                                                    settingState(value, "phoneNumber")
                                                }
                                                value={newProduct.phoneNumber}
                                            ></InputField>
                                        </Input>
                                    </VStack>
                                </HStack>

                                <VStack height={"25%"}>
                                    <FabLabel
                                        display={!isOpenLabel ? "none" : "flex"}
                                        color={"gray"}
                                        bold
                                        bgColor="white"
                                        height={13}
                                        size="sm"
                                        lineHeight={15}
                                        width={100}
                                    >
                                        Mô tả:
                                    </FabLabel>
                                    <Textarea boderWidth="1.5" isDisabled={true}>
                                        <TextareaInput
                                            onChangeText={(value) =>
                                                settingState(value, "description")
                                            }
                                            placeholder="Mô tả:"
                                            value={newProduct.description}
                                        ></TextareaInput>
                                    </Textarea>
                                </VStack>

                                <HStack style={styles.hstack_bnt}>
                                    <Button onPress={handleCreate} style={styles.btn_bottom}>
                                        <Text bold color="white">
                                            Thêm
                                        </Text>
                                    </Button>
                                </HStack>
                            </VStack>
                        </VStack>
                    </KeyboardAvoidingView>
                </ScrollView>
            </TouchableWithoutFeedback>

            <ChooseImageProductModal
                isOpen={isShowModalChooseImg}
                onCloseModal={onToggleModalChooseImg}
                data={listImageProductData}
                handleChooseImgProduct={handleSetImage}
            />
        </SafeAreaView>
    );
}