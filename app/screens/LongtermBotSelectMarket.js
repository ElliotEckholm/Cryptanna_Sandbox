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
import RangeSlider from "react-native-range-slider";

import { LongtermBotClass, AggressiveBotClass, BasicBotClass, fetchHistory } from "../scripts/Bots_Database.js";

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


  // fetchHistory = async (exchange, market,timeFrame) => {
  //   let historyExchange = {};
  //   historyExchange = exchange;
  //
  //   let min = parseFloat(Infinity);
  //   let max = parseFloat(-Infinity);
  //
  //   //convert timeFrame given in days to UTC time
  //   let d = new Date();
  //   d.setDate(d.getDate() - (timeFrame + 1));
  //   let parsedUnixTime = d.getTime();
  //   // console.log('\n\n\n UTC time: ',parsedUnixTime);
  //
  //   console.log("\n\n\n Fetching History for Market: ", market);
  //   console.log("FETCH HISTORY TEST", historyExchange.timeframes);
  //   let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  //   if (historyExchange.has.fetchOHLCV) {
  //     await sleep(historyExchange.rateLimit); // milliseconds
  //     let historyList = [];
  //     historyList = await historyExchange.fetchOHLCV(
  //       market,
  //       "1d",
  //       parsedUnixTime,
  //       undefined,
  //       {}
  //     );
  //     historyList.reverse();
  //
  //     // console.log(historyList);
  //     // let openList = [];
  //     // let closeList = [];
  //     // let minList = [];
  //     // let maxList = [];
  //     // let yAxisArr = [];
  //     // let i;
  //
  //     let dataList = [];
  //
  //     for (i = 0; i <= historyList.length - 1; i++) {
  //       let d = new Date(historyList[i][0]);
  //       dataList.push("\n" + d.toLocaleDateString());
  //
  //       if (historyList[i][4] < min) {
  //         min = parseFloat(historyList[i][4]);
  //       }
  //       if (max < historyList[i][4]) {
  //         max = parseFloat(historyList[i][4]);
  //       }
  //     }
  //
  //     console.log("\n\n-----FETCH History Info-----\n\n");
  //     console.log("Data List: " + historyList);
  //     console.log("Data List Length: " + dataList.length);
  //     console.log("History Timeframe: " + timeFrame);
  //     console.log("History Length: " + historyList.length);
  //     console.log("In History Function Min Price: " + min);
  //     console.log("Max Price: " + max);
  //
  //     let priceExtremaArray = [min, max];
  //
  //
  //     return priceExtremaArray;
  //   }
  // }


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


    let bot = new LongtermBotClass(
      params.exchange.name.toString(),
      params.marketName,
      false,
      params.marketBalance,
      this.state.btc_amount,
      this.state.usd_amount,
      this.state.daySelected,
    );

    // let bot = new BasicBotClass(this.state.exchange,this.state.marketName,false, params.marketBalance, 0.5, 0.5);

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
          <RangeSlider
            disableRange
            lineHeight={2}
            handleDiameter={18}
            minValue={0}
            maxValue={100}
            selectedMaximum={50}
            style={{ flex: 1, height: 70, marginTop: 20, padding: 10 }}
            onChange={data => {
              this._displayPriceExtrema(data);
            }}
          />
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
