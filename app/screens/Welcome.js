//////////////UI imports//////////////
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,

} from 'react-native';
import {
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';

import styles from "../styles/Welcome.style.js";

/////////////Functionality imports//////////
import {onLogin} from '../scripts/firebase.js';

export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      firstName:"",
      email: '',
      password: '',
      touched: {

        email: false,
        password: false

      }
    };
  }

  _Login = () => {

    const { navigate } = this.props.navigation;
    navigate('Login');
    // onLogin(this.state.email, this.state.password);
  };

  _SignUp = () => {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  };




  render() {
    return (
      <View style={styles.container}>
         <View/>

        <View>
          <Image
            source={require('../assets/images/White_CryptannaLogo.png')}
          />
        </View>

        <View style={styles.inputContainer}>
             <TouchableOpacity onPress={this._Login}>
                <View style={styles.inputContainerLogin}>
                    <Text style={styles.rowText}>LOG IN</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._SignUp}>
               <View style={styles.inputContainerSignUp}>
                   <Text style={styles.rowText}>SIGN UP</Text>
               </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
