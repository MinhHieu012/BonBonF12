import { StyleSheet } from "react-native";

import { color } from "../../utils";

const styles = StyleSheet.create({
  container: {},
  content: {
    width: "93%",
    alignContent: "center",
    justifyContent: "center",
    padding: "3%",
    backgroundColor: color.white,
  },
  buttonRadius: {
    borderRadius: 20,
  },
  body: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "50%",
    height: "100%",
    objectFit: "contain",
    borderRadius: 10,
  },
  buttonGroup: {
    paddingTop: 5,
  },
  input: {
    height: 26,
    width: "85%",
  },
  inputField: {
    fontSize: 14,
    height: "100%",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default styles;
