//////////////UI imports//////////////
import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Styles from "../styles/ExchangeDescription.style";
import { BasicBotClass, AdvancedBotClass } from "../scripts/Bots_Database.js";
import Spinner from "./../config/Spinner";
import { SearchBar } from "react-native-elements";
import BotTrackedExchangeItem from "../items/BotTrackedExchangeItem";
import { sandbox_exchange } from "../scripts/ccxt.js";
import {
  pullTrackedExchangesDocuments,
  pullTrackedMarketDocuments
} from "../scripts/firebase.js";
import Balance_Pie_Chart from "../charts/Balance_Pie_Chart.js";

import MarketComponent from "../components/marketComponent.js";

/////////////Functionality imports//////////
import ccxt from "ccxt";

const { width } = Dimensions.get("window");

let exchangeList = [];

export default class ExchangeDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketList: [],
      selectedBot: "",
      exchangeList: [],
      data: [],
      exchange: "",
      loading: true
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3500);

    exchangeTitle = params.exchangeName
      .toString()
      .replace(/\s/g, "")
      .toLowerCase();

    this.state.exchange = params.exchange;

    setInterval(() => {
      pulledMarketList = [];
      pullTrackedMarketDocuments(exchangeTitle, pulledMarketList);

      setTimeout(() => {
        let _marketList = [];

        pulledMarketList.forEach(function(market, id) {
          let marketObj = {};

          marketObj.id = id;
          marketObj.exchange = market.exchange;
          marketObj.marketBalance = market.marketBalance;
          marketObj.marketName = market.marketName.replace("-", "/");

          if (marketObj.marketName != "USD/USD") {
            _marketList.push(marketObj);
          }
        });
        this.setState({ marketList: _marketList, loading: false });
        console.log("setInterval in Exchange Description!");
      }, 1000);
    }, 2000);
  }

  loading = () => {
    if (this.state.loading) {
      return (
        <View style={{ paddingTop: 100 }}>
          <Spinner />
        </View>
      );
    }

    const { params } = this.props.navigation.state;

    return (
      <ScrollView>
        {this.state.marketList.map(market => (
          <MarketComponent
            exchange={this.state.exchange}
            navigation={this.props.navigation}
            marketName={market.marketName}
            exchangeName={params.exchangeName}
          />
        ))}
      </ScrollView>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>{params.exchangeName}</Text>

        <Balance_Pie_Chart chart_exchange={this.state.exchange} />

        <View style={Styles.marketContainer}>
          <View style={Styles.marketTextContainer}>
            <Text style={Styles.marketText}>Markets</Text>
          </View>
          {this.loading()}
        </View>
      </View>
    );
  }
}
