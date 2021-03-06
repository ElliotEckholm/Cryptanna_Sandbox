import React, { Component } from "react";
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Slider
} from "react-native";
import Exchanges from "./Exchanges.js";
import ExchangeItem from "../items/ExchangeItem.js";
import MarketItem from "../items/MarketItem.js";
import ccxt from "ccxt";
import Styles from "../styles/BotSelectMarket.style";

import { multi_day_sandbox_strategy_function } from "../scripts/Bots_Database.js";

import { addBotsSubCollection,fetchSandBoxBalance } from "../scripts/firebase.js";
import {
  fetchTicker,
  fetchMarket_badway,
  fetchMarkets_Item_Info,
  fetchTicker_promise
} from "../scripts/ccxt.js";

let marketLoaded = false;



export default class MultiDaySandboxImplementation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketObj: [],
      btc_amount: 0.0,
      usd_amount: 0.5,
      minPrice: 0.0,
      maxPrice: 0.0,
      maxDays: 0,
      daySelected: 50,
      rangeData: {},
      exchange: {},
      marketName:"",
      exchangeTitle:"",
      numberOfHistoricalDays: 0,
      USDStartingBalance:0.0,
      lowHighDayWindow:0,
      sandBoxBalanceObject: {},

    };
  }

  componentDidMount(){

    this.props.navigation.addListener("willFocus", route => {
      this.waitForSandboxBalanceFetch();

    });

  }


  waitForSandboxBalanceFetch = async()=> {
    pulledSandboxBalance = [];
    await fetchSandBoxBalance(pulledSandboxBalance).then(()=>{

      // console.log("Pulled Sandbox Balance: ",pulledSandboxBalance[0]);
      this.setState({sandBoxBalanceObject: pulledSandboxBalance[0]})

    });
  }



  implementBot = () => {

    if (this.state.numberOfHistoricalDays > 300){
      Alert.alert(
        "Use a Lower Historical Timeframe",
        "300 Days is the Max Historical Timeframe",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else if (this.state.USDStartingBalance > this.state.sandBoxBalanceObject.current_usd_balance){
      Alert.alert(
        "Not enough USD Balance Available",
        "Use less starting balance",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else if (this.state.numberOfHistoricalDays > 0 && this.state.lowHighDayWindow > 0 && this.state.USDStartingBalance){
      const { params } = this.props.navigation.state;
      const { navigate } = this.props.navigation;

      // console.log("Sandbox Balance For Multiday Bot: ", this.state.sandBoxBalanceObject)


      multi_day_sandbox_strategy_function(this.state.numberOfHistoricalDays,this.state.lowHighDayWindow,this.state.USDStartingBalance,this.state.sandBoxBalanceObject);
      navigate("Sandbox", {botName: "Multiday Low and High Bot", firebaseBotName: "Sandbox_MultiDay_Bot"})

    }else{
      Alert.alert(
        "Please Input Values for Starting Balance, Historical Timeframe and Timeframe window",
        "Try again",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }


  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />

        <View>
          <Text style={Styles.title}>
            {"SandBox"}
          </Text>

          <Text style={Styles.sandboxBalance}>
            Current Balance: $ {Math.round(this.state.sandBoxBalanceObject.current_usd_balance)}
          </Text>

          <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold", color:"#797979"}}>
            {"\n Multiday Low and High Bot \n" + params.marketName + "\n\n"}
          </Text>

          <Text style={{textAlign: "center", fontSize: 16, fontWeight: "bold", color:"#797979", paddingBottom: 20}}>
            User selects the timeframe the bot will buy and sell at. For example the bot will buy at 10, 50, or
            100 day lows and sell at 10, 50, or 100 day highs. 300 Days is the Max Historical Timeframe.
          </Text>

          <View style={Styles.inputRow}>
            <Text style={Styles.detailText}>Starting Balance   $</Text>
            <TextInput
              style={Styles.editInfo}
              onChangeText={(text) => this.setState({ USDStartingBalance: text })}
              value={this.state.USDStartingBalance}
              placeholder="0.0"
              placeholderTextColor="white"
              height={40}
            />

          </View>




          <View style={Styles.inputRow}>
            <Text style={Styles.detailText}>Run Bot   </Text>
            <TextInput
              style={Styles.editInfo}
              onChangeText={(text) => this.setState({ numberOfHistoricalDays:text })}
              value={this.state.numberOfHistoricalDays}
              placeholder="0"
              placeholderTextColor="white"
              height={40}
            />
            <Text style={Styles.detailText}>   Days In the Past</Text>
          </View>
        </View>






        <View style={Styles.inputRow}>
          <Text style={Styles.detailText}>Check Low and High Every   </Text>
          <TextInput
            style={Styles.editInfo}
            onChangeText={(text) => this.setState({ lowHighDayWindow : text})}
            value={this.state.lowHighDayWindow}
            placeholder="0"
            placeholderTextColor="white"
            height={40}
          />
          <Text style={Styles.detailText}>   Days</Text>
        </View>

        {
          // <View style={Styles.inputRow}>
          //   <Text style={Styles.detailText}>For the Price of</Text>
          //   <TextInput
          //     style={Styles.editInfo}
          //     onChangeText={usd_amount => this.setState({ usd_amount })}
          //     value={this.state.usd_amount}
          //     placeholder="0.0"
          //     placeholderTextColor="white"
          //     height={40}
          //   />
          //   <Text style={Styles.detailText}>USD</Text>
          // </View>
        }

        <View style={{ paddingBottom: 20 }}>
          <TouchableOpacity onPress={this.implementBot}>
            <View style={Styles.implement}>
              <Text style={Styles.implementText}>Run Bot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
