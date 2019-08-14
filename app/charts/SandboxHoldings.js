import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ART,
  Dimensions
} from 'react-native';
import styles from '../styles/SandboxHoldings_PieChart.style.js';

import ccxt from 'ccxt';
import * as d3 from 'd3';
import Morph from 'art/morph/path';
import { Button } from 'react-native-elements';
import { text } from 'd3-fetch';

import Spinner from './../config/Spinner';
import firebase from 'react-native-firebase';

import {fetchSandBoxBalance, getCurrentUserID} from '../scripts/firebase.js';
import {fetchTicker,fetchBalance , sandbox_exchange} from '../scripts/ccxt.js';

const { Surface, Group, Shape, ArtGroup } = ART;

    let str = ccxt.exchanges;
    let screen = Dimensions.get('window');
    let balanceList = [];
    let colors = [];
    let sectionAngles = d3.pie().value(d =>
      d.holdings)(balanceList);

    let width = screen.width;
    let height = screen.height/3;

    // //OFFSETS TO SHOW WHAT THE LINE GRAPH ON THE CENTER COMPONENT
    // let xOffset = (width - wp('80%'))/2;
    // let yOffset = (height - hp('50%'))/2;

    // this determines the placements of the graph on the screen
    const path = d3.arc()
      .outerRadius(height/3.5) //must be less than 1/2 the chart's height/width
      .padAngle(.08) //defines the amount of whitespace between sections
      .innerRadius(30) //the size of the inner 'donut' whitespace

    //
    // const path = d3.arc()
    //   .outerRadius(height/3.5) //must be less than 1/2 the chart's height/width
    //   .padAngle(.08) //defines the amount of whitespace between sections
    //   .innerRadius(0.0) //the size of the inner 'donut' whitespace


export default class SandboxHoldings extends Component {

  state = {
    sectionAngles: sectionAngles,
    balanceList: [],
    loading: true,
    chart_exchange: [],
    initialReadBalance:0,
    currentPrice: 0,
    chartBalance: [],
    USDBalance: 0,
    BTCBalance: 0
  };

  constructor(props) {
    super(props);


    // let refresh = setInterval(() => {
    //   tempData = balanceList;
    //   let newData = [];

      // fetchBalance(this.props.chart_exchange, this.state.balanceList)
      // .then(() => {
          // balanceList = newData;


    setInterval(() => {
      let pulledSandboxBalance = [];
      // console.log('refresh() from Sandbox');
      // const { params } = this.props.navigation.state;
      let market = "BTC/USD";
      let exchangeTitle = "coinbasepro";
      let exchange = new ccxt[exchangeTitle] ();
      let marketInfo= {};

      fetchTicker(exchange,market,marketInfo)
      .then(() => {
          this.setState(previousState => {
            return ({ marketObj : marketInfo });
          });

          this.state.currentPrice = parseFloat(marketInfo.info.price);
      })
      .catch(err => {
          console.log(err);
      })

          fetchSandBoxBalance(pulledSandboxBalance);
          let _balanceList = [];
          // if (pulledSandboxBalance[0])
      


          setTimeout(() => {
              pulledSandboxBalance[0].forEach(balance => {
                _balanceList.push(balance)
            });

              let updated_balanceList = [];

              this.setState({ balanceList:_balanceList });

                for (let i in this.state.balanceList){
                      if (this.state.balanceList[i].name.toString() == 'BTC'){
                        this.state.initialReadBalance = (parseFloat(this.state.balanceList[i].holdings) * parseFloat(this.state.currentPrice));
                      }
                  }
                colors = d3.scaleLinear()
                .domain([0, this.state.balanceList.length-2]).range([255, 0]);
                let sectionAngles = d3.pie().value(d => {
                        if(d.name == 'BTC'){

                            return this.state.initialReadBalance;
                            // console.log(this.state.initialReadBalance)
                        }else if (d.name == 'USD') {

                            return d.holdings;
                        }
                  })(this.state.balanceList);

                this.setState(previousState => {
                return ({ balanceList: this.state.balanceList,
                         sectionAngles: sectionAngles,
                         loading: false });
              });
          }, 2000)
        }, 2000);
  }

  componentDidMount() {
      // TODO: buy only works once? why??

      const ref = firebase.firestore()
                .collection('users')
                .doc(getCurrentUserID())
                .collection('sandbox')
                .doc('sandbox_coinbase');

                ref.onSnapshot(doc => {
                    this.setState({ USDBalance: doc.data().balance[0].holdings});
                    this.setState({ BTCBalance: doc.data().balance[1].holdings});
                });
  }

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

loading() {
      if (this.state.loading) {
          return <Spinner />
      }

      return (
          <View styles = {styles.container}>

              <Surface width={width} height={height}>

                <Group x={width/2} y={height/2 }>
                  {
                    this.state.sectionAngles.map(section => (
                      <Shape
                        key={section.index}
                        d={path(section)}
                        stroke="#000"
                        fill = {
                            `rgb(${colors(section.index)},${0},${0})`
                        }
                        strokeWidth={3}
                      />
                    ))
                  }
                </Group>
              </Surface>

                <View >
                   {
                        this.state.balanceList.map(exchange => {
                          if (exchange.name == 'BTC'){
                            return(
                            <TouchableOpacity key={exchange.name} onPress={() => this.holdingsInfo({exchange})}>
                                 <Text style={styles.infoTitle} >
                                     You have {Number(this.state.BTCBalance ).toFixed(2)} {exchange.name}
                                 </Text>
                                 <Text style={styles.infoTitle} >
                                     (${Number(this.state.BTCBalance * this.state.currentPrice).toFixed(2)} in USD)
                                 </Text>
                            </TouchableOpacity>
                              )
                          } else if (exchange.name == 'USD') {

                            return(
                             <TouchableOpacity key={exchange.name} onPress={() => this.holdingsInfo({exchange})}>
                                  <Text style={styles.infoTitle} >
                                      You have ${this.state.USDBalance} in {exchange.name}
                                  </Text>
                             </TouchableOpacity>
                            )
                           }
                        })
                    }
                  </View>
          </View>
      );
  }

  holdingsInfo = (exchange) => {
      console.log(exchange);
  }

  render() {
    return (
      <View style={styles.container}>
          {this.loading()}
      </View>
    );
  }
}
