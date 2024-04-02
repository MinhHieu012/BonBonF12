import { Avatar, AvatarImage, Box, Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { View } from 'react-native';
import { buttonText, color } from '../../utils';
import styles from './style';


export default function CardUserInfoCommon(props) {
    const { data, isButton, onPressChange } = props;
    const uriImg = '';
    const onPressButton = () => {
        onPressChange();
    }
    return (
        <>
            <View>
                <HStack style={styles.container}>
                    <HStack style={styles.contentLeft} paddingHorizontal={isButton ? "auto" : 10}>
                        <Box style={isButton ? { paddingRight: 10 } : {}}>
                            <Avatar bgColor={color.white} size="md">
                                <AvatarImage source={data.avatar ? data.avatar : uriImg} alt="Avatar">

                                </AvatarImage>
                            </Avatar>
                        </Box>
                        {
                            data.id ?
                                <VStack flex={1} paddingLeft={isButton ? "auto" : "5%"}>
                                    <Text bold size="md" numberOfLines={1} color={color.blackName}>
                                        {data.fullname}
                                    </Text>
                                    {data.phoneNumber ? <Text color={color.plumRed} size="xs" numberOfLines={1}>{data.phoneNumber}</Text> : <></>}
                                    {data.address ? <Text size="xs" numberOfLines={1}>{data.address}</Text> : <></>}
                                </VStack>
                                :
                                <Text color={color.blackName} bold size="md">Chọn khách hàng</Text>

                        }
                    </HStack>
                    <Box style={styles.contentRight} display={isButton ? "flex" : "none"}>
                        <Button onPress={onPressButton} style={styles.button}>
                            {
                                data ? <ButtonText>{buttonText.BUTTON_CHANGE}</ButtonText> : <ButtonText>{buttonText.BUTTON_CHOOSE}</ButtonText>
                            }
                        </Button>
                    </Box>
                </HStack>
            </View>
        </>)
}