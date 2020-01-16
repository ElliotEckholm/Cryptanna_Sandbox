import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, TextInput, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/BuyButton.style.js';
import ccxt from 'ccxt';
import firebase from 'react-native-firebase';

/////////////Functionality imports//////////
import {fetchBalance,fetchTicker} from '../scripts/ccxt.js';
import {writeSandBoxBalance, fetchSandBoxBalance} from '../scripts/firebase.js';

export default class BuyButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
        marketObj:[],
        balanceList: [],
        buy_amount: "",
        currentPrice_string: "",
        currentPrice: "",
        sandboxObject: this.props.sandboxObject,
      };
    }

    componentDidMount() {

      console.log("In buy button: ", this.state.sandboxObject.current_usd_balance);

      // let pulledSandboxBalance = [];
      // fetchSandBoxBalance(pulledSandboxBalance);
      //
      // setTimeout(() => {
      //
      //     console.log("Pulled Sandbox Object in Buy Button: ",pulledSandboxBalance);
      //
      //
      // }, 2000);

        // fetchTicker(exchange,market,marketInfo)
        // .then(() => {
        //     this.setState(previousState => {
        //       return ({ marketObj: marketInfo });
        //     });
        //
        //     this.state.currentPrice_string = "Current Price of Bitcoin: $" + Number(marketInfo.info.price).toFixed(2);
        //     this.state.currentPrice = Number(marketInfo.info.price).toFixed(2);
        //
        // })
        // .catch(err => {
        //     console.log(err);
        // })

    }

    _onBuy = () => {


         new_btc_balance = 3000;
         new_usd_balance = 1000;

         // Alert.alert(
         //   "You dont have enough US Dollars to buy that amount of Bitcoin!",
         //   'Please Try Again',
         //   [
         //     {
         //       text: 'Cancel',
         //       onPress: () => console.log('Cancel Pressed'),
         //       style: 'cancel'
         //     },
         //     { text: 'OK', onPress: () => console.log('OK Pressed') }
         //   ],
         //   { cancelable: false }
         // );


       writeSandBoxBalance(Number(new_btc_balance).toFixed(2), Number(new_usd_balance).toFixed(2));

       this.setState({
           buy_amount: "",
       });

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
