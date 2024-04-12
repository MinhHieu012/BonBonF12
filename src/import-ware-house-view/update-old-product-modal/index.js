import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Center,
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
import { useCallback, useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { LoadingCommon } from "../../component";
import { useImportWareHouse } from "../../hook";
import styles from "./style";
import {
  color,
  formatMoney,
  formatMoneyStringToNumber,
  numbericRegex,
  textConst,
  timeoutGet,
} from "../../utils";

const ItemsImportWareHouse = ({
  textLeft,
  placeholderLeft,
  handeSetStateLeft,
  valueLeft,
  textRight,
  placeholderRight,
  handeSetStateRight,
  valueRight,
}) => {
  return (
    <HStack space="md">
      <VStack w="48%" space="md">
        <Text>{textLeft}</Text>
        <Input height={30} isDisabled={true}>
          <InputField
            value={valueLeft}
            height={25}
            size={"sm"}
            placeholder={placeholderLeft}
            onChangeText={(value) => handeSetStateLeft(value)}
          />
        </Input>
      </VStack>
      <VStack w="48%" space="md">
        <Text>{textRight}</Text>
        <Input height={30} isDisabled={true}>
          <InputField
            value={valueRight}
            height={25}
            size={"sm"}
            keyboardType="numeric"
            placeholder={placeholderRight}
            onChangeText={(value) => handeSetStateRight(value)}
          />
        </Input>
      </VStack>
    </HStack>
  );
};
export default function UpdateOldProductModal(props) {
  const { isShowModal, closeModal, onData, isClear, onOpenModalNoti } = props;
  const { dispatchUpdateListWareHouse } = useImportWareHouse();

  const [id, setId] = useState();
  const [quantityOld, setQuantityOld] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isValidForm, setValidForm] = useState(true);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [updateOldProduct, setUpdateOldProduct] = useState({
    name: "",
    expiry: "",
    supply: "",
    rootPrice: "",
    quantity: "100",
    floorPrice: "",
    phoneNumber: "",
  });
  useEffect(() => {
    setQuantityOld(JSON.stringify(onData?.quantity));
    setUpdateOldProduct({
      ...updateOldProduct,
      floorPrice: onData?.floorPrice,
      rootPrice: JSON.stringify(onData?.rootPrice),
      name: onData?.name,
      supply: onData?.supply,
      phoneNumber: onData?.phoneNumber,
      expiry: onData?.expiry,
    });
  }, [onData]);

  useEffect(() => {
    if (isClear) {
      handleClearState();
    }
  }, [isClear]);

  const onCheckNumber = (value) => {
    if (parseInt(value.replace(numbericRegex, "")) > 9999) {
      setUpdateOldProduct({
        ...updateOldProduct,
        quantity: updateOldProduct.quantity,
      });
    } else {
      setUpdateOldProduct({
        ...updateOldProduct,
        quantity: value,
      });
      if (value === "" || parseInt(value) === 0) {
        setErrorQuantity(true);
      } else {
        setErrorQuantity(false);
      }
    }
  };
  const handleClearState = () => {
    setUpdateOldProduct({
      ...updateOldProduct,
      quantity: "100",
    });
  };

  const totalMoney = useCallback(
    parseInt(updateOldProduct.quantity) * parseInt(updateOldProduct.rootPrice),
    [parseInt(updateOldProduct.rootPrice), parseInt(updateOldProduct.quantity)]
  );
  const onUpdateWareHouse = () => {
    if (errorQuantity) {
      setValidForm(false);
    } else {
      setValidForm(true);
      dispatchUpdateListWareHouse({
        id: onData?.id,
        name: updateOldProduct.name,
        floorPrice: updateOldProduct.floorPrice,
        rootPrice: parseInt(updateOldProduct.rootPrice),
        quantity: parseInt(updateOldProduct.quantity),
        supply: updateOldProduct.supply,
        phoneNumber: updateOldProduct.phoneNumber,
        expiry: updateOldProduct.expiry,
        avatar: onData?.avatar,
        codeProduct: onData?.codeProduct,
        description: onData?.description,
        origin: onData?.origin,
        unit: onData?.unit,
      });
      setLoading(true);
      setTimeout(() => {
        closeModal();
        setLoading(false);
        handleClearState();
        onOpenModalNoti();
      }, timeoutGet);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal isOpen={isShowModal} onClose={() => closeModal()}>
        <ModalBackdrop />
        <ModalContent style={styles.container}>
          <ModalHeader>
            <Heading size="lg" numberOfLines={1} flex={1}>
              {updateOldProduct.name}
            </Heading>
            <ModalCloseButton>
              <AntDesign
                onPress={() => closeModal()}
                name="close"
                size={25}
                color={color.darkGreen}
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="md">
              <Text>Tồn kho: {formatMoney(quantityOld)} </Text>
              <HStack space="md">
                <VStack w="48%" space="md">
                  <Text>Giá đang bán:</Text>
                  <Text color={color.plumRed}>
                    {formatMoney(updateOldProduct.floorPrice)}
                  </Text>
                </VStack>
                <VStack w="48%" space="md">
                  <Text>Số lượng nhập:</Text>
                  <Input height={30}>
                    <InputField
                      value={formatMoney(updateOldProduct.quantity)}
                      height={25}
                      size={"sm"}
                      keyboardType="numeric"
                      placeholder={updateOldProduct.quantity}
                      onChangeText={(value) =>
                        onCheckNumber(formatMoneyStringToNumber(value))
                      }
                    />
                  </Input>
                  <FormControlErrorText
                    fontSize={12}
                    display={!isValidForm && errorQuantity ? "flex" : "none"}
                  >
                    {textConst.VALIDATE_QUANTITY}
                  </FormControlErrorText>
                </VStack>
              </HStack>
              <ItemsImportWareHouse
                textLeft={"Nguồn cung:"}
                placeholderLeft={"supply"}
                valueLeft={updateOldProduct.supply}
                textRight={"Giá nhập:"}
                placeholderRight={"Giá nhập"}
                valueRight={formatMoney(updateOldProduct.rootPrice)}
              />

              <ItemsImportWareHouse
                textLeft={"SĐT:"}
                valueLeft={updateOldProduct.phoneNumber}
                placeholderLeft={updateOldProduct.phoneNumber}
                textRight={"HSD:"}
                valueRight={updateOldProduct.expiry}
                placeholderRight={updateOldProduct.expiry}
              />
              <Center>
                <Text style={{ marginTop: 10 }}>
                  Tồn kho sau nhập hàng:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {formatMoney(
                      parseInt(quantityOld) +
                        parseInt(updateOldProduct.quantity)
                    )}
                  </Text>
                </Text>
              </Center>
              <Center>
                <Text style={{ marginBottom: 10 }}>
                  Tổng số tiền nhập:{" "}
                  <Text style={{ fontWeight: "bold" }} color={color.plumRed}>
                    {formatMoney(totalMoney)}
                  </Text>
                </Text>
              </Center>
              <Center>
                <Button
                  style={{ marginBottom: 10 }}
                  bgColor={color.darkGreen}
                  onPress={onUpdateWareHouse}
                  w="48%"
                  borderRadius={100}
                >
                  <Text fontSize={14} color={color.white}>
                    Nhập kho
                  </Text>
                </Button>
              </Center>
            </VStack>
          </ModalBody>
        </ModalContent>
        <LoadingCommon isOpen={isLoading} />
      </Modal>
    </TouchableWithoutFeedback>
  );
}
