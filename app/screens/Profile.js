//////////////UI imports//////////////
import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  Image
} from "react-native";
import Styles from "../styles/Profile.style";
import firebase from "react-native-firebase";

/////////////Functionality imports//////////
import { signOutUser } from "../scripts/firebase.js";
import { getCurrentUserID, getCurrentUser } from "../scripts/firebase.js";
import ccxt from "ccxt";

////////////Navigation imports/////////////
import Login from "./Login.js";
import Settings from "./Settings.js";
import TermsConds from "./TermsConds.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      password: ""
    };
  }

  componentWillMount() {
    let docRef = firebase
      .firestore()
      .collection("users")
      .doc(getCurrentUserID());

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const obj = doc.data().accountInfo;
          this.setState({
            username: obj.displayName,
            name: obj.name,
            password: "Change password"
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  }

  /*
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */

  _LogOut = () => {
    signOutUser();
    this.props.navigation.navigate("Login");
  };

  _TermsConds = () => {
    this.props.navigation.navigate("TermsConds");
  };

  _Settings = () => {
    const { navigate } = this.props.navigation;
    navigate("Settings");
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={{ flex: 0.1 }}>
          <Text style={Styles.title}>SETTINGS</Text>
        </View>

        <View style={{ flex: 0.7 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.7, flexFirection: "column" }}>
              <TouchableOpacity
                style={Styles.apiSettingsContainer}
                onPress={this._Settings}
              >
                <Text style={Styles.apiSettingsText}>API SETTINGS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flex: 0.1, justifyContent: "center" }}>
          <TouchableOpacity
            style={Styles.logoutContainer}
            onPress={this._LogOut}
          >
            <Text style={Styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.1, justifyContent: "center" }}>
          <TouchableOpacity
            style={Styles.termsContainer}
            onPress={this._TermsConds}
          >
            <Text style={Styles.termsText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
