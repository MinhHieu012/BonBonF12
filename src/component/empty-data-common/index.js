import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { Button, Text, VStack } from '@gluestack-ui/themed'
import styles from './styles'
import { color } from '../../utils'

export default function EmptyDataCommon(props) {
    const { title, onHandlePress, isCheckShowButton } = props
    return (
        <VStack space={"lg"} style={styles.container}>
            <AntDesign name="warning" size={54} color="#ccc" />
            <Text>Không tìm thấy dữ liệu</Text>
            <Button style={{ marginBottom: 15, bgColor: color.darkGreen, display: isCheckShowButton ? 'flex' : 'none' }} onPress={() => onHandlePress()}>
                <Text color={color.white}>
                    {title}
                </Text>
            </Button>
        </VStack>
    )
}

