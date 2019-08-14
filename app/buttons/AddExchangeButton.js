import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import TrackExchange from '../screens/TrackExchange.js';
import styles from '../styles/TrackExchangeButton.style.js';

/////////////Functionality imports//////////
import {fetchBalance} from '../scripts/ccxt.js';
import {pullExchangesDocuments, addExchangeSubCollection, getCurrentUserID, getUserData, addMarketSubCollection, addBotsSubCollection} from '../scripts/firebase.js';

export default class AddExchangeButton extends Component {
    constructor() {
        super();
    }

    _onAddExchange = () => {

      let exchange_id = this.props.exchange_id;
      const {navigate} = this.props.navigation;




      navigate('TrackExchange', {exchange_id : exchange_id});

    }



    render() {
        return(

          <View style={styles.container}>
            <TouchableOpacity onPress={this._onAddExchange}>
              <View style={styles.rowContainer}>
                <View style={styles.rowText}>
                 <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                  Add Exchange
                  </Text>

                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
}
