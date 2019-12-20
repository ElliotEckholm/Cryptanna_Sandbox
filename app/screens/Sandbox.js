//////////////UI imports//////////////
import React, { Component } from "react";
import { Text, View } from "react-native";
import Styles from "../styles/Sandbox.style";
import BuyButton from "../buttons/BuyButton.js";
import SellButton from "../buttons/SellButton.js";
import SandboxPriceLineGraph from "../charts/Sandbox_Price_Line_Graph.js";
import Exchanges from "./Exchanges.js";
import Spinner from "./../config/Spinner";
import firebase from "react-native-firebase";


import ccxt from "ccxt";
import * as d3 from "d3";
import Morph from "art/morph/path";

import { fetchTicker, sandbox_exchange } from "../scripts/ccxt.js";
import {
  writeSandBoxBalance,
  fetchSandBoxBalance,
  fetchSandboxBotData,
  fetchSandboxBotTradeHistory
} from "../scripts/firebase.js";

let marketLoaded = false;

export default class Sandbox extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.runInterval = true;
    this.state = {
      marketObj: [],
      buyAmount: "",
      currentPrice_string: "",
      currentPrice: "",
      USDBalance: "",
      BTCBalance: "",
      loading: true,
      sandboxBotTradeHistory:[],
      sandboxBotFieldData:{},
      botFieldDataLoading: true,
      botTradingHistoryLoading: true,

    };
  }

  componentDidMount() {


    // this.props.navigation.addListener("willFocus", route => {
      this.waitForSandboxDataFetch();
      this.waitForTickerFetch();
      this.waitForSandboxBalanceFetch()

      // console.log("screen mounted!", this.runInterval);
    // });

    // this.props.navigation.addListener("didBlur", route => {
    //   this.runInterval = false;
    //   // console.log("\n\n\nunmounted in sandbox", this.runInterval);
    // });

  }

  waitForSandboxDataFetch = async() => {

    fetchedSandboxBotData = []
    await fetchSandboxBotData(fetchedSandboxBotData).then(()=>{
      this.setState({sandboxBotFieldData: fetchedSandboxBotData[0], botFieldDataLoading:false})

    })

  }

  waitForTickerFetch = async()=> {

    let market = "BTC/USD";

    let exchangeTitle = "coinbasepro";
    let exchange = new ccxt[exchangeTitle]();
    let marketInfo = {};


    fetchTicker(exchange, market, marketInfo)
      .then(() => {
        marketLoaded = true;
        this.setState(previousState => {
          return { marketObj: marketInfo };
        });

        this.state.currentPrice_string =
          "Current Price of Bitcoin: $" +
          Number(marketInfo.info.price).toFixed(2);
        this.setState({
          currentPrice: Number(marketInfo.info.price).toFixed(2),

        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  waitForSandboxBalanceFetch = async()=> {
    let pulledSandboxBalance = [];
    fetchSandBoxBalance(pulledSandboxBalance);

    setTimeout(() => {
      if (pulledSandboxBalance[0] != undefined) {
        pulledSandboxBalance[0].forEach(balance => {
          if (balance.name == "USD") {
            this.setState({ USDBalance: balance.holdings });
          }
          if (balance.name == "BTC") {
            this.setState({ BTCBalance: balance.holdings });
          }
        });
      } else {
        let placeHolderObj = {
          name: "",
          holdings: 0.0
        };
        this.setState({ balanceList: [placeHolderObj] });
      }
    }, 2000);
  }

  onPress = () => {
    // console.log("on press clicked");
    this.setState({ buyButtonClicked: true });
    setTimeout(() => {
      this.setState({ buyButtonClicked: false });
    }, 1000);
  };

  showCurrentBitcoinPrice() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <Text style={Styles.priceText}>{this.state.currentPrice_string}</Text>
    );
  }

  showFinalMargin = () => {
    if ((this.state.sandboxBotFieldData.finalProfitMargin - this.state.sandboxBotFieldData.USDStartingBalance) <= 0){
      return (
        <Text style={Styles.finalLossMargin}>
         Margin: ${Math.round(this.state.sandboxBotFieldData.finalProfitMargin - this.state.sandboxBotFieldData.USDStartingBalance)}
        </Text>
      )
    }else{
      return (
        <Text style={Styles.finalProfitMargin}>
         Margin: ${Math.round(this.state.sandboxBotFieldData.finalProfitMargin - this.state.sandboxBotFieldData.USDStartingBalance)}
        </Text>
      )
    }
  }

  loading = ()=>{
    if (this.state.botFieldDataLoading && this.state.botTradingHistoryLoading){
      return (
        <View style={{ paddingTop: "50%" }}>
          <Spinner />
        </View>
      );
    }else{
      console.log(this.state.sandboxBotFieldData);
      return (
        <View style={Styles.container}>
          <View style={{ flex: 0.1 }}>
            <Text style={Styles.title}> SANDBOX </Text>
          </View>

          <View
            style={{
              flex: 0.65,
              flexDirection: "column",
              justifyContent: "space-around"
            }}
          >

            <Text style={Styles.botName}>
              {
                this.state.sandboxBotFieldData.botName.replace("_"," ").replace("_"," ")
              }
            </Text>

            <Text style={Styles.balance}>
              Starting Balance: ${Math.round(this.state.sandboxBotFieldData.USDStartingBalance)} {"\n"}
              Ending Balance: ${Math.round(this.state.sandboxBotFieldData.finalProfitMargin)}
            </Text>

            {this.showFinalMargin()}


            <SandboxPriceLineGraph btcBalance={this.state.BTCBalance} timeFrame={this.state.sandboxBotFieldData.maxHistoricalTime} />

            {
              // this.showCurrentBitcoinPrice()
            }
          </View>

          <View style={{ flex: 0.25 }}>
            <BuyButton onPress={this.onPress} runInterval={this.runInterval} />

            <SellButton runInterval={this.runInterval} />
          </View>
        </View>
      );
    }
  }

  render() {
    return <View style={Styles.container}>{this.loading()}</View>;
  }
}
