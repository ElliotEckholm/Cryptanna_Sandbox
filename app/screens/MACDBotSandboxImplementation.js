import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Exchanges from './Exchanges.js';
import ExchangeItem from '../items/ExchangeItem.js';
import MarketItem from '../items/MarketItem.js';
import ccxt from 'ccxt';
import Styles from "../styles/BotSelectMarket.style";

import {MACD_strategy_function} from '../scripts/Bots_Database.js';

import {addBotsSubCollection, fetchSandBoxBalance} from '../scripts/firebase.js';
import {fetchTicker,fetchMarket_badway,fetchMarkets_Item_Info,fetchTicker_promise} from '../scripts/ccxt.js';

let marketLoaded = false;

export default class SelectMarket extends Component {


  constructor(props) {
    super(props);
    this.state = {
      marketObj:[],
      btc_amount:0.0,
      usd_amount: 0.0,
      numberOfHistoricalDays: 0,
      USDStartingBalance: 0.0,
      sandBoxBalanceObject: {},
      loadingSandboxBalance: true,

    };



  }

  componentDidMount(){

    this.props.navigation.addListener("willFocus", route => {
      this.waitForSandboxBalanceFetch();

    });



  }

  waitForSandboxBalanceFetch = async()=> {
    pulledSandboxBalance = [];
    await fetchSandBoxBalance(pulledSandboxBalance).then(()=>{

      console.log("Pulled Sandbox Balance: ",pulledSandboxBalance[0]);
      this.setState({sandBoxBalanceObject: pulledSandboxBalance[0], loadingSandboxBalance: false})

    });
  }

  _onImplementBot = () => {

    if (this.state.numberOfHistoricalDays > 300){
      Alert.alert(
        "Use a Lower Historical Timeframe",
        "300 Days is the Max Historical Timeframe",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }else{

      const { params } = this.props.navigation.state;
      const { navigate } = this.props.navigation;

      console.log("Sandbox Balance For MACD Bot: ", this.state.sandBoxBalanceObject)


      MACD_strategy_function(this.state.numberOfHistoricalDays, this.state.USDStartingBalance,this.state.sandBoxBalanceObject)

      navigate("Sandbox", {botName: "MACD Bot", firebaseBotName: "Sandbox_MACD_Bot"})
    }

  }


  render() {

    const { params } = this.props.navigation.state;

    return (
      <View style={Styles.container}>
        <StatusBar
          barStyle="light-content"
        />

        <View >
        <Text style={Styles.title}>
          {"SandBox"}
        </Text>
        <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold", color:"#797979"}}>
          {"\n Moving Average Bot \n" + params.marketName + "\n\n"}
        </Text>

        <Text style={{textAlign: "center", fontSize: 16, fontWeight: "bold", color:"#797979", paddingBottom: 20}}>
          Trades on long term Exponential Moving Average and short term
          Exponential Moving Average intersections to predict market trend. If
          market is predcicted to move upwards, the bot will buy. If
          the market is predcicted to move downwards, the bot will sell. 300 Days is the Max Historical Timeframe.
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
          <Text style={Styles.detailText}>   Days In the Past </Text>
        </View>

      </View>

        <TouchableOpacity onPress={this._onImplementBot}>
        <View style={Styles.implement}>
          <Text style={Styles.implementText}>
            Add Bot
          </Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}
