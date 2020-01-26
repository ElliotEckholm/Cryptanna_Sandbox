import { Colors } from "./global/colors";
import { StyleSheet,Dimensions } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: 30
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.white
  },
  restartButton: {
    backgroundColor: Colors.darkGray,
    borderColor: '#fff',
    width:deviceWidth-225,
    height:35,
    borderRadius:4,
    alignSelf: 'center',
    borderWidth: 1,
    // shadowOffset:{width: 0,height: 0},
    // shadowColor: Colors.green,
    // shadowOpacity: 1.0,
    paddingTop:8
  },
  restartText: {
    color: Colors.white,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Colors.shadow,
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  balance: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    color: Colors.white
  },
  finalLossMargin: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    color: Colors.red
  },
  finalProfitMargin: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    color: Colors.green
  },
  botName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.lightBlue
  },
  priceText: {
    paddingTop: 90,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
    paddingBottom: 10
  }
});
