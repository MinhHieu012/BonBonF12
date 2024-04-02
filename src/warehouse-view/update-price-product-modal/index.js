import {
  Button,
  ButtonText,
  HStack,
  Image,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalContent,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import {LoadingCommon} from "../../component";
import styles from "./style";
import {
  buttonText,
  color,
  formatMoney,
  numbericRegex,
  textConst,
  timeoutGet,
} from "../../utils";
import { Keyboard,TouchableWithoutFeedback } from "react-native";
export const UpdatePriceProductModal = (props) => {
  const { isOpen, closeModal, updatePrice, data } = props;
  const [isValidateInput, setIsValidateInput] = useState(false);
  const [floorPrice, setFloorPrice] = useState();
  const [isLoading, setLoading] = useState(false);
  const onChangeTextInput = (e) => {
    if (e.replace(/\D/g, "").length <= 9) {
      setFloorPrice(e.replace(/\D/g, ""));
    }
  };
  useEffect(() => {
    const isValid = floorPrice === "";

    // Set hàm setIsValidateInput với tham số là isValid
    setIsValidateInput(isValid);
  }, [floorPrice]);
  useEffect(() => {
    if (isOpen) {
      // Set hàm setFloorPrice với tham số là hàm toString của biến state floorPrice của đối tượng data
      setFloorPrice(data.floorPrice.toString());
      // Dùng để thay đổi giá trị thành kiểu dữ liệu string
    }
  }, [data, isOpen]);
  const onPressCancel = () => {
    closeModal();
  };
  const onPressUpdate = () => {
    if (!isValidateInput) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        updatePrice(
          {
            codeProduct: data.codeProduct,
            floorPrice: parseInt(floorPrice),
          },
          timeoutGet
        );
      });
    } else {
      Keyboard.dismiss();
    }
  };
  return (
    <Modal
      style={styles.container}
      avoidKeyboard={true}
      isKeyboardDismissable={true}
      isOpen={isOpen}
    >
      {" "}
      UGSPK-HTML - 1
      <ModalBackdrop onPress={onPressCancel} /> UGSPK-HTML - 2
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        {" "}
        UGSPK-HTML - 3
        <ModalContent style={styles.content}>
          <HStack style={styles.body}>
            <Image
              source={{ uri: data.avatar }}
              alt=""
              style={styles.image}
              flex={1}
            />
            <VStack
              space="xs"
              style={styles.contentRight}
              alignItems="center"
              flex={1}
            >
              <Text bold size="lg" numberOfLines={1}>
                {data.name}
              </Text>
              <Text opacity={0.5}>:{textConst.FLOOR_PRICE}</Text>
              <Text bold color={color.plumRed}>
                {formatMoney(data.floorPrice)}
              </Text>
              <Text opacity={0.5}>:{textConst.NEW_FLOOR_PRICE}</Text>
              <Input
                variant="outline"
                style={styles.input}
                isInvalid={isValidateInput}
              >
                <InputField
                  keyboardType="number-pad"
                  placeholder=""
                  style={styles.inputField}
                  onChangeText={onChangeTextInput}
                  value={formatMoney(floorPrice)}
                />
              </Input>
              <HStack space="sm" style={styles.buttonGroup}>
                <Button
                  size="sm"
                  style={styles.buttonRadius}
                  bgColor={color.plumRed}
                  onPress={onPressCancel}
                >
                  <ButtonText>{buttonText.BUTTON_CANCEL}</ButtonText>
                </Button>
                <Button
                  size="sm"
                  style={styles.buttonRadius}
                  bgColor={color.darkGreen}
                  onPress={onPressUpdate}
                >
                  <ButtonText>{buttonText.BUTTON_UPDATE}</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </HStack>
          <LoadingCommon isLoading={isLoading} />
        </ModalContent>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
