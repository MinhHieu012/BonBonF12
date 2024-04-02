import { StyleSheet } from "react-native";
import { color } from "../../utils";

// Khởi tạo biến styles
const styles = StyleSheet.create({
  // Khai báo tabBar
  tabBar: {
    height: "10%",
    backgroundColor: color.grayCart,
    marginBottom: 3,
  },
  // Khai báo tabItem
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
    width: 140,
  },
  // Khai báo tabSelected
  tabSelected: {
    borderBottomWidth: 2,
  },
});

// Xuất biến styles
const styleFlatlist = StyleSheet.create({
  // Khai báo container
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingEnd: 10,
    borderColor: "#ccc",
    borderBottomWidth: 0.5,
    borderStyle: "solid",
  },
  // Khai báo img
  img: {
    width: "100%",
    height: "100%",
  },
  // Khai báo boxImg
  boxImg: {
    width: 90,
    height: 90,
  },
  // Khai báo contentCard
  contentCard: {
    flex: 1,
    paddingLeft: 10,
  },
});
export { styles, styleFlatlist };
