import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View
} from 'react-native';
import Exchanges from './Exchanges.js';
import ExchangeItem from '../items/ExchangeItem.js';
import MarketItem from '../items/MarketItem.js';
import ccxt from 'ccxt';
import Styles from "../styles/SelectMarket.style";

import {fetchTicker,fetchMarket_badway,fetchMarkets_Item_Info,fetchTicker_promise} from '../scripts/ccxt.js';

let marketLoaded = false;

export default class SelectMarket extends Component {


  constructor(props) {
    super(props);
    this.state = {
      marketObj:[]
    };

    let refresh = setInterval(() => {
      const { params } = this.props.navigation.state;
      let market = params.marketTitle;
      let exchange_id = params.exchange_id;
      let exchangeTitle = ccxt.exchanges[exchange_id].toString();
      let exchange = new ccxt[exchangeTitle] ();
      let marketInfo= {};

      // console.log(exchange);

      fetchTicker(exchange,market,marketInfo)
      .then(() => {
          marketLoaded = true;
          // You probably want to this.setState here so
          // the new data can be rendered to the screen
          // console.log(marketInfo);
          this.setState(previousState => {
            return ({ marketOobj : marketInfo });
          });
      })
      .catch(err => {
          //get any errors and log them here
          console.log(err);
      })

      setTimeout(() => {
          // console.log('after setTimeout: ')
          // console.log(this.state.marketObj.bid)
      }, 2000)

    }
    ,2000);

  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    let market = params.marketTitle;
    let exchange_id = params.exchange_id;
    let exchangeTitle = ccxt.exchanges[exchange_id].toString();
    let exchange = new ccxt[exchangeTitle] ();
    let marketInfo= {};

    // console.log(exchange);

    fetchTicker(exchange,market,marketInfo)
    .then(() => {
        marketLoaded = true;
        // You probably want to this.setState here so
        // the new data can be rendered to the screen
        // console.log(marketInfo);
        this.setState({marketObj:marketInfo});
    })
    .catch(err => {
        //get any errors and log them here
        console.log(err);
    })

    setTimeout(() => {
        console.log('after setTimeout: ')
        console.log(this.state.marketObj)
    }, 2000)


  }


  render() {
    <MarketItem navigation={this.props.navigation} />
    const { params } = this.props.navigation.state;
    let exchangeTitle = params.exchange.toString().replace("_","").toUpperCase();
    let marketTitle = params.marketTitle.toString();
    let currentBid = this.state.marketObj.bid;

    return (
      <View style={Styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View >
          <Text style={Styles.title}>{exchangeTitle}  {marketTitle}</Text>
          <Text style={Styles.price}> {currentBid}</Text>

        </View>
      </View>
    );
  }
}
