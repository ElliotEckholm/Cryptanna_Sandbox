//////////////UI imports//////////////
import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import Styles from "../styles/Signup.style";
import { FormLabel, FormInput, Button } from "react-native-elements";

/////////////Functionality imports//////////
import { createEmailAccount } from "../scripts/firebase.js";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  _SignUp = () => {
    if(this.state.password !== this.state.confirmPassword) {
        alert('Your passwords do not match');
        return;
    }
    createEmailAccount(this.state.email, this.state.password);
    const { navigate } = this.props.navigation;
    navigate("Onboaring");
  };

  _TermsConds = () => {
    this.props.navigation.navigate("TermsConds");
  };

  render() {
    return (
      <View style={Styles.container}>
        <Image source={require("../assets/images/White_Eye.png")} />

        <View style={Styles.formContainer}>
          <View style={Styles.inputContainer}>
            <FormLabel style={Styles.inputTitle}>Email</FormLabel>
            <FormInput
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
            />
          </View>

          <View style={Styles.inputContainer}>
            <FormLabel style={Styles.inputTitle}>Password</FormLabel>
            <FormInput
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              password={true}
              autoCapitalize="none"
            />
          </View>

          <View style={[Styles.inputContainer, { marginBottom: 10 }]}>
            <FormLabel style={Styles.inputTitle}>Confirm Password</FormLabel>

            <FormInput
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
              secureTextEntry={true}
              password={true}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={{ paddingBottom: 30 }}>
          <Button
            title="Sign Up"
            onPress={this._SignUp}
            buttonStyle={Styles.button}
          />
        </View>

        <TouchableOpacity onPress={this._TermsConds}>
          <Text style={Styles.terms}>
            By continuing you indicate that you have read and agree to the<Text style={Styles.termsLink}> Terms of Service</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
