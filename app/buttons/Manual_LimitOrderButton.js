import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, TextInput, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/Manual_LimitOrderButton.style.js';
import ccxt from 'ccxt';

/////////////Functionality imports//////////
import {limitBuyOrder,fetchBalance,fetchTicker, sandbox_exchange} from '../scripts/ccxt.js';
import { writeSandBoxBalance, fetchSandBoxBalance, addExchangeSubCollection, getCurrentUserID, getUserData, addMarketSubCollection, addBotsSubCollection} from '../scripts/firebase.js';

export default class Manual_LimitOrderButton extends Component {


      constructor(props) {
        super(props);
        this.state = {
          marketObj:[],
          balanceList: [],
          buy_amount: "",
          currentPrice_string: "",
          currentPrice: "",
          want_to_buy: 0.0,
          your_price: 0.0,
          market:'',
          exchange:0.0,



        };
      }

      componentDidMount() {
          // TODO: turn this into one function?
          // Its on sandbox, here and buy button?


          let refresh = () => {
            // console.log('refresh() from BuyButton');
            this.state.market = this.props.market.replace("-","/");
            this.state.exchange = this.props.exchange;
            console.log("TESTING EXCHANGE",this.state.exchange);
              console.log("TESTING MARKET",this.state.market);
              let marketInfo= {};

            // fetchSandBoxBalance(pulledSandboxBalance);
            // console.log('PULLING: ', pulledSandboxBalance)

            // setTimeout(() => {
            //     let _balanceList = [];
            //
            //     pulledSandboxBalance[0].forEach(balance => {
            //       _balanceList.push(balance)
            //   });
            //
            //   this.setState({ balanceList:_balanceList });
            //
            //   }, 2000);

            fetchTicker(this.state.exchange,this.state.market,marketInfo)
            .then(() => {
                this.setState(previousState => {
                  return ({ marketObj : marketInfo });
                });

                this.state.currentPrice_string = "Current Price of Bitcoin: $" + Number(marketInfo.info.price).toFixed(2);
                this.state.currentPrice = Number(marketInfo.info.price).toFixed(2);

            })
            .catch(err => {
                console.log(err);
            })
          };

          refresh();
      }



    _onBuy = () => {
        let orderId = [];
        limitBuyOrder(this.state.exchange, orderId, this.state.market, this.state.want_to_buy,  this.state.your_price);

        this.state.want_to_buy = '';
         this.state.your_price = '';
          // console.log("BUTTON PRESSED", this.state.want_to_buy, this.state.your_price);
    }

    render() {
        return(

            <View style={styles.buttons_container}>

              <TextInput style={styles.amountInput}
                onChangeText={(want_to_buy) => this.setState({want_to_buy : want_to_buy})}
                value={this.state.want_to_buy}
                placeholderTextColor={'white'}
                placeholder = "Amount"
              />

              <TextInput style={styles.priceInput}
                onChangeText={(your_price) => this.setState({your_price : your_price})}
                value={this.state.your_price}
                  placeholderTextColor={'white'}
                placeholder = "Price"
              />

              <TouchableOpacity onPress={this._onBuy}>
                <View style={styles.buyButton}>

                   <Text style={styles.text} >
                    Buy
                    </Text>

                </View>
              </TouchableOpacity>
            </View>

        );
    }
}
