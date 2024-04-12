import { StyleSheet } from "react-native";
import { color } from "../../utils";

const styles = StyleSheet.create({
  iconClose: {
    color: color.darkGreen,
  },
  contentImg: {
    flexWrap: "wrap",
  },
  pressImg: {
    borderWidth: 1,
    borderColor: color.grayCart,
    marginBottom: "5%",
    width: "30%",
  },
  imgProduct: {
    width: "100%",
  },
});

export default styles;
