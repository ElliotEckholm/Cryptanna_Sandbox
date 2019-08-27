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
  Image,
  ScrollView
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
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>SETTINGS</Text>
        </View>

        <View style={Styles.bodyContainer}>
          <ScrollView>
            <TouchableOpacity
              style={[Styles.itemContainer, { borderTopWidth: 1 }]}
              onPress={this._Settings}
            >
              <View style={Styles.textContainer}>
                <Text style={[Styles.text, { paddingLeft: 10 }]}>
                  API Settings
                </Text>
                <Text style={[Styles.text, { paddingRight: 10 }]}>></Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.itemContainer}
              onPress={this._TermsConds}
            >
              <View style={Styles.textContainer}>
                <Text style={[Styles.text, { paddingLeft: 10 }]}>
                  Terms and Conditions
                </Text>
                <Text style={[Styles.text, { paddingRight: 10 }]}>></Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[Styles.itemContainer]}
              onPress={this._LogOut}
            >
              <Text
                style={[Styles.text, { paddingLeft: 10, color: "#8b0000" }]}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
