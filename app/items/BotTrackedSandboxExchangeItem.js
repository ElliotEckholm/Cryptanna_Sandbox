import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import styles from '../styles/BotTrackedExchangeItem.style.js';
import { Icon } from 'react-native-elements';
import TrackedMarkets from '../screens/TrackedMarkets.js';
import ccxt from 'ccxt';
import { fetchMarkets } from '../scripts/ccxt.js';
import { Colors, red_shades } from "../styles/global/colors.js";

export default class BotTrackedSandboxExchangeItem extends Component {

    _onSelectExchange = () => {


      let id = this.props.id;
      let exchangeTitle = 'coinbasepro';
      let sandboxExchange = new ccxt['coinbasepro'] ();
      const {navigate} = this.props.navigation;
      let botType = this.props.botType;
      let marketName = "BTC/USD";
      let marketBalance = 1000000;

      console.log("\nIn Sandbox Exchange Item")
      console.log(id)
      console.log(botType)
      console.log(exchangeTitle)
      console.log(sandboxExchange)

      console.log("Exchange BOT TYPE: ",botType);

      if (botType == 'MACD'){
        navigate('MACDBotSandboxImplementation', {exchange_id: id, exchangeTitle: exchangeTitle, exchange: sandboxExchange, botType:this.props.botType,marketName : marketName, marketBalance : marketBalance});

      }
      else if (botType == 'MultiDay'){
        navigate('MultiDayBotSandboxImplementation', {exchange_id: id, exchangeTitle: exchangeTitle, exchange: sandboxExchange, botType:this.props.botType,marketName : marketName, marketBalance : marketBalance});

      }

    }


    render() {
        return(
          <TouchableOpacity onPress={this._onSelectExchange}>
            <View style={styles.rowContainer}>
              <Text style={{flex: 1, color:Colors.lightBlue, fontWeight: 'bold', fontSize: 22, alignSelf:'center', justifyContent: 'center',textAlign: 'center'}}>Sandbox</Text>

            </View>
          </TouchableOpacity>
        );
    }
}
