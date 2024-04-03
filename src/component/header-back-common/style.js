import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../utils';
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        alignItems: "center",
        borderBottomColor: color.grayCart,
        borderBottomWidth: 0.5,
        height: 50
    },
    boxIconBack: {
        position: "absolute",
        transformOrigin: '0 50%',
        zIndex: 999,
        width: '13%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    boxTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    boxIconDelete: {
        zIndex: 999,
        position: "absolute",
        right: 0,
        transformOrigin: '0 50%',
        width: '30%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    txtDelete: {
        color: color.plumRed,
        fontWeight: "bold",
    }

});

export default styles;