import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, TextInput, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/SellButton.style.js';
import ccxt from 'ccxt';

/////////////Functionality imports//////////
import {fetchBalance,fetchTicker} from '../scripts/ccxt.js';
import {writeSandBoxBalance, fetchSandBoxBalance, addExchangeSubCollection, getCurrentUserID, getUserData, addMarketSubCollection, addBotsSubCollection} from '../scripts/firebase.js';

export default class BuyButton extends Component {
      constructor(props) {
        super(props);
        this.state = {
          marketObj:[],
          balanceList: [],
          sell_amount: "",
          currentPrice_string: "",
          currentPrice: "",

        };
      }

      componentWillMount() {
          // TODO: turn this into one function?
          // Its on sandbox, here and sell button?


              setInterval(() => {
                  if (this.props.runInterval == true){
                console.log('SET interval from SellButton');
                let market = "BTC/USD";

                let exchangeTitle = "coinbasepro";
                let exchange = new ccxt[exchangeTitle] ();
                let marketInfo= {};

                let pulledSandboxBalance = [];

                fetchSandBoxBalance(pulledSandboxBalance);

                setTimeout(() => {
                    let _balanceList = [];

                    if (pulledSandboxBalance[0] != undefined){

                      pulledSandboxBalance[0].forEach(balance => {
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

                fetchTicker(exchange,market,marketInfo)
                .then(() => {
                    this.setState(previousState => {
                      return ({ marketObj : marketInfo });
                    });
                      this.state.currentPrice = marketInfo.info.price;
                })
                .catch(err => {
                    console.log(err);
                })

                  }
            }, 4000)


    }

      // componentDidUnmount(){
      //
      //   clearInterval(this.state.interval);
      //
      //   console.log("unmounted in sell button");
      // }





    _onSell = () => {
        if (this.state.sell_amount != '' && this.state.balanceList.length > 0){
          console.log("Buy price", this.state.currentPrice);
          console.log("Sell amount", this.state.sell_amount);
          let btc_sold = parseFloat(this.state.sell_amount) / parseFloat(this.state.currentPrice);
          console.log("BTC Sold", btc_sold);

          let current_btc_balance = 0.0;
          let current_usd_balance = 0.0;
          let new_btc_balance = 0.0;
          let new_usd_balance = 0.0;

          this.state.balanceList.forEach(balanceObj => {

             if(balanceObj.name.toString() == 'USD'){
                current_usd_balance = parseFloat(balanceObj.holdings);
             }

              if(balanceObj.name == 'BTC'){
                  current_btc_balance = parseFloat(balanceObj.holdings);
              }
          });

          console.log("Current USD SOLD Balance",current_usd_balance);

          if ((current_btc_balance - parseFloat(btc_sold)) > 0.0){
             new_btc_balance = (current_btc_balance - parseFloat(btc_sold));
             console.log('BTC balance: ', new_btc_balance);

             new_usd_balance = parseFloat(current_usd_balance) + parseFloat(this.state.sell_amount);
             console.log('USD balance: ', new_usd_balance);
          } else {

            new_btc_balance = current_btc_balance;
            new_usd_balance = current_usd_balance;

           Alert.alert(
             "You dont have enough Bitcoin to Sell!",
             'Please Try Again',
             [
               {
                 text: 'Cancel',
                 onPress: () => console.log('Cancel Pressed'),
                 style: 'cancel'
               },
               { text: 'OK', onPress: () => console.log('OK Pressed') }
             ],
             { cancelable: false }
           );
         }

          writeSandBoxBalance('USD', Number(new_btc_balance).toFixed(2), Number(new_usd_balance).toFixed(2));

          this.setState({
              sell_amount: "",
          });
      }
    }

    render() {
        return(
            <View style={styles.buttons_container}>

              <TextInput style={styles.amountInput}
                onChangeText={(sell_amount) => this.setState({sell_amount : sell_amount})}
                value={this.state.sell_amount}
                placeholderTextColor={'white'}
                placeholder = "0.0"
              />

              <TouchableOpacity onPress={this._onSell}>
                <View style={styles.sellButton}>

                   <Text style={styles.text} >
                    Sell
                    </Text>

                </View>
              </TouchableOpacity>
            </View>
        );
    }
}
