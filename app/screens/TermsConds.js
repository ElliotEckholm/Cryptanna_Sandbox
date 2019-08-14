//////////////UI imports//////////////
import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  ScrollView,
  Linking
} from 'react-native';
import Styles from "../styles/Terms.style";
import firebase from 'react-native-firebase';


/////////////Functionality imports//////////


////////////Navigation imports/////////////
// import TermsConds from './TermsConds.js';
import Settings from './Settings.js';

export default class TermsConds extends Component {
  constructor(props) {
    super(props);


  }


  /*
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */



  render() {
    return (
      <View style={Styles.container}>

            <Text style={Styles.title}>
                Cryptanna Terms of Service & End User Agreement
            </Text>

            <ScrollView>
            <Text style={Styles.terms}>


              Full Terms and Condition can be found on:


            </Text>

            <Text style={Styles.link} onPress={() => Linking.openURL('https://www.cryptanna.com')}>
              Cryptanna.com
            </Text>


              <Text style={Styles.terms}>


                Cryptanna, (“Provider”) will provide you access to the Web Services (defined below) and related website located at Cryptanna.com or such other Web addresses or uniform resource locators as may be specified by the Provider (collectively, the "Site"), specifically and solely for the purposes of requesting and receiving Data (defined below), and Third Party Data (defined below). Please read carefully the following terms and conditions (this “Agreement”) and the Privacy Policy, which may be found at http://www.Cryptanna.com. This Agreement governs your access to and use of the Site, Web Services, Data and Third Party Data, and constitutes a binding legal agreement between you (referred to herein as “You” or “Customer”) and Provider.

              </Text>


              <Text style={Styles.terms}>


                YOU ACKNOWLEDGE AND AGREE THAT, BY CLICKING “SIGN UP” OR BY ACCESSING OR USING THE SITE, WEB SERVICES, DATA OR THIRD PARTY DATA, YOU ARE INDICATING THAT YOU HAVE READ, UNDERSTAND AND AGREE TO BE BOUND BY THIS AGREEMENT. IF YOU DO NOT AGREE TO THIS AGREEMENT, THEN YOU HAVE NO RIGHT TO ACCESS OR USE THE SITE, WEB SERVICES, DATA OR THIRD PARTY DATA. If you accept or agree to this Agreement on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind that company or other legal entity to this Agreement and, in such event; “Customer”, “You” and “Your” will refer and apply to that company or other legal entity.

              </Text>



            </ScrollView>



      </View>
    );
  }
}
