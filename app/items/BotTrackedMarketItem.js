import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
  } from 'react-native';
  import styles from '../styles/MarketItem.style.js';
import { Icon } from 'react-native-elements';
import TrackedMarkets from '../screens/TrackedMarkets.js';
import ccxt from 'ccxt';

export default class BotTrackedMarketItem extends Component {

    constructor(props) {
      super(props);
      // this._onSelectSymbol = this._onSelectSymbol.bind(this);
    }

    _onSelectMarket = () => {

      let exchange = this.props.exchange;
      let exchangeTitle = this.props.exchangeTitle;
      let marketName = this.props.marketName;
      let marketBalance = this.props.marketBalance;
      console.log("Market Item", exchange);
      const {navigate} = this.props.navigation;
      let botType = this.props.botType
      console.log("BOT TYPE: ",botType)


      if(botType == "Medium"){
        navigate('MediumBotSelectMarket', {exchangeTitle: exchangeTitle, exchange:exchange,marketName : marketName, marketBalance : marketBalance});

      }else if (botType == "Aggressive"){
        navigate('AggressiveBotSelectMarket', {exchangeTitle: exchangeTitle, exchange:exchange,marketName : marketName, marketBalance : marketBalance});

      }
      else if (botType == "Longterm"){
        navigate('LongtermBotSelectMarket', {exchangeTitle: exchangeTitle, exchange:exchange,marketName : marketName, marketBalance : marketBalance});

      }
    }

    render() {

        return(
          <TouchableOpacity onPress={this._onSelectMarket}>
            <View style={styles.rowContainer}>

              <View style={styles.rowText}>
               <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {this.props.marketName}
                </Text>
                <Text style={styles.author} numberOfLines={2} ellipsizeMode ={'tail'}>
                {this.props.marketBalance}
                 </Text>

              </View>
            </View>
          </TouchableOpacity>
        );
    }
}
