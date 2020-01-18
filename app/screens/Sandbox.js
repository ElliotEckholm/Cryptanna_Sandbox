//////////////UI imports//////////////
import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
  fetchSandboxBotTradeHistory,
  addSandBoxSubCollection,
  deleteAllSandboxBots
} from "../scripts/firebase.js";

let marketLoaded = false;

export default class Sandbox extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.runInterval = true;
    this.state = {
      marketObj: [],
      currentPrice_string: "",
      currentPrice: "",
      currentPriceLoading: true,
      sandboxBotFieldData:{},
      botFieldDataLoading: true,
      USDStartingBalance: 2000.0,
      finalProfitMargin: 0.0,
      maxHistoricalTime: 300,
      sandBoxBalanceObject:{},
      sandBoxBalanceLoading: true,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", route => {
      this.waitForSandboxDataFetch();
      this.waitForTickerFetch();
      this.waitForSandboxBalanceFetch();

    });

    // this.props.navigation.addListener("didBlur", route => {
    //   this.runInterval = false;
    //   // console.log("\n\n\nunmounted in sandbox", this.runInterval);
    // });

  }


  waitForSandboxDataFetch = async() => {

    fetchedSandboxBotData = []
    await fetchSandboxBotData(fetchedSandboxBotData).then(()=>{
      // console.log("Bot Data: ", fetchedSandboxBotData)
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
          currentPriceLoading: false,

        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  waitForSandboxBalanceFetch = async()=> {
    let pulledSandboxBalance = [];
    await fetchSandBoxBalance(pulledSandboxBalance).then(()=>{

      // console.log("Pulled Sandbox Balance: ",pulledSandboxBalance[0]);
      this.setState({sandBoxBalanceObject: pulledSandboxBalance[0], sandBoxBalanceLoading: false})
    });
  }
  restartSandbox = () => {

    deleteAllSandboxBots();

    let defaultSandboxObject = {
      starting_usd_balance: 1000000,
      current_usd_balance: 1000000,
      starting_btc_balance: 0.0,
      current_btc_balance: 0.0,

    }
    writeSandBoxBalance(defaultSandboxObject);


  }

  onPress = () => {
    // console.log("on press clicked");
    this.setState({ buyButtonClicked: true });
    setTimeout(() => {
      this.setState({ buyButtonClicked: false });
    }, 1000);
  };

  showCurrentBitcoinPrice() {
    if (this.state.currentPriceLoading) {
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

  renderBotData(){
    if(this.state.sandboxBotFieldData && this.state.sandBoxBalanceObject){
      return (

        <View>
        <Text style={Styles.balance}>
          Starting Balance: ${Math.round(this.state.sandBoxBalanceObject.starting_usd_balance)} {"\n"}
          Current Balance: ${Math.round(this.state.sandBoxBalanceObject.current_usd_balance)}
        </Text>
        <Text style={Styles.botName}>
            {
              this.state.sandboxBotFieldData.botName.replace("_"," ").replace("_"," ")
            }
          </Text>

          <Text style={Styles.balance}>
            Starting Bot Balance: ${Math.round(this.state.sandboxBotFieldData.USDStartingBalance)} {"\n"}
            Current Bot Balance: ${Math.round(this.state.sandboxBotFieldData.finalProfitMargin)}
          </Text>
          {this.showFinalMargin()}

          <SandboxPriceLineGraph/>
        </View>
      )
    }else if(this.state.sandBoxBalanceObject){
      return (

        <View>
        <Text style={Styles.balance}>
          Starting Balance: ${Math.round(this.state.sandBoxBalanceObject.starting_usd_balance)} {"\n"}
          Current Balance: ${Math.round(this.state.sandBoxBalanceObject.current_usd_balance)}
        </Text>
          
        <SandboxPriceLineGraph/>
        </View>
      )
    }
    else{
      return (

        <View>
          <Text style={Styles.balance}>
            Starting Balance: ${Math.round(this.state.USDStartingBalance)} {"\n"}
            Current Balance: ${Math.round(this.state.finalProfitMargin)}
          </Text>
          <SandboxPriceLineGraph/>
        </View>
      )
    }

  }

  loading = ()=>{
    if (this.state.botFieldDataLoading || this.state.sandBoxBalanceLoading){
      return (
        <View style={{ paddingTop: "50%" }}>
          <Spinner />
        </View>
      );
    }else{
      // console.log("Bot Sanbox Object: ",this.state.sandBoxBalanceObject);
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

            {this.renderBotData()}


            {
              this.showCurrentBitcoinPrice()
            }
          </View>

          <View style={{ flex: 0.25 }}>
            <BuyButton onPress={this.onPress} runInterval={this.runInterval} currentPrice={this.state.currentPrice_string} sandboxObject = {this.state.sandBoxBalanceObject}/>

            {
            // <SellButton runInterval={this.runInterval} />
          }
          </View>
          <View style={{paddingBottom: 10}}>
            <TouchableOpacity onPress={this.restartSandbox}>
              <View style={Styles.restartButton}>

                <Text style={Styles.restartText} >
                  Restart Sandbox
                </Text>

              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  render() {
    return <View style={Styles.container}>{this.loading()}</View>;
  }
}
