import { Box, Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import CardUserInfoCommon from '../card-user-info-common';
import { buttonText, color, formatMoney, shipPrice, textConst } from '../../utils';
import styles from './style';

export default function TotalPriceCommon(props){
    const { customer, isButton, totalPrice, onOpenModalSearchCustomer, onPressCreateOrder, isDisableCreateCart } = props;
    return (
        <>
            <Box style={styles.boxTotalPrice}>
                <VStack>
                    <CardUserInfoCommon data={customer} isButton={isButton} onPressChange={onOpenModalSearchCustomer} />
                    <HStack paddingBottom={isButton ? "auto" : "2%"} style={styles.container}>
                        <VStack width={isButton ? "66%" : "95%"}>
                            <HStack justifyContent="space-between" style={styles.boxPrice}>
                                <Text size="sm">{textConst.SHIP_PRICE_TEXT}</Text>
                                <Text size="sm">{formatMoney(shipPrice)}</Text>
                            </HStack>
                            <HStack justifyContent="space-between">
                                <Text size="md" color={color.blueSky}>{textConst.TOTAL_PRICE}</Text>
                                <Text size="md" color={color.plumRed}>{formatMoney(totalPrice)}</Text>
                            </HStack>
                        </VStack>
                        {isButton && 
                            <Button style={styles.btnCreateOrder} bgColor={color.orangeOrder} onPress={onPressCreateOrder}>
                                <ButtonText>{buttonText.BTN_CREATE_ORDER}</ButtonText>
                            </Button>
                        }

                    </HStack>
                </VStack>
            </Box>
        </>
    )
}