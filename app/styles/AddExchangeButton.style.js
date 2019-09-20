import { Colors } from "./global/colors";

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.green
  },
  buttonContainer: {
    flexDirection: "column",
    borderWidth: 2,
    borderColor: Colors.green,
    padding: 20,
    backgroundColor: Colors.darkGray
  }
});
