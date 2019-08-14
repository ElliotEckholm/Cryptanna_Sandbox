import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/TrackExchangeButton.style.js';
import ccxt from 'ccxt';
/////////////Functionality imports//////////
import {fetchBalance, sandbox_exchange} from '../scripts/ccxt.js';
import {pullExchangesDocuments, addExchangeSubCollection, addMarketSubCollection} from '../scripts/firebase.js';

export default class TrackExchangeButton extends Component {

  state = {

    balanceList: [],

    exchange: this.props.exchange,
    // chart_exchange.balance: this.props.balanceList,
  };
    constructor(props) {
        super(props);
        // this.state = {
        //   balanceList : [],
        //   exchangeTitle : this.props.exchangeTitle,
        //
        // }


    }

    _onTrackExchange = () => {
        // const { params } = this.props.navigation.state;

        this.state.exchange = this.props.exchange;
        this.state.exchange.apiKey = this.props.api_key;
        this.state.exchange.secret = this.props.api_secret;
        this.state.exchange.password = this.props.api_passphrase;



       addExchangeSubCollection(this.props.exchangeTitle,0.0,true,this.props.api_key,this.props.api_secret,this.props.api_passphrase);





       fetchBalance(this.state.exchange, this.state.balanceList)
       .then(() => {
           // balanceList = newData;


           this.setState(previousState => {
             return ({ balanceList: this.state.balanceList,
                     });
           });

           
          addMarketSubCollection(this.props.exchangeTitle,this.state.balanceList);



       })
       .catch(err => {
           // this.alert(err);
       })

       // let sandbox_id = 'gdax';
       //
       // let sandbox_exchange = new ccxt[sandbox_id] ();
       //
       //   // console.log("Outisde new Balance List!",this.state.balanceList);
       //   sandbox_exchange.apiKey = '1a2a436861a6b81bb76ed5daae68f983';
       //   sandbox_exchange.secret = 'BjdUP19NKl6yerrN4nVT5yirgsYyb+uxM6dP3YDLYGwAr68h/fjdA3ZiEzR1dRZg+CZfyALF1I2nc6iV7hCYuQ==';
       //   sandbox_exchange.password = '1259domab5fh'
       //
       //   sandbox_exchange.urls.api = 'https://api-public.sandbox.pro.coinbase.com';
       //   sandbox_exchange.title = 'GDAX';

         addExchangeSubCollection(sandbox_exchange.title,0.0,true,sandbox_exchange.apiKey,sandbox_exchange.secret,sandbox_exchange.password);


         let sandboxBalanceList = [];


         fetchBalance(sandbox_exchange, sandboxBalanceList)
         .then(() => {
             // balanceList = newData;



            addMarketSubCollection(sandbox_exchange.title,sandboxBalanceList);



         })
         .catch(err => {
             // this.alert(err);
         })



    }



    render() {
        return(

          <View style={styles.container}>
            <TouchableOpacity onPress={this._onTrackExchange}>
              <View style={styles.rowContainer}>
                <View style={styles.rowText}>
                 <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                  Add
                  </Text>

                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
}
