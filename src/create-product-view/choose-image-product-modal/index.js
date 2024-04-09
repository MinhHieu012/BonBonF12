import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalHeader,
    Heading,
    ModalCloseButton,
    Icon,
    CloseIcon,
    Image,
    HStack,
    ScrollView,
} from "@gluestack-ui/themed";
import styles from "./style";

const ChooseImageProductModal = (props) => {
    const { isOpen, onCloseModal, data, handleChooseImgProduct } = props;

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalBackdrop onPress={onCloseModal} />
                <ModalContent bgColor="white" height={"65%"}>
                    <ModalHeader>
                        <Heading size="md">Chọn ảnh sản phẩm:</Heading>
                        <ModalCloseButton onPress={onCloseModal}>
                            <Icon size="xl" style={styles.iconClose} as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <ScrollView>
                            <HStack style={styles.contentImg} space="md">
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleChooseImgProduct(item)}
                                        >
                                            <Image
                                                source={{ uri: item.avatar }}
                                                style={{ width: 100, height: 100 }}
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <EmptyDataCommon isCheckShowButton={false} />
                                )}
                            </HStack>
                        </ScrollView>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChooseImageProductModal;
