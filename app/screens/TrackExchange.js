import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  ScrollView
} from 'react-native';
import Styles from "../styles/TrackExchange.style.js";
import ccxt from 'ccxt';
import TrackExchangeButton from "../buttons/TrackExchangeButton";

/////////////Navigation Imports///////////
import Command from './Command.js';

export default class TrackExchange extends Component {
  constructor(props) {
    super(props);
    this.state = {

      api_key: '', //'1a2a436861a6b81bb76ed5daae68f983',
      api_secret: '', //'BjdUP19NKl6yerrN4nVT5yirgsYyb+uxM6dP3YDLYGwAr68h/fjdA3ZiEzR1dRZg+CZfyALF1I2nc6iV7hCYuQ==',
      api_passphrase: '', //'1259domab5fh',
      exchange: {},
      exchangeTitle: '',
      exchangeTitle_string: '',
    };
  }

  _Profile = () => {
    const { navigate } = this.props.navigation;
    navigate('Profile');
  };

  componentWillMount(){
    const { params } = this.props.navigation.state;
    let exchange_id = params.exchange_id;
    this.state.exchangeTitle = ccxt.exchanges[exchange_id].toString();
    this.state.exchangeTitle_string = ccxt.exchanges[exchange_id].toString().toUpperCase();
    this.state.exchange = new ccxt[this.state.exchangeTitle] ();
    this.state.exchange.apiKey = this.state.apiKey;
    this.state.exchange.secret = this.state.secret;
    this.state.exchange.password = this.state.passphrase;
  }

  render() {
    return (
    	<View style={Styles.container}>
        	<Text style={Styles.title}>
                Adding {this.state.exchangeTitle_string}
        	</Text>

        	<View style = {Styles.inputRow}>
            	<Text style = {Styles.detailText}>
              		API key:
            	</Text>
            	<TextInput
            		style = {Styles.editInfo}
            		onChangeText={api_key => this.setState({ api_key })}
            		value={this.state.api_key}
                placeholder = "API key"
            	/>
        	</View>

        	<View style = {Styles.inputRow}>
            	<Text style = {Styles.detailText}>
              		API Secret:
            	</Text>

            	<TextInput
            		style = {Styles.editInfo}
            		onChangeText={api_secret => this.setState({ api_secret })}
            		value={this.state.api_secret}
                    placeholder = "API Secret"
            	/>
        	</View>

          <View style = {Styles.inputRow}>
              <Text style = {Styles.detailText}>
                  API Passphrase:
              </Text>

              <TextInput
                style = {Styles.editInfo}
                onChangeText={api_passphrase => this.setState({ api_passphrase })}
                value={this.state.api_passphrase}
                placeholder = "API Passphrase"
              />
          </View>

          <TrackExchangeButton
            exchangeTitle = {this.state.exchangeTitle}
            exchange = {this.state.exchange}
            api_key = {this.state.api_key}
            api_secret = {this.state.api_secret}
            api_passphrase = {this.state.api_passphrase}
          />
      	</View>
    );
  }
}
