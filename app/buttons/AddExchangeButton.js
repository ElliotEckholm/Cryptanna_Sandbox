import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import TrackExchange from "../screens/TrackExchange.js";
import styles from "../styles/AddExchangeButton.style.js";

export default class AddExchangeButton extends Component {
  _onAddExchange = () => {
    let exchange_id = this.props.exchange_id;
    const { navigate } = this.props.navigation;
    navigate("TrackExchange", { exchange_id });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this._onAddExchange}
      >
        <Text style={styles.title}>Add Exchange</Text>
      </TouchableOpacity>
    );
  }
}
