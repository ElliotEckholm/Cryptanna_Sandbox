import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View
} from 'react-native';
import styles from '../styles/ExchangeItem.style.js';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import ccxt from 'ccxt';
import { fetchMarkets } from '../scripts/ccxt.js';

export default class ExchangeItem extends Component {

    _onSelectExchange = () => {


      let id = this.props.id;
      let exchangeTitle = this.props.title;
      const {navigate} = this.props.navigation;
    
      navigate('Markets', {exchange_id: id, exchangeTitle: exchangeTitle});
    }


    render() {
        return(
          <TouchableOpacity onPress={this._onSelectExchange}>
            <View style={styles.rowContainer}>
              <Image source={{uri: this.props.thumbnail}}
              style={styles.thumbnail}
              resizeMode="contain" />

            </View>
          </TouchableOpacity>
        );
    }
}
