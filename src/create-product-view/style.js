import { Dimensions, StyleSheet } from "react-native";
import { color } from "../utils";
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  screen: {
    padding: "2%",
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    height: height < 780 ? height * 0.7 : height * 0.87,
    justifyContent: "space-between",
    paddingTop: "2%",
    paddingHorizontal: "2%",
  },
  hstack_img: {
    height: height < 780 ? "36%" : "30%",
    justifyContent: "space-between",
    marginBottom: height < 780 ? "2%" : "none",
  },
  img: {
    width: "45%",
    aspectRatio: "1/1",
  },
  vstack_right: {
    width: "53%",
    justifyContent: "space-between",
  },
  vstack_input: {
    height: "70%",
    justifyContent: "space-between",
  },
  inputNearImg: {
    alignItems: "center",
    height: "25%",
  },
  text_input: {
    fontSize: 13,
  },
  hstack_button: {
    justifyContent: "space-between",
    height: "18%",
  },
  vstack_form_btn: {
    height: height > 780 ? "68%" : "90%",
    justifyContent: "space-between",
  },
  btn_taiAnh: {
    width: "43%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_chupAnh: {
    width: "50%",
    height: "100%",
    backgroundColor: color.darkGreen,
    borderRadius: 20,
  },
  text_btn: {
    color: "white",
    fontSize: 11,
  },
  hstack_bnt: {
    height: "9%",
    justifyContent: "center",
  },
  btn_bottom: {
    width: "60%",
    borderRadius: 20,
    backgroundColor: color.darkGreen,
    height: "100%",
  },
  input_tenSP: {
    height: "10%",
    alignItems: "center",
  },
  hstack_unit_HSD_Gia: {
    height: "10%",
    justifyContent: "space-between",
  },
  inputXxuatxu: {
    height: "10%",
    alignItems: "center",
  },
  hstack_nguoncung: {
    height: "10%",
    justifyContent: "space-between",
  },
  textarea: {
    height: "25%",
  },
});

export default styles;
