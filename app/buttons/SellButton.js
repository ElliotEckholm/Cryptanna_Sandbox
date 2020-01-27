import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, TextInput, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/SellButton.style.js';
import ccxt from 'ccxt';
import Spinner from "./../config/Spinner";
import firebase from 'react-native-firebase';

/////////////Functionality imports//////////
import {fetchBalance,fetchTicker} from '../scripts/ccxt.js';
import {writeSandBoxBalance, fetchSandBoxBalance} from '../scripts/firebase.js';

export default class SellButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
        marketObj:[],
        balanceList: [],
        buyAmount: 0.0,
        currentPrice_string: "",
        currentPrice: 0.0,
        sandboxObject: this.props.sandboxObject,
        currentPriceLoading: true,
      

      };
    }

    waitForSandboxBalanceFetch = async()=> {
      let pulledSandboxBalance = [];
      await fetchSandBoxBalance(pulledSandboxBalance).then(()=>{

        // console.log("Pulled Sandbox Balance: ",pulledSandboxBalance[0]);
        this.setState({sandboxObject: pulledSandboxBalance[0]})
        this.waitForTickerFetch();
      });
    }


    waitForTickerFetch = async()=> {



        let market = "BTC/USD";

        let exchangeTitle = "coinbasepro";
        let exchange = new ccxt[exchangeTitle]();
        let marketInfo = {};


        fetchTicker(exchange, market, marketInfo)
          .then(() => {
            marketLoaded = true;
            this.setState(previousState => {
              return { marketObj: marketInfo };
            });

            let new_usd_balance = parseFloat(this.state.sandboxObject.current_usd_balance) + this.state.buyAmount;
            let new_btc_balance =  this.state.buyAmount / parseFloat(this.state.currentPrice);

            this.setState({
              currentPrice: parseFloat(marketInfo.info.price).toFixed(2),
              currentPriceLoading: false,

            });

            console.log("Trying to sell: ",new_btc_balance)

            if (new_btc_balance > this.state.sandboxObject.current_btc_balance){
              Alert.alert(
                "Not enough BTC Balance Available To Sell",
                "Sell less BTC",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
              this.setState({
                buyAmount: ""
              });
            }else{

              console.log("Buy Amount: ",this.state.buyAmount);
              console.log("In buy button Current Price: ", this.state.currentPrice);




              this.state.sandboxObject.current_usd_balance = parseFloat(new_usd_balance);
              this.state.sandboxObject.current_btc_balance -=  parseFloat(new_btc_balance);


              console.log("New USD balance: ",new_usd_balance);
              console.log("New BTC balance: ",new_btc_balance);
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

             writeSandBoxBalance(this.state.sandboxObject);
             this.setState({
               buyAmount: ""
             });

            }




          })
          .catch(err => {
            console.log(err);
          });

    }

    componentDidMount() {

      // console.log("In buy button USD Balance: ", this.state.sandboxObject.current_usd_balance);
      // console.log("In buy button BTC Balance: ", this.state.sandboxObject.current_btc_balance);
      //
      //
      //



    }

    _onSell = () => {


        this.waitForSandboxBalanceFetch();
    }

    render() {

      // if (this.state.currentPriceLoading){
      //   return (
      //     <View style={{ paddingTop: "50%" }}>
      //       <Spinner />
      //     </View>
      //   );
      // }else{
        return(

            <View style={styles.buttons_container}>

                <TextInput style={styles.amountInput}
                  onChangeText={(buyAmount) => this.setState({buyAmount : parseFloat(buyAmount)})}
                  value={this.state.buyAmount}
                  placeholderTextColor={'white'}
                  placeholder = "$ 0.0"
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
      // }
    }
}
