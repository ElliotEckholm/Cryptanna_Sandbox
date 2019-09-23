import { Colors } from "./global/colors";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  bodyContainer: {
    flex: 0.9
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    paddingTop: 30
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white
  },
  text: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    textAlign: "left",
    fontWeight: "bold"
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    justifyContent: "center"
  }
});
