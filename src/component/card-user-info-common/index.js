import { Avatar, AvatarImage, Box, Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { View } from 'react-native';
import { buttonText, color } from '../../utils';
import styles from './style';


export default function CardUserInfoCommon(props) {
    const { data, isButton, onPressChange } = props;
    const uriImg = 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg';
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
                                        {data.fullName}
                                    </Text>
                                    {data.phoneNumber ? <Text color={color.plumRed} size="xs" numberOfLines={1}>{data.phoneNumber}</Text> : <></>}
                                    {data.address ? <Text size="xs" numberOfLines={1}>{data.address}</Text> : <></>}
                                </VStack>
                                :
                                <Text color={color.blackName} bold size="md">Chọn khách hàng</Text>
                        }
                    </HStack>
                    <HStack style={styles.contentRight} display={isButton ? "flex" : "none"}>
                        <Button onPress={onPressButton} style={styles.button}>
                            {
                                <ButtonText>{data ? buttonText.BUTTON_CHANGE : buttonText.BUTTON_CHOOSE}</ButtonText>
                            }
                        </Button>
                    </HStack>
                </HStack>
            </View>
        </>)
}