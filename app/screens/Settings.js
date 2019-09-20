import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
  ScrollView
} from "react-native";
import Styles from "../styles/Settings.style.js";
import ccxt from "ccxt";
import { pullTrackedExchangesDocuments } from "../scripts/firebase.js";
import Profile from "./Profile.js";
import Spinner from "./../config/Spinner";

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      exchanges: [
        {
          name: "",
          apiKey: "",
          secret: "",
          passphrase: ""
        }
      ],
      loading: true
    };
  }

  _Profile = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);

    pulledExchangeList = [];
    pullTrackedExchangesDocuments(pulledExchangeList);
    // must finish before processing
    setTimeout(() => {
      //create temporary variables neccesary for the forEach function
      let _exchanges = [];
      pulledExchangeList.forEach(exchange => {
        //get the name and filter to an approriate text
        let the_name = exchange.name
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "");
        let name = the_name.charAt(0).toUpperCase() + the_name.substring(1);
        //add each item to the appropriate array
        //this puts the new object into the exchanges array
        let new_exchange = {
          name: name,
          apiKey: exchange.apiKey,
          secret: exchange.secret,
          passphrase: exchange.passphrase
        };
        _exchanges.push(new_exchange);
      });
      this.setState({ exchanges: _exchanges });

      console.log(this.state.exchanges);
    }, 1000);
  }

  loading = () => {
    if (this.state.loading) {
      return (
        <View style={[Styles.container, { paddingTop: 300 }]}>
          <Spinner />
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>API SETTINGS</Text>
        <ScrollView>
          {this.state.exchanges.map(e => (
            <View>
              <View>
                <Text style={Styles.sectionTitle}>{e.name}</Text>
              </View>

              <Text style={[Styles.detailText, { marginTop: 20 }]}>
                API key:
              </Text>
              <View style={Styles.inputRow}>
                <TextInput style={Styles.editInfo} value={e.apiKey} />
              </View>

              <Text style={Styles.detailText}>API secret:</Text>
              <View style={Styles.inputRow}>
                <TextInput style={Styles.editInfo} value={e.secret} />
              </View>

              <Text style={Styles.detailText}>Passphrase:</Text>
              <View style={Styles.inputRow}>
                <TextInput style={Styles.editInfo} value={e.passphrase} />
              </View>

              <View style={Styles.buttonContainer}>
                <Button title="Remove" color="#FFFFFF" />
              </View>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#fff",
                  margin: 20,
                  marginTop: 50
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {this.loading()}
      </View>
    );
  }
}
