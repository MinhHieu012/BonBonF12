import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    boxTotalPrice: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: "2%",
        paddingTop: "2%",
        paddingRight: "1%",
        paddingTopBottom: "1%",
        zIndex: 999,
        backgroundColor: "white",
    },
    container: {
        paddingTop: "4%",
        alignItems: "center"
    },
    boxPrice: { marginBottom: "3%", },
    btnCreateOrder: {
        width: "30%",
        height: "84%",
    }
});

export default styles;