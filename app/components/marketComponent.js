import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ART,
  Dimensions
} from "react-native";
import styles from "../styles/MarketComponent.style.js";

import ccxt from "ccxt";
import * as d3 from "d3";
import Morph from "art/morph/path";
import { Button } from "react-native-elements";
import { text } from "d3-fetch";

import Spinner from "./../config/Spinner";

import Manual_LimitOrderButton from "../buttons/Manual_LimitOrderButton.js";
import Manual_SellLimitOrderButton from "../buttons/Manual_SellLimitOrderButton.js";

import Command from "../screens/Command.js";
import MarketDescription from "../screens/MarketDescription.js";

import { fetchBalance, fetchTicker } from "../scripts/ccxt.js";

const { Surface, Group, Shape, ArtGroup } = ART;

let str = ccxt.markets;
let screen = Dimensions.get("window");

//pull data from database initially
let balanceList = [];
let colors = [];
let sectionAngles = d3.pie().value(d => d.holdings)(balanceList);

// this determines the placements of the graph on the screen
let width = screen.width;
let height = screen.height / 4;

const path = d3
  .arc()
  .outerRadius(height / 3.5) //must be less than 1/2 the chart's height/width
  .padAngle(0.08) //defines the amount of whitespace between sections
  .innerRadius(30); //the size of the inner 'donut' whitespace

export default class MarketComponent extends Component {
  state = {
    sectionAngles: sectionAngles,
    balanceList: [],
    loading: true,
    chart_market: this.props.chart_market,
    marketTitle: this.props.marketName,
    exchangeTitle: this.props.exchangeName,
    currentPrice: "",
    exchange: {},
    interval: ""
  };

  constructor(props) {
    super(props);

    fetchBalance(this.props.exchange, this.state.balanceList)
      .then(() => {
        // balanceList = newData;

        colors = d3
          .scaleLinear()
          .domain([0, this.state.balanceList.length])
          .range([255, 0]);
        let sectionAngles = d3.pie().value(d => d.holdings)(
          this.state.balanceList
        );
        this.setState(previousState => {
          return {
            balanceList: this.state.balanceList,
            sectionAngles: sectionAngles,
            loading: false
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.state.marketTitle = this.props.marketName;
    this.state.exchangeTitle = this.props.exchangeName
      .toString()
      .replace(/\s/g, "")
      .toLowerCase();
    this.state.exchange = this.props.exchange;

    console.log("Market title!", this.state.marketTitle);
    console.log("Inside Market Component!", this.state.exchange);
    let marketInfo = {};

    this.state.interval = setInterval(() => {
      fetchTicker(this.state.exchange, this.state.marketTitle, marketInfo)
        .then(() => {
          // You probably want to this.setState here so
          // the new data can be rendered to the screen
          if (this.state.exchange.name.toLowerCase() === "binance") {
            typeof marketInfo.bid === "number"
              ? this.setState({ currentPrice: marketInfo.bid })
              : this.setState({ currentPrice: "N/A" });
          } else {
            this.setState({ currentPrice: marketInfo.info.price });
          }
        })
        .catch(err => {
          //get any errors and log them here
          console.log(this.state.currentPrice);
          console.log(err);
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);

    console.log("unmounted!");
  }

  // componentWillUnmount(){
  //
  //       this.setState({
  //           chart_market: [this.props.chart_exchang],
  //           balanceList : []
  //       });
  //
  //
  // }
  //WE SHOULD USE THIS
  // componentWillRecieveProps(nextProps,nextState){
  //   this.setState({
  //    NavTitle:nextProps["title"],
  //     NavColor:nextProps["tintColor"]
  //    });
  //
  //   }
  //   shouldComponentUpdate(nextProps,nextState){
  //      // your condition if you want to re-render every time on props change
  //    return true;
  //   }

  // <Manual_LimitOrderButton market = {this.props.marketName.toString()} exchange={this.state.exchange} passedPrice={this.state.currentPrice}></Manual_LimitOrderButton>
  // <Manual_SellLimitOrderButton market = {this.props.marketName.toString()} exchange={this.state.exchange} passedPrice={this.state.currentPrice}></Manual_SellLimitOrderButton>

  onMarketSelect = () => {
    const { navigate } = this.props.navigation;

    navigate("MarketDescription", {
      market: this.props.marketName.toString(),
      exchange: this.state.exchange
    });

    clearInterval(this.state.interval);
  };

  loading() {
    if (Object.keys(this.state.exchange).length != 0) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.exchangeTitle}>
            {this.props.marketName.toString()}
          </Text>

          <Text style={styles.priceContainer}>{this.state.currentPrice}</Text>
        </View>
      );
    } else {
      return <Spinner />;
    }
  }

  clearFunc = () => {
    clearInterval(refresh);
  };

  holdingsInfo = market => {
    console.log(market);
    //Do something with info

    //Add pie animation and trigger maybe the graph????
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onMarketSelect}>
          {this.loading()}
        </TouchableOpacity>
      </View>
    );
  }
}
