//////////////UI imports//////////////
import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  ART,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Button
} from "react-native";
import Styles from "../styles/Command.style";
import PauseAllBotsButton from "../buttons/PauseAllBotsButton.js";
import CommandExchangeItem from "../components/CommandExchangeItem.js";
import CommandSandboxExchangeItem from "../components/CommandSandboxExchangeItem.js";
import Spinner from "./../config/Spinner";
import PriceLineGraph from "../charts/Price_Line_Graph.js";
import SandboxPriceLineGraph from "../charts/Sandbox_Price_Line_Graph.js";
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
import firebase from "react-native-firebase";

const deviceWidth = Dimensions.get("window");
const deviceHeight = Dimensions.get("window");

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
  _addExchange = () => {
    const { navigate } = this.props.navigation;
    navigate("Exchanges");
  };

  componentDidMount() {
    this.firstTimeUser();

    // pauseAllBots();
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
              }
            });
          }, 1000);
        });
        setTimeout(() => {
          this.state.exchangeList.length == 0
            ? this.setState({ noExchanges: "No Exchange(s) Added" })
            : this.setState({ noExchanges: "" });

          this.state.totalBalanceList = [];
          totalBalance += exchangeTotalBalance;
          this.state.totalBalanceList.push(totalBalance);

          this.setState({ totalBalance: Number(totalBalance).toFixed(2) });
        }, 2000);

        this.setState({ exchangeList: _exchangeList });
      }, 3000);
    }, 4000);
  }

  firstTimeUser() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data().firstTimeUser) {
          this.props.navigation.navigate("Onboarding");
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              firstTimeUser: false
            });
        }
      });
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
      this.setState({ bots_toggle: "Off" });
      // pauseAllBots();
    } else {
      let priceArray = [];
      let currentBots = [];
      this.setState({ bots_toggle: "On" });
      resumeAllBots();
      fetchCurrentBots(currentBots);

      setTimeout(() => {
        this.commandBotRunner(this.state.exchangeList, currentBots);
      }, 1000);
    }
  }

  checkNumberOfExchanges() {
    // if (this.state.noExchanges !== "") {
    //   return (
    //     <Text style={[Styles.text, { textAlign: "center" }]}>
    //       No Exchanges Added
    //     </Text>
    //   );
    // } else {
      return (
        <ScrollView>
          <View style={{ paddingBottom: 10 }}>
            <CommandSandboxExchangeItem
              navigation={this.props.navigation}
              // chart_exchange={e}
              // red_shades={red_shades[index]}
              toggleBot={this.state.bots_toggle}
            />
          </View>
          {this.state.exchangeList.map((e, index) => (
            <View style={{ paddingBottom: 10 }}>
              <CommandExchangeItem
                navigation={this.props.navigation}
                chart_exchange={e}
                red_shades={red_shades[index]}
                toggleBot={this.state.bots_toggle}
              />
            </View>
          ))}
        </ScrollView>
      );
    // }
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
                this.props.navigation.navigate("Onboarding");
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>COMMAND</Text>
        </View>

        <View style={Styles.graphContainer}>
          <View style={Styles.balanceContainer}>
            <Text style={Styles.balanceText}>$ {this.state.totalBalance}</Text>
          </View>
          <View style={Styles.graphs}>
            <ScrollView horizontal={true} indicatorStyle={"white"}>
              {this.state.exchangeList.map(exchange => (
                <PriceLineGraph chart_exchange={exchange} />
              ))}
              <SandboxPriceLineGraph btcBalance={this.state.BTCBalance} />
            </ScrollView>
          </View>
        </View>

        <View style={Styles.toggleContainer}>
          <View style={{ flex: 0.5 }}>
            <Text style={Styles.text}>Toggle All Bots</Text>
          </View>
          <View styles={{ flex: 0.1, textAlign: "right" }}>
            <Text style={Styles.text}>{this.state.bots_toggle}</Text>
          </View>
          <View style={Styles.toggleSwitch}>
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

        <View style={Styles.exchangesContainer}>
          <View style={Styles.topContainer}>
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text style={[Styles.text, { fontSize: 20, fontWeight: "bold" }]}>
                EXCHANGES
              </Text>
            </View>

            <TouchableOpacity
              style={Styles.infoContainer}
              onPress={() => this.props.navigation.navigate("Onboarding")}
            >
              <Image
                style={Styles.infoBtn}
                resizeMode="contain"
                source={require("../assets/images/Information-icon.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.addExchange}
              onPress={this._addExchange}
            >
              <Image
                source={require("../assets/images/add.png")}
                resizeMode="contain"
                style={Styles.btnImage}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.7 }}>{this.checkNumberOfExchanges()}</View>
        </View>
      </View>
    );
  };

  render() {
    return <View style={Styles.container}>{this.loading()}</View>;
  }
}
