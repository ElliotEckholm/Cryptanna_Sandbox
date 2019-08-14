//////////////UI imports//////////////
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Styles from "../styles/Sandbox.style";
import BuyButton from '../buttons/BuyButton.js';
import SellButton from '../buttons/SellButton.js';
import Sandbox_Price_Line_Graph from '../charts/Sandbox_Price_Line_Graph.js';
import Exchanges from './Exchanges.js';
import Spinner from './../config/Spinner';
import firebase from 'react-native-firebase';
import { getCurrentUserID } from './../scripts/firebase';

import ccxt from 'ccxt';
import * as d3 from 'd3';
import Morph from 'art/morph/path';

import {fetchTicker, sandbox_exchange} from '../scripts/ccxt.js';
import {writeSandBoxBalance, fetchSandBoxBalance} from '../scripts/firebase.js';

let marketLoaded = false;

export default class Sandbox extends Component {

  constructor(props) {
    super(props);

    this.runInterval = true;
    this.state = {
      marketObj:[],
      buyAmount: "",
      currentPrice_string: "",
      currentPrice: "",
      USDBalance : '',
      BTCBalance : '',
    };
  }


  componentDidMount () {
      this.props.navigation.addListener('willFocus', (route) => {
        this.runInterval = true;
        console.log("screen mounted!", this.runInterval);
      });

      this.props.navigation.addListener('didBlur', (route) => {
        this.runInterval = false;
        console.log("\n\n\nunmounted in sandbox",this.runInterval);
      });


          setInterval(() => {
              if (this.runInterval == true){

                  console.log('SET interval from Sandbox');
                  const { params } = this.props.navigation.state;
                  let market = "BTC/USD";

                  let exchangeTitle = "coinbasepro";
                  let exchange = new ccxt[exchangeTitle] ();
                  let marketInfo= {};
                    let pulledSandboxBalance = [];

                  fetchTicker(exchange,market,marketInfo)
                  .then(() => {
                      marketLoaded = true;
                      this.setState(previousState => {
                        return ({ marketObj : marketInfo });
                      });

                      this.state.currentPrice_string = "Current Price of Bitcoin: $" + Number(marketInfo.info.price).toFixed(2);
                      this.state.currentPrice = Number(marketInfo.info.price).toFixed(2);
                  })
                  .catch(err => {
                      console.log(err);
                  })

                  fetchSandBoxBalance(pulledSandboxBalance);

                  setTimeout(() => {
                      let _balanceList = [];

                      if (pulledSandboxBalance[0] != undefined){

                        pulledSandboxBalance[0].forEach(balance => {
                          if (balance.name == 'USD'){
                            this.state.USDBalance = balance.holdings
                          }
                          if (balance.name == 'BTC'){
                            this.state.BTCBalance = balance.holdings
                          }
                          _balanceList.push(balance)
                        });

                        this.setState({ balanceList:_balanceList });

                      }else{
                          let placeHolderObj = {
                            name : '',
                            holdings : 0.0
                          }
                          this.setState({ balanceList: [placeHolderObj] });
                      }
                  }, 2000);
            }
          }, 4000);
  }


  onPress = () => {
      console.log('on press clicked');
      this.setState({ buyButtonClicked: true});
      setTimeout(() => {
          this.setState({ buyButtonClicked: false})
      }, 1000);
  }

  render() {
    let currentPrice = JSON.stringify(this.state.marketObj.currentPrice);
    return (
      <View style={Styles.container}>
          <View style={{flex:.1}}>
              <Text style={Styles.title}> SANDBOX </Text>
          </View>

          <View style={{flex:.65, flexDirection:'column', justifyContent:'space-around'}}>
              <Text style={Styles.balance}>
                Balance: ${this.state.USDBalance} ({this.state.BTCBalance} in BTC)
              </Text>

              <Sandbox_Price_Line_Graph btcBalance = {this.state.BTCBalance}/> 

              <Text style={Styles.priceText}>
                {this.state.currentPrice_string}
              </Text>
          </View>

          <View style={{flex:.25}}>
              <BuyButton
                  onPress={this.onPress}
                  runInterval = {this.runInterval}
              />

              <SellButton runInterval = {this.runInterval}/>
          </View>

      </View>
    );
  }
}
