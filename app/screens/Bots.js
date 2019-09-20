//////////////UI imports//////////////
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../styles/Bots.style";

/////////////Functionality imports//////////
import ccxt from "ccxt";

export default class Bots extends Component {
  state = {
    selectedBot: ""
  };

  /* Goal is to have only one '_onSelect' function which will set state to
  of 'selectedBot' to either 'basicBot' or 'advancedBot' based on the image pressed
  but I can't figure out how to assign values to the image. Something like
  this.setState({selectedBot: e.target.value})
  */

  _onSelectAggressive = e => {
    this.setState({ selectedBot: "basicBot" });
    const { navigate } = this.props.navigation;
    setTimeout(
      () =>
        navigate("AggressiveBotDescription", {
          selectedBot: this.state.selectedBot
        }),
      20
    );
  };
  _onSelectMedium = e => {
    this.setState({ selectedBot: "mediumBot" });
    const { navigate } = this.props.navigation;
    setTimeout(
      () =>
        navigate("MediumBotDescription", {
          selectedBot: this.state.selectedBot
        }),
      20
    );
  };
  _onSelectLongterm = e => {
    this.setState({ selectedBot: "longtermBot" });
    const { navigate } = this.props.navigation;
    setTimeout(
      () =>
        navigate("LongtermBotDescription", {
          selectedBot: this.state.selectedBot
        }),
      20
    );
  };

  //BOT bottoms that are comming soon!

  // <View style={{padding:10}}>
  // <TouchableOpacity onPress={this._onSelectMedium}>
  //   <View style={{borderWidth:1,borderColor:'#fff'}}>
  //     <Text style={Styles.botConvservativeTitle}>Moving Average Safe</Text>
  //     <Image
  //       source={require('../assets/images/White_Eye.png')}
  //       style={{height:50,width:50,alignSelf:'center', padding:20}}
  //       resizeMode='contain'
  //     />
  //   </View>
  // </TouchableOpacity>
  // </View>
  //
  //   <View style={{padding:10}}>
  //   <TouchableOpacity onPress={this._onSelectAggressive}>
  //     <View style={{borderWidth:1,borderColor:'#fff'}}>
  //       <Text style={Styles.botAgressiveTitle}>Moving Average Aggresive</Text>
  //       <Image
  //         source={require('../assets/images/White_Eye.png')}
  //         style={{height:50,width:50,alignSelf:'center'}}
  //         resizeMode='contain'
  //       />
  //     </View>
  //   </TouchableOpacity>
  // </View>

  render() {
    return (
      <View style={Styles.container}>
        <View style={{ flex: 0.1, borderColor: "#fff" }}>
          <Text style={Styles.title}>BOTS</Text>
        </View>

        <ScrollView>
          <View style={Styles.imageContainer}>
            <View style={{ padding: 10 }}>
              <TouchableOpacity onPress={this._onSelectLongterm}>
                <View style={{ borderWidth: 1, borderColor: "#fff" }}>
                  <Text style={Styles.botLongtermTitle}>
                    Multiday Low and High
                  </Text>
                  <Image
                    source={require("../assets/images/White_Eye.png")}
                    style={{
                      height: 50,
                      width: 50,
                      alignSelf: "center",
                      paddingBottom: 20
                    }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Text style={Styles.subTitle}>More Bots Coming Soon</Text>
      </View>
    );
  }
}
