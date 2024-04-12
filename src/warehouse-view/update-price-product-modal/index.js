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
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { LoadingCommon } from "../../component";
import {
  buttonText,
  color,
  formatMoney,
  numbericRegex,
  textConst,
  timeoutGet,
} from "../../utils";
import styles from "./style";

export default function UpdatePriceProductModal(props) {
  const { isOpen, closeModal, updatePrice, data } = props;
  const [floorPrice, setFloorPrice] = useState("");
  const [isValidateInput, setIsValidateInput] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const onPressCancel = () => {
    closeModal();
  };
  const onPressUpdate = () => {
    if (!isValidateInput) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        updatePrice({
          codeProduct: data.codeProduct,
          floorPrice: parseInt(floorPrice),
        });
      }, timeoutGet);
    } else {
      Keyboard.dismiss();
    }
  };

  const onChangeTextInput = (e) => {
    if (e.replace(numbericRegex, "").length <= 9) {
      setFloorPrice(e.replace(numbericRegex, ""));
    }
  };
  useEffect(() => {
    const isValid = floorPrice === "";
    setIsValidateInput(isValid);
  }, [floorPrice]);

  useEffect(() => {
    if (isOpen) {
      setFloorPrice(data.floorPrice.toString());
    }
  }, [data, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={styles.container}
      avoidKeyboard={true}
      isKeyboardDismissable={true}
    >
      <ModalBackdrop onPress={onPressCancel} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text opacity={0.5}>{textConst.FLOOR_PRICE}:</Text>
              <Text bold color={color.plumRed}>
                {formatMoney(data.floorPrice)}
              </Text>
              <Text opacity={0.5}>{textConst.NEW_FLOOR_PRICE}:</Text>
              <Input
                variant="outline"
                isInvalid={isValidateInput}
                style={styles.input}
              >
                <InputField
                  keyboardType="number-pad"
                  placeholder=""
                  onChangeText={onChangeTextInput}
                  style={styles.inputField}
                  value={formatMoney(floorPrice, "")}
                />
              </Input>
              <HStack space="sm" style={styles.buttonGroup}>
                <Button
                  size="sm"
                  bgColor={color.plumRed}
                  onPress={onPressCancel}
                  style={styles.buttonRadius}
                >
                  <ButtonText>{buttonText.BUTTON_CANCEL}</ButtonText>
                </Button>
                <Button
                  size="sm"
                  bgColor={color.darkGreen}
                  onPress={onPressUpdate}
                  style={styles.buttonRadius}
                >
                  <ButtonText>{buttonText.BUTTON_UPDATE}</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </HStack>
          <LoadingCommon isOpen={isLoading} />
        </ModalContent>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
