import { StyleSheet } from "react-native";
import { color } from '../utils';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.white,
        marginBottom: -5
    },
    content: {
        width: "100%",
    }
});