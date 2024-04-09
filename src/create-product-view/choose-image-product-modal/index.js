import { Pressable } from "react-native";
import React from "react";

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
import { EmptyDataCommon } from "../../component";

export default function ChooseImageProductModal(props) {
    const { isOpen, onCloseModal, data, handleChooseImgProduct } = props;

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalBackdrop onPress={onCloseModal} />

                <ModalContent bgColor="white" height={"65%"}>
                    <ModalHeader>
                        <Heading size="md">Chọn ảnh sản phẩm</Heading>
                        <ModalCloseButton onPress={onCloseModal}>
                            <Icon size="xl" style={styles.iconClose} as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>

                    <ModalBody>
                        <ScrollView>
                            <HStack style={styles.contentImg} space="md">
                                {data ? (
                                    data.map((item, index) => {
                                        return (
                                            <Pressable
                                                style={styles.pressImg}
                                                key={index}
                                                onPress={() => {
                                                    handleChooseImgProduct(item);
                                                }}
                                            >
                                                <Image
                                                    style={styles.imgProduct}
                                                    size="md"
                                                    source={{ uri: item.avatar }}
                                                    alt="Ảnh sản phẩm"
                                                />
                                            </Pressable>
                                        );
                                    })
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
}
