import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    right: 0,
    top: 0,
    transform: [{translateY: -10}]
  },
});
export default styles;