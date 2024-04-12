import { StyleSheet } from "react-native";

import { color } from "../../utils";
const styles = StyleSheet.create({
  tabBar: {
    height: "10%",
    backgroundColor: color.white,
    marginBottom: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
    width: 140,
  },
  tabSelected: {
    borderBottomWidth: 2,
  },
});

const styleFlatlist = StyleSheet.create({
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
  img: {
    width: "100%",
    height: "100%",
  },
  boxImg: {
    width: 90,
    height: 90,
  },
  contentCard: {
    flex: 1,
    paddingLeft: 10,
  },
});

export { styles, styleFlatlist };
