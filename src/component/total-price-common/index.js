import {
    Box,
    Button,
    ButtonText,
    HStack,
    Text,
    VStack,
} from "@gluestack-ui/themed";

import {
    buttonText,
    color,
    formatMoney,
    shipPrice,
    textConst,
} from "../../utils";
import CardUserInfoCommon from "../card-user-info-common";
import styles from "./style";

export default function TotalPriceCommon(props) {
    const {
        customer,
        isButton,
        totalPrice,
        onOpenModalSearchCustomer,
        onPressCreateOrder,
        isDisableCreateCart,
    } = props;

    return (
        <Box >
            <VStack style={styles.boxTotalPrice}>
                <CardUserInfoCommon
                    data={customer}
                    isButton={isButton}
                    onPressChange={onOpenModalSearchCustomer}
                />
                <HStack
                    style={styles.container}
                    justifyContent={isButton ? "space-between" : "center"}
                    paddingBottom={isButton ? "auto" : "2%"}
                >
                    <VStack width={isButton ? "66%" : "95%"}>
                        <HStack justifyContent="space-between" style={styles.boxPrice}>
                            <Text size="sm">{textConst.SHIP_PRICE_TEXT}:</Text>
                            <Text size="sm">{formatMoney(shipPrice)}</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text size="md" bold color={color.blueSky}>
                                {textConst.TOTAL_PRICE}:
                            </Text>
                            <Text size="md" bold color={color.plumRed}>
                                {formatMoney(totalPrice)}
                            </Text>
                        </HStack>
                    </VStack>
                    <Button
                        bgColor={color.orangeOrder}
                        style={styles.btnCreateOrder}
                        onPress={onPressCreateOrder}
                        isDisabled={isDisableCreateCart}
                        display={isButton ? "flex" : "none"}>
                        <ButtonText>{buttonText.BTN_CREATE_ORDER}</ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}