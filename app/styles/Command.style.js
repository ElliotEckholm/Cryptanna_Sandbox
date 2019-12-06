import { Colors } from "./global/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    paddingTop: 30
  },
  title: {
    fontSize: 28,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center"
  },
  infoBtn: {
    height: 25,
    width: 25,
    tintColor: "white"
  },
  balanceContainer: {
    flex: 0.1
  },
  balanceText: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center"
  },
  text: {
    color: Colors.white,
    fontSize: 16
  },
  graphContainer: {
    flex: 0.50,
    borderBottomWidth:1,
    borderColor:'#fff'
  },
  graphs: {
    flex: 0.9,
  },
  toggleContainer: {
    flex: 0.1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  toggleSwitch: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  exchangesContainer: {
    flex: 0.4
  },
  topContainer: {
    flex: 0.3,
    // borderBottomWidth: 2,
    // borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20
  },
  infoContainer: {
    flex: 0.1,
    justifyContent: "center"
  },
  addExchange: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center"
  },
  btnImage: {
    tintColor: "white",
    height: 25,
    width: 25
  }
});
