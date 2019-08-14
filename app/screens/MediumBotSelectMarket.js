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

import {BasicBotClass} from '../scripts/Bots_Database.js';

import {addBotsSubCollection} from '../scripts/firebase.js';
import {fetchTicker,fetchMarket_badway,fetchMarkets_Item_Info,fetchTicker_promise} from '../scripts/ccxt.js';

let marketLoaded = false;

export default class SelectMarket extends Component {


  constructor(props) {
    super(props);
    this.state = {
      marketObj:[],
      btc_amount:0.0,
      usd_amount: 0.0,

    };



  }

  _onImplementBot = () => {
    const { params } = this.props.navigation.state;

    let bot = new BasicBotClass(params.exchange,params.marketName,false, params.marketBalance, this.state.btc_amount, this.state.usd_amount);


    Alert.alert(
      'Adding Bot',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => {
          console.log('OK Pressed')
          addBotsSubCollection(bot);
        } }
      ],
      { cancelable: false }
    );



    // bot.strategy.basic_strategy_function();

  }


  render() {

    const { params } = this.props.navigation.state;

    return (
      <View style={Styles.container}>
        <StatusBar
          barStyle="light-content"
        />

        <View >
          <Text style={Styles.title}>{'Medium Trader \n' +params.marketName+' Market'} </Text>
          <Text style={Styles.price}> {'Current Holdings: '+params.marketBalance+' '+params.marketName.substring(0, params.marketName.indexOf('-'))}</Text>



        </View>
        <View style = {Styles.inputRow}>
            <Text style = {Styles.detailText}>
              Basic Trader will Buy
            </Text>
            <TextInput
            style = {Styles.editInfo}
            onChangeText={btc_amount => this.setState({ btc_amount })}
            value={this.state.btc_amount}
            placeholder="0.0"
            placeholderTextColor="white"
            height = {40}
            />
            <Text style = {Styles.detailText}>
              BTC
            </Text>
        </View>

        <View style = {Styles.inputRow}>
            <Text style = {Styles.detailText}>
              For the Price of
            </Text>
            <TextInput
            style = {Styles.editInfo}
            onChangeText={usd_amount => this.setState({ usd_amount })}
            value={this.state.usd_amount}
            placeholder="0.0"
            placeholderTextColor="white"
            height = {40}
            />
            <Text style = {Styles.detailText}>
              USD
            </Text>
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
