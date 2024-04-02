import { StyleSheet } from "react-native";
import {color} from '../../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingEnd: 12,
        borderColor: "#ccc",
        borderBottomWidth: 1,
        borderStyle: "solid",
    },
    contentLeft:{
        flex: 7,
        alignItems: 'center',
        paddingRight: 10,
    },
    contentRight:{
        width:"30%",
    },
    button:{
        backgroundColor: color.blueSky,
    }
})

export default styles;