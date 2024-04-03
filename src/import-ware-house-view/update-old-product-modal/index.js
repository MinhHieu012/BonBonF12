import AntDesign from '@expo/vector-icons'
import { Button, Center, FormControlErrorText, HStack, Heading, Input, InputField, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Text, VStack } from '@gluestack-ui/themed'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import LoadingCommon from '../../component/loading-common'
import styles from './style'
import { useCallback, useEffect, useState } from 'react'
import { color, formatMoney, formatMoneyStringToNumber, numbericRegex, textConst, timeoutGet } from '../../utils'

const ItemsImportWareHouse = (textLeft,
    placeholderLeft,
    handeSetStateLeft,
    valueLeft,
    textRight,
    placeholderRight,
    handeSetStateRight,
    valueRight) => {
    return (
        <HStack space="md">
            <VStack w="48%" space="md">
                <Text>{textLeft}</Text>
                <Input height={30} isDisable={true}>
                    <InputField height={25} size={"sm"} placeholder="placeholder" onChangeText={(value) => handleSetStateLeft(value)} />
                </Input>
            </VStack>
            <VStack w="48%" space="md">
                <Text>{textRight}</Text>
                <Input height={30} isDisable={true}>
                    <InputField height={25} size={"sm"} keyboardType='numeric' placeholder="placeholder" onChangeText={(value) => handleSetStateRight(value)} />
                </Input>
            </VStack>
        </HStack>
    )
}

export default UpdateOldProductModal = (props) => {
    const { isShowModal, closeModal, onData, isClear, onOpenModalNoti } = props
    const [quantityOld, setQuantityOld] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isValidForm, setValidForm] = useState(true)
    const [errorQuantity, setErrorQuantity] = useState(false)
    const [updateOldProduct, setUpdateOldProduct] = useState({
        name: '',
        expiry: '',
        supply: '',
        rootPrice: '',
        quantity: '100',
        floorPrice: '',
        phoneNumber: ''
    })

    const onCheckNumber = (value) => {
        if (value > 9999) {
            setUpdateOldProduct(quantity)
        } else {
            setUpdateOldProduct(value)
            if (value == '' || value == 0) {
                setErrorQuantity(true)
            } else {
                setErrorQuantity(false)
            }
        }
    }

    const handleClearState = () => {
        setUpdateOldProduct(100)
    }

    const totalMoney = useCallback((rootPrice, quantity) => {
        return Number(quantity) * Number(rootPrice);
    }, []);

    useEffect(() => {
        if (onData) {
            setQuantityOld(JSON.stringify(onData.quantity));

            setUpdateOldProduct(prevState => ({
                ...prevState,
                floorPrice: onData.floorPrice || '',
                rootPrice: JSON.stringify(onData.rootPrice || ''),
                name: onData.name || '',
                supply: onData.supply || '',
                phoneNumber: onData.phoneNumber || '',
                expiry: onData.expiry || ''
            }));
        }
    }, [onData]);

    useEffect(() => {
        if (isClear) {
            handleClearState();
        }
    }, [isClear]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Modal isOpen={isShowModal} onClose={closeModal}>
                <ModalBackdrop />
                <ModalContent style={styles.container}>
                    <ModalHeader>
                        <Heading size="lg" numberOfLines={1} flex={1}>{updateOldProduct.name}</Heading>
                        <ModalCloseButton>
                            <AntDesign name="close" size={25} color={color.darkGreen} onPress={closeModal} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack space="md">
                            <Text>Tồn kho:  {formatMoney(quantityOld)}</Text>
                            <HStack space="md">
                                <VStack w="48%" space="md">
                                    <Text>Giá đang bán:</Text>
                                    <Text color={color.plumRed}>{formatMoney(updateOldProduct.floorPrice)}</Text>
                                </VStack>
                                <VStack w="48%" space="md">
                                    <Text>Số lượng nhập: {typeof updateOldProduct.quantity}</Text>
                                    <Input height={30} >
                                        <InputField height={25} size={"sm"} keyboardType='numeric' onChangeText={(value) => onCheckNumber(formatMoneyStringToNumber(value))} placeholder={updateOldProduct.quantity} value={formatMoney(updateOldProduct.quantity)} />
                                    </Input>
                                    <FormControlErrorText fontSize={12} style={{ display: isValidForm === false && errorQuantity === true ? "flex" : "none" }}>{textConst.VALIDATE_QUANTITY}</FormControlErrorText>
                                </VStack>
                            </HStack>
                            <ItemsImportWareHouse textLeft={"Nguồn cung:"} placeholderLeft={"supply"} valueLeft={updateOldProduct.supply} textRight={"Giá nhập:"} placeholderRight={"Giá nhập"} valueRight={formatMoney(updateOldProduct.rootPrice)}/>

                            <ItemsImportWareHouse textLeft={"SĐT:"} placeholderLeft={updateOldProduct.phoneNumber} valueLeft={updateOldProduct.phoneNumber} textRight={"HSD:"} placeholderRight={updateOldProduct.expiry} valueRight={updateOldProduct.expiry}/>

                            <Center>
                                <Text style={{ marginTop: 10 }}>Tồn kho sau nhập hàng:
                                    <Text style={{ fontWeight: "bold" }}> {formatMoney(quantityOld) + updateOldProduct.quantity} </Text>
                                </Text>
                            </Center>
                            <Center>
                                <Text style={{ marginTop: 10 }}>Tổng số tiền nhập:
                                    <Text style={{ fontWeight: "bold" }}> {formatMoney(totalMoney)} </Text>
                                </Text>
                            </Center>
                            <Center>
                                <Button style={{ marginBottom: 10 }} bgColor={color.darkGreen} w="48%" borderRadius={100} onPress={onUpdateWareHouse}>

                                    <Text fontSize={14} color={color.white}> Nhập kho </Text>
                                </Button>
                            </Center>
                        </VStack>
                    </ModalBody>
                </ModalContent>
                <LoadingCommon isOpen={isLoading}/>
            </Modal>
        </TouchableWithoutFeedback >
    )
}