import { Colors } from "./global/colors";

import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { colors } from "react-native-elements";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.darkGrayBackground,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: "90%",
    height: 60
  },
  inputTitle: {
    width: "90%"
  },
  button: {
    backgroundColor: "#21CE99",
    borderRadius: 5,
    height: 40,
    width: wp("80%")
  },
  disabledButtonTitle: {},
  disabledButton: {
    backgroundColor: Colors.lightBlue
  },
  terms: {
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center", // <-- the magic
    color: Colors.white
  },
  termsLink: {
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center", // <-- the magic
    color: Colors.red
  },
  titleImage: {
    paddingTop: 10
  }
});
