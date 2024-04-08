import { Dimensions, StyleSheet } from 'react-native'
import {color} from '../../utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
    },
    boxHeaderBack: {
        backgroundColor: color.white,
    },
    contentCart: {
        padding: Dimensions.get('window').width * 0.02,
        width: Dimensions.get('window').width - 1,
        borderBottomWidth: 1,
        borderBottomColor: color.grayCart,
        backgroundColor: color.white,
    },
    boxImg: {
        width: Dimensions.get('window').width * 0.27,
        height: Dimensions.get('window').width * 0.29,
    },
    imgProduct: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: 10,
        borderColor: color.grayCart,
    },
    inforProduct: {
        width: Dimensions.get('window').width * 0.67,
    },
    inpQuantity: {
        width: '41%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
    },
    btnSalePrice: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.grayCart,
    },
    inpSalePrice: {
        width: '30%',
        height: '100%',
    },
    btnUpdateQuantity: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.grayCart,
    },
})
export default styles