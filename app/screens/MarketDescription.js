import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Exchanges from './Exchanges.js';
import ExchangeItem from '../items/ExchangeItem.js';
import MarketItem from '../items/MarketItem.js';
import ccxt from 'ccxt';
import Styles from "../styles/MarketDescription.style";

import Manual_LimitOrderButton from '../buttons/Manual_LimitOrderButton.js';
import Manual_SellLimitOrderButton from '../buttons/Manual_SellLimitOrderButton.js';

import Price_Line_Graph from '../charts/Price_Line_Graph.js';


import {fetchTicker,fetchMarket_badway,fetchMarkets_Item_Info,fetchTicker_promise} from '../scripts/ccxt.js';

let marketLoaded = false;

export default class MarketDescription extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentPrice:'',
    };
      this.runInterval = true;
  }

  componentDidMount(){
    this.props.navigation.addListener('willFocus', (route) => {
      this.runInterval = true;
      console.log("market screen mounted!", this.runInterval);
    });

    this.props.navigation.addListener('didBlur', (route) => {

      // clearInterval(this.interval);
      this.runInterval = false;

      console.log("\n\n\nunmounted in market",this.runInterval);
    });

    // setInterval(() => {
      const { params } = this.props.navigation.state;
      let market = params.market;
      let exchange = params.exchange;

      let marketInfo= {};

      setInterval(() => {
        if (this.runInterval == true){
            fetchTicker(exchange,market,marketInfo)
            .then(() => {

                // You probably want to this.setState here so
                // the new data can be rendered to the screen
                // console.log(marketInfo);
                // this.setState(previousState => {
                //   return ({ marketObj : marketInfo });
                // });

                // this.state.currentPrice_string = "Current Price of Bitcoin: $" + Number(marketInfo.info.price).toFixed(2);

                  this.setState({currentPrice : Number(marketInfo.info.price).toFixed(2)})
                  // this.state.currentPrice =
                  console.log("SET interval Current Price in Market Description",this.state.currentPrice);



            })
            .catch(err => {
                //get any errors and log them here
                console.log(err);
            });

        }
      },2000)

  // },2000)


  }





  render() {
    <MarketItem navigation={this.props.navigation} />
    const { params } = this.props.navigation.state;
    let exchangeTitle = params.exchange.name.toString().replace("_","").toUpperCase();
    let marketTitle = params.market.toString();


    return (
      <View style={Styles.container}>

        <View style={{flex:.2}}>
          <Text style={Styles.title}>
              {exchangeTitle}  {marketTitle}
          </Text>

          <Text style={Styles.price}>
              {'1 BTC = ' + this.state.currentPrice + ' USD'}
          </Text>

        </View>

        <View style={[Styles.graphContainer]}>
            <Price_Line_Graph chart_exchange={params.exchange} />
        </View>


        <View style={Styles.buttonsContainer}>
          <Manual_LimitOrderButton market = {params.market} exchange={params.exchange} passedPrice={this.state.currentPrice}></Manual_LimitOrderButton>
          <Manual_SellLimitOrderButton market = {params.market} exchange={params.exchange} passedPrice={this.state.currentPrice}></Manual_SellLimitOrderButton>
        </View>
      </View>
    );
  }
}
