import { StyleSheet, Dimensions } from "react-native";

import { color } from "../../utils";

export const styles = StyleSheet.create({
    container: {
        bgColor: "white",
        width: "100%",
        paddingHorizontal: Dimensions.get("window").width * 0.02,
        alignItems: "center",
    },
    content: {
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: Dimensions.get("window").width * 0.56,
    },
    image: {
        height: "100%",
        width: "100%",
        objectFit: "contain",
    },
    infor: {
        width: "45%",
        height: "90%",
        justifyContent: "space-between",
        paddingVertical: "5.5%",
    },
    groupButton: {
        justifyContent: "space-between",
        color: "white",
        width: "100%",
        marginBottom: 15
    },
    input: {
        alignItems: "center",
        height: "15%",
    },
    text: {
        fontSize: 12,
        color: "white",
    },
    textInput: {
        fontSize: 12,
        color: color.gray,
    },
    hidden: {
        height: 0,
    },
    list: {
        overflow: "hidden",
    },
});