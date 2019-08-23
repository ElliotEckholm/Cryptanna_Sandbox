import React, { Component } from "react";
import { StatusBar, FlatList, Text, View, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import Exchanges from "./Exchanges.js";
import ExchangeItem from "../items/ExchangeItem.js";
import BotTrackedMarketItem from "../items/BotTrackedMarketItem.js";
import { pullTrackedMarketDocuments } from "../scripts/firebase.js";
import ccxt from "ccxt";
import Styles from "../styles/Markets.style";
import Spinner from "./../config/Spinner";

import {
  fetchMarkets_Item_Info,
  fetchTicker,
  fetchBalance
} from "../scripts/ccxt.js";

// TODO take out this global markets -- Elliot
let markets = [];

export default class TrackedMarkets extends Component {
  state = {
    markets,
    data: [],
    prices: [],
    loading: true,
    marketList: [],
    botType: ""
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    console.log("Tracked Markets: ", params.botType);

    this.setState({ botType: params.botType });

    console.log("Params exchange!", params.exchange);
    pulledMarketList = [];
    pullTrackedMarketDocuments(params.exchangeTitle, pulledMarketList);

    setTimeout(() => {
      let _marketList = [];

      pulledMarketList.forEach(function(market, id) {
        let marketObj = {};
        marketObj.id = id;
        marketObj.exchangeTitle = market.exchange;
        marketObj.marketBalance = market.marketBalance;
        marketObj.marketName = market.marketName;
        marketObj.exchange = params.exchange;
        _marketList.push(marketObj);
      });

      console.log("Set Market object", _marketList);
      this.setState({ marketList: _marketList, loading: false });
    }, 2000);
  }

  _renderItem = ({ item }) => (
    <BotTrackedMarketItem
      id={item.id}
      exchange={item.exchange}
      marketBalance={item.marketBalance}
      marketName={item.marketName}
      navigation={this.props.navigation}
      botType={this.state.botType}
    />
  );

  loading() {
    if (this.state.loading) {
      return (
        <View style={{ marginTop: 100 }}>
          <Spinner />
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.marketList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    const { params } = this.props.navigation.state;
    const { navigation } = this.props;

    let exchangeTitle = params.exchangeTitle
      .toString()
      .replace("_", "")
      .toUpperCase();
    // let marketTitle = params.marketTitle.toString();

    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={Styles.title}>{exchangeTitle}</Text>
        <Text style={Styles.h4}>Select Market:</Text>

        {this.loading()}
      </View>
    );
  }
}
