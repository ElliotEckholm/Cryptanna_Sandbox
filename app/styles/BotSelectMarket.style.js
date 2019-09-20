import { Colors } from "./global/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
    justifyContent: "space-around"
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white
  },
  price: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white
  },
  selectDays: {
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white
  },
  days: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white
  },
  implement: {
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.green,
    backgroundColor: Colors.darkGrayBackground,
    width: 100,
    height: 50
  },
  implementText: {
    padding: 10,
    color: Colors.green,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 60
  },
  detailText: {
    textAlign: "left",
    flexDirection: "row",
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold"
  },
  editInfo: {
    textAlign: "center",
    width: 50,
    flexDirection: "row",
    color: Colors.white,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: Colors.white
  },
  inputRowItem: {
    flex: 0.33,
    flexDirection: "row",
    justifyContent: "center"
  }
});
