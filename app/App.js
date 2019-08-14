import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import { Tabs } from './router';
import {LoginStack} from './router';
 import {createRootNavigator} from './router';
import LoadingScreen from './screens/LoadingScreen.js';

import firebase from 'react-native-firebase';

console.disableYellowBox = true;

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
   componentWillUnmount() {
    this.authSubscription();
  }


  render() {

    // The application is initialising
    if (this.state.loading) return null;

    const Layout = createRootNavigator(this.state.user);
    return (
        <View style={{flex:1}}>
            <StatusBar barStyle="light-content" />
            <Layout />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
