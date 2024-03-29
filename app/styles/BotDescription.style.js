import { Colors } from "./global/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground
  },
  title: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white
  },
  description: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center"
  },
  h4: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white
  },
  imageContainer: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    paddingBottom: 20
  },
  botTitle: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: "bold"
  },
  description: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    paddingBottom: 10,
  }
});
