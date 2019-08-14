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
import Markets from '../screens/Markets.js';
import SelectMarket from '../screens/SelectMarket.js';
import ccxt from 'ccxt';

export default class MarketItem extends Component {

    constructor(props) {
      super(props);
      this._onSelectSymbol = this._onSelectSymbol.bind(this);
    }

    _onSelectSymbol = () => {
      // let title = this.props.title;
      // let exchangeTitle = this.props.exchange;
      // let exchange_id = this.props.exchange_id;
      // console.log("Market Item", exchangeTitle);
      // const {navigate} = this.props.navigation;
      //
      //
      //
      // navigate('SelectMarket', {exchange: exchangeTitle, marketTitle : title, exchange_id : exchange_id});
    }

    render() {
      <MarketItem navigation={this.props.navigation} />

        return(
          <TouchableOpacity onPress={this._onSelectSymbol}>
            <View style={styles.rowContainer}>

              <View style={styles.rowText}>
               <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                {this.props.title}
                </Text>
                <Text style={styles.author} numberOfLines={2} ellipsizeMode ={'tail'}>
                {this.props.author}
                 </Text>

              </View>
            </View>
          </TouchableOpacity>
        );
    }
}
