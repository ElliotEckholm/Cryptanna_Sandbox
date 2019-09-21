import React, { Component } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import BotTrackedExchangeItem from "../items/BotTrackedExchangeItem";
import { pullTrackedExchangesDocuments } from "../scripts/firebase.js";
import styles from "../styles/BotDescription.style";
import Spinner from "./../config/Spinner";
import ccxt from "ccxt";

export default class LongTermBotDescription extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      selectedBotString: navigation.getParam("selectedBot"),
      selectedBot: "",
      exchangeList: [],
      data: [],
      loading: true
    };
  }

  componentWillMount() {
    pulledExchangeList = [];
    pullTrackedExchangesDocuments(pulledExchangeList);

    setTimeout(() => {
      let _exchangeList = [];

      pulledExchangeList.forEach(function(exchange, id) {
        let exchangeObj = {};

        let name = exchange.name
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");

        exchangeObj.id = id;
        exchangeObj.title = name;
        let setExchange = new ccxt[name]();
        setExchange.apiKey = exchange.apiKey;
        setExchange.secret = exchange.secret;
        setExchange.password = exchange.passphrase;

        //make sandbox custom url
        if (exchange.name == "gdax") {
          console.log("GDAX TEST");
          setExchange.urls.api = "https://api-public.sandbox.pro.coinbase.com";
        }

        let img = setExchange.urls.logo;
        exchangeObj.thumbnail = img.toString();
        exchangeObj.exchange = setExchange;
        _exchangeList.push(exchangeObj);
      });
      this.setState({ exchangeList: _exchangeList, loading: false });
    }, 2000);
  }

  searchFilterFunction_Exchanges(text) {
    const newData = this.state.exchangeList.filter(item => {
      const itemData = `${item.title.toUpperCase()}
    ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ Data: newData });
  }

  _renderItem = ({ item }) => (
    <BotTrackedExchangeItem
      id={item.id}
      title={item.title}
      thumbnail={item.thumbnail}
      exchange={item.exchange}
      navigation={this.props.navigation}
      botType="Longterm"
    />
  );

  renderExchanges = () => {
    return (
      <FlatList
        data={this.state.exchangeList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  };

  loading() {
    if (this.state.loading) {
      return (
        <View style={{ marginTop: 100 }}>
          <Spinner />
        </View>
      );
    }

    return (
      <FlatList
        ListEmptyComponent={this.renderExchanges}
        data={this.state.exchangeList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/White_Eye.png")} />
        </View>

        <Text style={styles.title}>Multiday Low and High Bot</Text>

        <Text style={styles.description}>
          User sets percentage of balance to use and selects the timeframe the
          bot will buy and sell at. For example the bot will buy at 10, 50, or
          100 day lows and sell at 10, 50, or 100 day highs.
        </Text>

        <Text style={styles.h4}>Select Exchange:</Text>

        {this.loading()}
      </View>
    );
  }
}
