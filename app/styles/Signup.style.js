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
    justifyContent: "space-around"
  },
  formContainer: {
    width: "90%",
    marginLeft: 20,
    marginRight: 20
  },
  inputContainer: {
    width: "100%",
    height: 60
  },
  inputTitle: {
    width: "90%"
  },
  button: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 5,
    height: 50,
    width: "100%",
    fontSize: 16
  },
  disabledButton: {
    backgroundColor: Colors.lightBlue
  },
  terms: {
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: Colors.white
  },
  termsLink: {
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: Colors.lightBlue
  }
});
