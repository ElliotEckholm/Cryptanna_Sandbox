//////////////UI imports//////////////
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import {
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import DoneButton from 'react-native-keyboard-done-button';


import styles from "../styles/Login.style.js";

/////////////Functionality imports//////////
import {onLogin} from '../scripts/firebase.js';

export default class Login extends Component {
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
    onLogin(this.state.email, this.state.password);
  };

  _SignUp = () => {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  };

  checkEmail() {
    if (this.state.touched.email) {
      const re = /\S+@\S+\.\S+/;
      const email = this.state.email;
      if (!re.test(email)) {
        return <Text>Please enter a valid email</Text>;
      }
      return true;
    }
    return false;
  }

  validateButtonEmail() {
    if (this.state.touched.email) {
      const re = /\S+@\S+\.\S+/;
      const email = this.state.email;
      if (!re.test(email)) {
        return false;
      }
      return true;
    }
    return false;
  }

  checkPassword() {
    if (this.state.touched.password) {
      return true;
    }
  }


  setToTouched(type) {
    let touched = this.state.touched;
    let obj = {};
    obj[type] = true;
    touched = Object.assign({}, touched, obj);
    this.setState({ touched: touched });
  }

  checkIfDisable() {
    if (
      this.validateButtonEmail() &&
      this.checkPassword()
    ) {
      return false;
    } else {
      return true;
    }
  }


  render() {
    return (

      <View style={styles.container}>

        <View style={styles.imageContainer}>

          <Image
            style={styles.cryptannaImage}
              source={require('../assets/images/White_Eye.png')}


          />

        </View>

        <ScrollView keyboardDismissMode='on-drag'  style={styles.scrollContainer}>

        <View style={styles.formContainer}>
        <FormInput
          onChangeText={email => this.setState({ email: email })}
          onBlur={() => this.setToTouched('email')}
          autoCapitalize= 'none'
            placeholderTextColor={'white'}
          placeholder = "Email"
          returnKeyLabel='Done'
          returnKeyType='done'
        />
          <FormValidationMessage>{this.checkEmail()}</FormValidationMessage>
        </View>

        <View style={styles.formContainer}>
        <FormInput
          onChangeText={password => this.setState({ password: password })}
          onBlur={() => this.setToTouched('password')}
          secureTextEntry={true}
          password={true}
          autoCapitalize= 'none'
            placeholderTextColor={'white'}
          placeholder = 'Password'
          returnKeyLabel='Done'
          returnKeyType='done'
        />
        <FormValidationMessage>{this.checkPassword()}</FormValidationMessage>
        </View>

        </ScrollView>


        <View style={styles.inputContainerLogin}>

          <Button
            title="LOGIN"
            onPress={this._Login}
            buttonStyle={styles.button}
            // disabled={this.checkIfDisable()}
            disabledTitleStyle={styles.disabledButtonTitle}
            disabledStyle={styles.disabledButton}
          />

        </View>

        <TouchableOpacity onPress={this._SignUp}>
          <View style={styles.inputContainerSignUp}>
              <Text style={styles.rowTextSignUp}>Don't Have An Account?</Text>
          </View>
        </TouchableOpacity>
      


      </View>
    );
  }
}
