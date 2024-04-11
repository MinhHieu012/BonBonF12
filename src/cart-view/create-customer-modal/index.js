import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
    Button,
    FormControlErrorText,
    HStack,
    Heading,
    Input,
    InputField,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Text,
    VStack,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useCustomer } from "../../hook";
import { color, textConst, vnf_regex } from "../../utils";
import styles from "./style";

function CreateCustomerModal(props) {
    const {
        isShowModalCreate,
        onCloseModalCreate,
        onClearTextSearch,
        onOpenModalToast,
    } = props;
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [errorPhone, setErrorPhone] = useState(true);
    const [errorName, setErrorName] = useState(true);
    const [errorAddress, setErrorAddress] = useState(true);
    const [isValidForm, setValidForm] = useState(true);
    const { dispatchCreateCustomer } = useCustomer();
    const onCheckNumber = (value) => {
        setPhoneNumber(value);
        if (!vnf_regex.test(value)) {
            setErrorPhone(true);
        } else {
            setErrorPhone(false);
        }
    };
    const onCheckFullname = (value) => {
        setFullName(value);
        if (value === "") {
            setErrorName(true);
        } else {
            setErrorName(false);
        }
    };
    const onCheckAddress = (value) => {
        setAddress(value);
        if (value === "") {
            setErrorAddress(true);
        } else {
            setErrorAddress(false);
        }
    };

    const handleCreateCustomerModal = () => {
        if (errorPhone == true || errorName == true || errorAddress == true) {
            setValidForm(false);
        } else {
            setValidForm(true);
            dispatchCreateCustomer({
                avatar:
                    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
                phoneNumber,
                fullName,
                address,
            });
        }
        onCloseModalCreate();
        onOpenModalToast();
        setPhoneNumber("");
        setFullName("");
        setAddress("");
        onClearTextSearch(true);
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Modal isOpen={isShowModalCreate} onClose={() => onCloseModalCreate()}>
                <ModalBackdrop />
                <ModalContent style={styles.container}>
                    <ModalHeader>
                        <Heading size="md">Thêm mới khách hàng</Heading>
                        <ModalCloseButton>
                            <AntDesign
                                onPress={() => onCloseModalCreate()}
                                name="close"
                                size={25}
                                color={color.darkGreen}
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack space={"2xl"}>
                            <VStack space={"sm"}>
                                <Text>Số điện thoại</Text>
                                <Input>
                                    <InputField
                                        onChangeText={onCheckNumber}
                                        keyboardType="numeric"
                                        placeholder="Số điện thoại..."
                                    />
                                </Input>
                                <FormControlErrorText
                                    display={
                                        isValidForm == false && errorPhone == true ? "flex" : "none"
                                    }
                                >
                                    {textConst.VALIDATE_CELL_PHONE}
                                </FormControlErrorText>
                            </VStack>
                            <VStack space={"sm"}>
                                <Text>Họ và tên</Text>
                                <Input>
                                    <InputField
                                        onChangeText={onCheckFullname}
                                        placeholder="Họ và tên..."
                                    />
                                </Input>
                                <FormControlErrorText
                                    display={
                                        isValidForm == false && errorPhone == true ? "flex" : "none"
                                    }
                                >
                                    {textConst.VALIDATE_FULL_NAME}
                                </FormControlErrorText>
                            </VStack>
                            <VStack space={"sm"}>
                                <Text>Địa chỉ</Text>
                                <Input>
                                    <InputField
                                        onChangeText={onCheckAddress}
                                        placeholder="Địa chỉ..."
                                    />
                                </Input>
                                <FormControlErrorText
                                    display={
                                        isValidForm == false && errorPhone == true ? "flex" : "none"
                                    }
                                >
                                    {textConst.VALIDATE_ADDRESS}
                                </FormControlErrorText>
                            </VStack>
                            <HStack justifyContent="center">
                                <Button
                                    bgColor={color.darkGreen}
                                    style={{ marginBottom: 15 }}
                                    w={"70%"}
                                    onPress={() => handleCreateCustomerModal()}
                                >
                                    <FontAwesome
                                        name="user-plus"
                                        size={20}
                                        color="white"
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text size={"sm"} color={"white"}>
                                        Lưu khách hàng mới
                                    </Text>
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </TouchableWithoutFeedback>
    );
}
export default CreateCustomerModal;