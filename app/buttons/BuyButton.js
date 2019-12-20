import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, TextInput, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/BuyButton.style.js';
import ccxt from 'ccxt';
import firebase from 'react-native-firebase';

/////////////Functionality imports//////////
import {fetchBalance,fetchTicker} from '../scripts/ccxt.js';
import {writeSandBoxBalance, fetchSandBoxBalance, addExchangeSubCollection, getCurrentUserID, getUserData, addMarketSubCollection, addBotsSubCollection} from '../scripts/firebase.js';

export default class BuyButton extends Component {
      constructor(props) {
        super(props);
        this.state = {
          marketObj:[],
          balanceList: [],
          buy_amount: "",
          currentPrice_string: "",
          currentPrice: "",
        };
      }

      componentDidMount() {


          // TODO: turn this into one function?
          // Its on sandbox, here and buy button?
            let refresh = setInterval(() => {
                if (this.props.runInterval == true){
                  // console.log('SET interval from BuyButton');
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
                        return ({ marketObj: marketInfo });
                      });

                      this.state.currentPrice_string = "Current Price of Bitcoin: $" + Number(marketInfo.info.price).toFixed(2);
                      this.state.currentPrice = Number(marketInfo.info.price).toFixed(2);

                  })
                  .catch(err => {
                      console.log(err);
                  })

              }
        }, 4000)


  }

    _onBuy = () => {
      if (this.state.buy_amount != '' && this.state.balanceList.length > 0){
        console.log("Buy price", this.state.currentPrice);
        console.log("Sell amount", this.state.buy_amount);
        let btc_bought = parseFloat(this.state.buy_amount) / parseFloat(this.state.currentPrice);
        console.log("BTC Sold", btc_bought);

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

        if ((current_usd_balance - parseFloat(this.state.buy_amount)) > 0.0){
           new_btc_balance = (current_btc_balance + parseFloat(btc_bought));
           console.log('BTC balance: ', new_btc_balance);

           new_usd_balance = parseFloat(current_usd_balance) - parseFloat(this.state.buy_amount);

           // const ref = firebase.firestore()
           //           .collection('users')
           //           .doc(getCurrentUserID())
           //           .collection('sandbox')
           //           .doc('sandbox_coinbase');
           //
           //           ref.onSnapshot(doc => {
           //               console.log('Writing new balance to Firestore...');
           //               new_usd_balance = doc.data().balance[0].holdings;
           //           });

           console.log('USD balance: ', new_usd_balance);
        } else {

             new_btc_balance = current_btc_balance;
             new_usd_balance = current_usd_balance;

             Alert.alert(
               "You dont have enough US Dollars to buy that amount of Bitcoin!",
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
               buy_amount: "",
           });
       }
    }

    render() {
        return(

            <View style={styles.buttons_container}>

                <TextInput style={styles.amountInput}
                  onChangeText={(buy_amount) => this.setState({buy_amount : buy_amount})}
                  value={this.state.buy_amount}
                  placeholderTextColor={'white'}
                  placeholder = "0.0"
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
