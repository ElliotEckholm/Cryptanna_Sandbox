import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, Alert} from 'react-native';
import { Icon } from 'react-native-elements';
import Markets from '../screens/Markets.js';
import styles from '../styles/PauseAllBotsButton.style.js';
import ccxt from 'ccxt';

/////////////Functionality imports//////////
import {pauseAllBots} from '../scripts/firebase.js';

export default class PauseAllBotsButton extends Component {
    constructor() {
        super();
    }

    _onPauseAllBots = () => {

      pauseAllBots();

    }



    render() {
        return(

          <View style={styles.container}>
            <TouchableOpacity onPress={this._onLimitOrder}>
              <View style={styles.rowContainer}>

                 <Text style={styles.title} numberOfLines={2} ellipsizeMode ={'tail'}>
                  Pause All Bots
                  </Text>

              
              </View>
            </TouchableOpacity>
          </View>
        );
    }
}
