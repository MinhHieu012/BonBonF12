import { StyleSheet } from "react-native";
import { color } from '../../utils';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingBottom: 12,
        borderColor: "#ccc",
        borderBottomWidth: 1,
        borderStyle: "solid",
    },
    contentLeft: {
        flex: 1,
        alignItems: "center",
    },
    contentRight: {
        width: "30%",
        alignItems: "center",
    },
    button: {
        backgroundColor: color.blueSky,
        flex: 1
    }
})

export default styles;