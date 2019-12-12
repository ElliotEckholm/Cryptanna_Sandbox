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
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation;




    this.props.navigation.addListener("willFocus", route => {
      this.runInterval = true;
      // console.log("screen mounted!", this.runInterval);
    });

    this.props.navigation.addListener("didBlur", route => {
      this.runInterval = false;
      // console.log("\n\n\nunmounted in sandbox", this.runInterval);
    });

    setInterval(() => {
      if (this.runInterval == true) {

        // console.log("\n\nParams",this.props.navigation.params.firebaseBotName)


        fetchedSandboxBotData = []
        fetchSandboxBotData(fetchedSandboxBotData)

        fetchedSandboxBotTradeHistory = []
        fetchSandboxBotTradeHistory(fetchedSandboxBotTradeHistory)

        setTimeout(()=>{



          fetchedSandboxBotData.forEach(fieldData => {
            this.setState({sandboxBotFieldData: fieldData})
          })

          this.setState({sandboxBotTradeHistory: fetchedSandboxBotTradeHistory})

          // console.log(this.state.sandboxBotTradeHistory)

        },3000);

        // console.log("SET interval from Sandbox");
        const { params } = this.props.navigation.state;
        let market = "BTC/USD";

        let exchangeTitle = "coinbasepro";
        let exchange = new ccxt[exchangeTitle]();
        let marketInfo = {};
        let pulledSandboxBalance = [];

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
              loading: false
            });
          })
          .catch(err => {
            console.log(err);
          });

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
    }, 4000);
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

  render() {
    let currentPrice = JSON.stringify(this.state.marketObj.currentPrice);
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

          <Text style={Styles.balance}>
            {this.state.sandboxBotFieldData.botName}
          </Text>

          <Text style={Styles.balance}>
            Starting Balance: ${this.state.sandboxBotFieldData.USDStartingBalance} {"\n"}
            Ending Balance: ${this.state.sandboxBotFieldData.finalProfitMargin}
          </Text>
          <Text style={Styles.balance}>
           Profit/Loss Margin: ${this.state.sandboxBotFieldData.finalProfitMargin - this.state.sandboxBotFieldData.USDStartingBalance}
          </Text>



          <SandboxPriceLineGraph btcBalance={this.state.BTCBalance} tradeHistory={this.state.sandboxBotTradeHistory}/>

          {this.showCurrentBitcoinPrice()}
        </View>

        <View style={{ flex: 0.25 }}>
          <BuyButton onPress={this.onPress} runInterval={this.runInterval} />

          <SellButton runInterval={this.runInterval} />
        </View>
      </View>
    );
  }
}
