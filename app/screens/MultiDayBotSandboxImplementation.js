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

import { addBotsSubCollection } from "../scripts/firebase.js";
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

    };
  }







  implementBot = () => {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;


    // console.log("Implementing Bot")
    // console.log(this.state.USDStartingBalance)
    // console.log(this.state.numberOfHistoricalDays)
    // console.log(this.state.lowHighDayWindow)

    multi_day_sandbox_strategy_function(this.state.numberOfHistoricalDays,this.state.lowHighDayWindow,this.state.USDStartingBalance);

    navigate("Sandbox", {botName: "Multiday Low and High Bot", firebaseBotName: "Sandbox_MultiDay_Bot"})

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
          <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold", color:"#797979"}}>
            {"\n Multiday Low and High Bot \n" + params.marketName + "\n\n"}
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
