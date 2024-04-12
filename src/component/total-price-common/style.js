import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    boxTotalPrice: {
        minHeight: Dimensions.get('window').height * 0.2,
        position: 'relative',
        bottom: 0,
        left: 0,
        paddingBottom: "2%",
        paddingTop: "2%",
        paddingRight: "1%",
        paddingTopBottom: "1%",
        zIndex: 999,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    container: {
        alignItems: "center",
        paddingTop:"2%"
    },
    boxPrice: {
        marginBottom: "3%",
    },
    btnCreateOrder: {
        width: "30%",
        height: "84%",
    },
});

export default styles;