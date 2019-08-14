import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Command from './Command';
import Login from './Login';
import Styles from "../styles/LoadingScreen.style";


export default class LoadingScreen extends Component {
  render() {
      return(
        <View style={Styles.container}>
          <Text style={Styles.title}>
          Loading
          </Text>
        </View>
      );
  }
}
