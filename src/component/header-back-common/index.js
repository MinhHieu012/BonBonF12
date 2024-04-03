import { Box, Center, ChevronLeftIcon, HStack, Icon, Text } from '@gluestack-ui/themed'
import { Platform, Pressable, SafeAreaView } from 'react-native'
import styles from './style'
import { buttonText, setColorWithStatus, textConst } from '../../utils'

const HeaderBackCommon = (props) => {
    const { title, isDeleteAll, onBack, onDeleteAll, status } = props
    const onPressBack = () => {
        onBack()
    }
    const onPressDeleteAll = () => {
        onDeleteAll()
    }
    return (
        <SafeAreaView>
            <Text style={{ display: Platform.OS === 'android' ? 'flex' : 'none', paddingTop: Platform.OS === 'android' ? 25 : 'auto' }}></Text>
            <HStack style={styles.container}>
                <Box style={styles.boxTitle}>
                    <Center>
                        <Text size="xl" style={{
                            color: setColorWithStatus(status),
                            fontWeight: status ? 'bold' : 'object'
                        }}> {title || textConst.CART}
                        </Text>
                    </Center>
                </Box>
                <Pressable style={styles.boxIconBack} onPress={onPressBack}>
                    <Icon size="xl" as={ChevronLeftIcon} />
                </Pressable>
                <Box style={styles.boxIconDelete}>
                    {isDeleteAll ?
                    <Pressable onPress={onPressDeleteAll}>
                        <Text style={styles.txtDelete}></Text>
                    </Pressable>:
                    <></>
                    }
                </Box>
            </HStack>
        </SafeAreaView>
    )
}
export default HeaderBackCommon