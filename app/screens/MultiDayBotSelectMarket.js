import React, { Component } from "react";
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import Exchanges from "./Exchanges.js";
import ExchangeItem from "../items/ExchangeItem.js";
import MarketItem from "../items/MarketItem.js";
import ccxt from "ccxt";
import Styles from "../styles/BotSelectMarket.style";

import { MultiDayBotClass, AggressiveBotClass, MACDBotClass, fetchHistory } from "../scripts/Bots_Database.js";

import { addBotsSubCollection } from "../scripts/firebase.js";
import {
  fetchTicker,
  fetchMarket_badway,
  fetchMarkets_Item_Info,
  fetchTicker_promise
} from "../scripts/ccxt.js";

let marketLoaded = false;



export default class SelectMarket extends Component {
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
    };
  }



  _displayPriceExtrema = data => {

    const { params } = this.props.navigation.state;
    this.state.rangeData = data;
    this.state.daySelected = data.selectedMaximum;

    this.state.exchange = params.exchange;
    // let tempExchange = params.exchange
    this.state.marketName = params.marketName;
    this.state.marketBalance = params.marketBalance;

    setTimeout(() => {

      var marketName = params.marketName;
      var exchange = params.exchange;
      // buy on day low and high
      var priceExtrema = 0.0;
      let minPrice = 0

      priceExtrema = fetchHistory(
        exchange,
        this.state.marketName.replace("-", "/"),
        this.state.daySelected
      ).then(priceExtrema => {
        minPrice = priceExtrema[0];
        maxPrice = priceExtrema[1];
        console.log("\n\nIn Render Min Price: " + minPrice);
        console.log("In Render Max Price: " + maxPrice);

        this.setState({ minPrice, maxPrice });
      });
    }, 1000);
  };



  _onImplementBot = () => {
    const { params } = this.props.navigation.state;


    let bot = new MultiDayBotClass(
      params.exchange.name.toString(),
      params.marketName,
      false,
      params.marketBalance,
      this.state.btc_amount,
      this.state.usd_amount,
      this.state.daySelected,
    );

    // let bot = new MACDBotClass(this.state.exchange,this.state.marketName,false, params.marketBalance, 0.5, 0.5);

    Alert.alert(
      "Adding Bot",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            addBotsSubCollection(bot);

          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />

        <View>
          <Text style={Styles.title}>
            {"Multiday Low and High Bot \n" + params.marketName + " Market" + " on " + params.exchange.name}{" "}
          </Text>
          <Text style={Styles.price}>
            {"Current Holdings: " +
              params.marketBalance +
              " " +
              params.marketName.substring(0, params.marketName.indexOf("-"))}
          </Text>

          <Text style={Styles.days}>
            {"From the Last " + this.state.daySelected + " Days:"}
          </Text>
          <Text style={Styles.price}>
            {"Low: " + this.state.minPrice + " USD"}{" "}
          </Text>
          <Text style={Styles.price}>
            {"High: " + this.state.maxPrice + " USD"}
          </Text>

          <Text style={Styles.selectDays}>
            Select Day Range for Bot to Buy at Lows and Sell at Highs:
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>

        </View>

        <View style={Styles.inputRow}>
          <Text style={Styles.detailText}>Allow Bot to Use</Text>
          <TextInput
            style={Styles.editInfo}
            onChangeText={btc_amount => this.setState({ btc_amount })}
            value={this.state.btc_amount}
            placeholder="0.0"
            placeholderTextColor="white"
            height={40}
          />
          <Text style={Styles.detailText}>BTC</Text>
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
          <TouchableOpacity onPress={this._onImplementBot}>
            <View style={Styles.implement}>
              <Text style={Styles.implementText}>Add Bot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
