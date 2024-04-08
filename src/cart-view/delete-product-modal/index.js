import { Text } from "react-native";
import {
    Button,
    ButtonGroup,
    ButtonText,
    Divider,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@gluestack-ui/themed";
import { buttonText, color, textConst } from "../../utils";
import styles from "./style";

export default function DeleteProductModal({
    isOpen,
    onClose,
    onConfirm,
    productName,
    isDeleteAll,
}) {
    const onPressClose = () => {
        onClose();
    };

    const onPressConfirm = () => {
        onConfirm();
    };

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalBackdrop onPress={onPressClose} />
                <ModalContent>
                    <ModalHeader />
                    <ModalBody>
                        <Text>
                            {isDeleteAll ? (
                                textConst.DELETE_ALL_CART
                            ) : (
                                <Text>
                                    Xóa
                                    <Text style={color.plumRed}>{productName}</Text>
                                </Text>
                            )}
                        </Text>
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onPress={onPressConfirm} bgColor={color.plumRed} style={styles.buttonRadius}>
                                <ButtonText>{isDeleteAll ? buttonText.DELETE_ALL : buttonText.BUTTON_DELETE}</ButtonText>
                            </Button>
                            <Button
                                style={styles.buttonRadius}
                                action="secondary"
                                variant="outline"
                                onPress={onPressClose}
                            >
                                <ButtonText>{buttonText.BUTTON_CANCEL}</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}