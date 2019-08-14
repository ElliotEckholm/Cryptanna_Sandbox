//////////////UI imports//////////////
import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  ART,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  Button
} from "react-native";
import Styles from "../styles/Command.style";
import PauseAllBotsButton from "../buttons/PauseAllBotsButton.js";
import CommandExchangeItem from "../components/CommandExchangeItem.js";
import Exchanges from "./Exchanges.js";

import Spinner from "./../config/Spinner";

import Balance_Pie_Chart from "../charts/Balance_Pie_Chart.js";
import Price_Line_Graph from "../charts/Price_Line_Graph.js";
import Sandbox_Price_Line_Graph from "../charts/Sandbox_Price_Line_Graph.js";
import { BasicBotClass } from "../scripts/Bots_Database.js";

import ToggleSwitch from "toggle-switch-react-native";
import { Colors, red_shades } from "../styles/global/colors.js";
import ccxt from "ccxt";
import { sandbox_exchange } from "../scripts/ccxt.js";
import {
  pullTrackedExchangesDocuments,
  pullTrackedMarketDocuments,
  fetchCurrentBots,
  pauseAllBots,
  resumeAllBots
} from "../scripts/firebase.js";
import { botRunner } from "../scripts/Bots_Database.js";

import * as d3 from "d3";
import Morph from "art/morph/path";

const deviceWidth = Dimensions.get("window");
const deviceHeight = Dimensions.get("window");

let exchangeList = [];
let bot_Update_Time = 1000; //10 sec

export default class Command extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Type Amount Here",
      exchangeList: [],
      bots_toggle: "Off",
      totalBalance: "...",
      totalBalanceList: [],
      noExchanges: "",
      loading: true
    };

    const { navigate } = this.props.navigation;
  }

  _graphSelection = () => {
    console.log("object");
  };

  _addExchange = () => {
    const { navigate } = this.props.navigation;
    navigate("Exchanges");
  };

  componentWillMount() {
    this.setState({ bots_toggle: "Off" });
    pauseAllBots();

    setTimeout(() => {
      this.setState({ loading: false });
    }, 7000);

    setInterval(() => {
      //fetch current exchanges
      let pulledExchangeList = [];
      pullTrackedExchangesDocuments(pulledExchangeList);

      setTimeout(() => {
        //EXCHANGES
        let _exchangeList = [];
        let exchangeTotalBalance = 0.0;
        let totalBalance = 0.0;

        pulledExchangeList.forEach(exchange => {
          let name = exchange.name
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "");
          let setExchange = new ccxt[name]();

          exchangeTotalBalance = 0.0;
          setExchange.apiKey = exchange.apiKey;
          setExchange.secret = exchange.secret;
          setExchange.password = exchange.passphrase;

          //make sandbox custom url
          if (exchange.name == "gdax") {
            setExchange.urls.api =
              "https://api-public.sandbox.pro.coinbase.com";
          }

          _exchangeList.push(setExchange);

          //Fetch current markets
          let pulledMarkets = [];
          pullTrackedMarketDocuments(exchange.name, pulledMarkets);

          setTimeout(() => {
            pulledMarkets.forEach((market, id) => {
              if (market.marketName != "USD-USD") {
                exchangeTotalBalance += market.marketBalance;
                // console.log("Market Balance", market.marketBalance);
              }
            });
            // console.log("Exchange Total Balance", exchangeTotalBalance);
          }, 1000);
        });
        setTimeout(() => {
          this.state.exchangeList.length == 0
            ? this.setState({ noExchanges: "No Exchange(s) Added" })
            : this.setState({ noExchanges: "" });

          this.state.totalBalanceList = [];
          totalBalance += exchangeTotalBalance;
          // console.log("Total Balance", exchangeTotalBalance);
          this.state.totalBalanceList.push(totalBalance);

          this.setState({ totalBalance: Number(totalBalance).toFixed(2) });
          // console.log("TESTING balance list:", this.state.totalBalanceList);
        }, 2000);

        this.setState({ exchangeList: _exchangeList });
        // console.log('BOT Runner');
      }, 3000);
    }, 4000);
  }

  commandBotRunner(exchangeList, currentBots) {
    currentBots.forEach(bot => {
      let botExchangeName = bot.exchange.name;
      let botexchange = bot.exchange;

      exchangeList.forEach(exchange => {
        if (botExchangeName == exchange.name) {
          bot.exchange = exchange;
          bot.market = bot.market.replace("-", "/");

          botRunner(bot);
        }
      });
    });
  }

  onToggle(isOn) {
    if (isOn == false) {
      // alert('All Bots Have Been Shut Off');
      this.setState({ bots_toggle: "Off" });
      pauseAllBots();
    } else {
      // alert('All Bots Have Been turned On');
      this.setState({ bots_toggle: "On" });
      resumeAllBots();
      let priceArray = [];

      // Get current bots
      let currentBots = [];
      fetchCurrentBots(currentBots);

      setTimeout(() => {
        this.commandBotRunner(this.state.exchangeList, currentBots);
      }, 1000);
    }
  }

  checkNumberOfExchanges() {
    if (this.state.noExchanges !== "") {
      return (
        <Text
          style={{
            color: "white",
            fontSize: 24,
            textAlign: "center",
            paddingTop: 10
          }}
        >
          No Exchanges Added
        </Text>
      );
    } else {
      return (
        <ScrollView>
          {this.state.exchangeList.map((e, index) => (
            <CommandExchangeItem
              navigation={this.props.navigation}
              chart_exchange={e}
              red_shades={red_shades[index]}
              toggleBot={this.state.bots_toggle}
            />
          ))}
        </ScrollView>
      );
    }
  }

  loading = () => {
    if (this.state.loading) {
      return (
        <View style={{ paddingTop: 100 }}>
          <Spinner />
          <View style={{ marginTop: 200 }}>
            <Button
              title="Learn More"
              onPress={() => {
                const { navigate } = this.props.navigation;
                navigate("Onboarding");
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 30
          }}
        >
          <Text style={{ fontSize: 28, color: "#fff", fontWeight: "bold" }}>
            COMMAND
          </Text>
        </View>

        <View style={{ flex: 0.46 }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 0.1 }}>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                $ {this.state.totalBalance}
              </Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <View
                ref={scrollView => {
                  this.scrollView = scrollView;
                }}
                decelerationRate={0.3}
                snapToAlignment={"center"}
              />

              <ScrollView style={{ flex: 0.2 }}>
                {this.state.exchangeList.map(exchange => (
                  <Price_Line_Graph chart_exchange={exchange} />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={{flex: 0.1,borderTopWidth: 2,borderBottomWidth: 2,borderColor: "#fff"}}>
          <View style={{flex: 1,flexDirection: "row",justifyContent: "space-around",alignItems: "center",paddingLeft: 20,paddingRight: 20}}>
            <View style={{ flex: 0.5 }}>
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Toggle All Bots
              </Text>
            </View>
            <View styles={{ flex: 0.1, textAlign: "right" }}>
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {this.state.bots_toggle}
              </Text>
            </View>
            <View style={{flex: 0.4,flexDirection: "row",justifyContent: "space-around"}}>
              <ToggleSwitch
                onColor={Colors.lightBlue}
                offColor={Colors.lightGray}
                size="large"
                isOn={this.state.isOnDefaultToggleSwitch}
                onToggle={isOnDefaultToggleSwitch => {
                  this.setState({ isOnDefaultToggleSwitch });
                  this.onToggle(isOnDefaultToggleSwitch);
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 0.34 }}>
          <View style={{ flex: 1, flexdirection: "column" }}>
            <View style={{ flex: 0.3, borderBottomWidth: 2, borderColor: "#fff" }}>
              <View style={{flex: 1,flexDirection: "row",justifyContent: "space-between",paddingLeft: 20,paddingRight: 20}}>
                <View style={{ flex: 0.7, alignSelf: "center" }}>
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    YOUR EXCHANGES
                  </Text>
                </View>
                <TouchableOpacity
                    style={{flex:.1,justifyContent:'center'}}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("Onboarding");
                    }}>
                    <Image
                      style={{tintColor:'white', height:25, width:25}}
                      resizeMode="contain"
                      source={require("../assets/images/Information-icon.png")}
                    />
            </TouchableOpacity>
                <View style={{flex: 0.2,justifyContent: "space-around"}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ height: 20, width: 20, alignSelf: "flex-end" }}
                    onPress={this._addExchange}
                  >
                    <Image
                      source={require("../assets/images/add.png")}
                      style={Styles.btnImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.7 }}>{this.checkNumberOfExchanges()}</View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let red_shade_index = 0;
    return <View style={Styles.container}>{this.loading()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
