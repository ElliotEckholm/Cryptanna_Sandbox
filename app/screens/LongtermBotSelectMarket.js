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

import { LongtermBotClass, fetchHistory } from "../scripts/Bots_Database.js";

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
      usd_amount: 0.0,
      minPrice: 0.0,
      maxPrice: 0.0,
      maxDays: 0,
      daySelected: 0,
      rangeData: {}
    };
  }

  _displayPriceExtrema = data => {
    this.state.rangeData = data;

    this.state.daySelected = data.selectedMaximum;

    setTimeout(() => {
      const { params } = this.props.navigation.state;

      //
      //buy on day low and high
      let priceExtrema = [];
      // let minPrice = 0
      priceExtrema = fetchHistory(
        params.exchange,
        params.marketName.replace("-", "/"),
        this.state.rangeData.selectedMaximum
      ).then(priceExtrema => {
        minPrice = priceExtrema[0];
        maxPrice = priceExtrema[1];
        console.log("\n\nIn Render Min Price: " + minPrice);
        console.log("In Render Max Price: " + maxPrice);

        this.setState({ minPrice, maxPrice });

        // this.state.priceExtrema[1] = historyMaxPrice;
      });

      // console.log('Prices', this.state.priceExtrema);
    }, 1000);
  };

  _onImplementBot = () => {
    const { params } = this.props.navigation.state;

    let bot = new LongtermBotClass(
      params.exchange,
      params.marketName,
      false,
      params.marketBalance,
      this.state.btc_amount,
      this.state.usd_amount,
      this.state.rangeData.selectedMaximum
    );

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

    // bot.strategy.basic_strategy_function();
  };

  render() {
    const { params } = this.props.navigation.state;
    //
    //
    // console.log("\n\nIN RENDER: Max Price: " + maxPrice)
    // console.log("\n\nIN RENDER: Min Price: " + minPrice)

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />

        <View>
          <Text style={Styles.title}>
            {"Multiday Low and High Bot \n" + params.marketName + " Market"}{" "}
          </Text>
          <Text style={Styles.price}>
            {" "}
            {"Current Holdings: " +
              params.marketBalance +
              " " +
              params.marketName.substring(0, params.marketName.indexOf("-"))}
          </Text>

          <Text style={Styles.days}>
            {" "}
            {"From the Last " + this.state.daySelected + " Days:"}
          </Text>
          <Text style={Styles.price}> {"Low: " + this.state.minPrice + " USD"} </Text>
          <Text style={Styles.price}> {"High: " + this.state.maxPrice + " USD"}</Text>

          <Text style={Styles.selectDays}>
            Select Day Range for Bot to Buy at Lows and Sell at Highs:
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <RangeSlider
            disableRange={true}
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

        <View style={{paddingBottom:20}}>
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
