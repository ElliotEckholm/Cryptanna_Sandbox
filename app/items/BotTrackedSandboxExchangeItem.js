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

export default class BotTrackedSandboxExchangeItem extends Component {

    _onSelectExchange = () => {


      let id = this.props.id;
      let exchangeTitle = this.props.title;
      const {navigate} = this.props.navigation;
      let botType = this.props.botType;

      console.log("Exchange BOT TYPE: ",botType);

      navigate('TrackedMarkets', {exchange_id: id, exchangeTitle: exchangeTitle, exchange:this.props.exchange, botType:this.props.botType});
    }


    render() {
        return(
          <TouchableOpacity onPress={this._onSelectExchange}>
            <View style={styles.rowContainer}>
              <Text>Sandbox</Text>

            </View>
          </TouchableOpacity>
        );
    }
}
