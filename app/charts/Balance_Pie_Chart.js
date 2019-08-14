import React, { Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ART,
  Dimensions,
  ScrollView
} from 'react-native';
import styles from '../styles/Balance_Pie_Chart.style.js';

import ccxt, { yobit } from 'ccxt';
import * as d3 from 'd3';
import {scaleTime, scaleLinear} from "d3-scale";
import Morph from 'art/morph/path';
import { Button } from 'react-native-elements';
import { text } from 'd3-fetch';
import * as shape from 'd3-shape';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from './../config/Spinner';

import Command from '../screens/Command.js';
import ExchangeDescription from '../screens/ExchangeDescription.js';

import {fetchBalance } from '../scripts/ccxt.js';

const { Surface, Group, Shape, ArtGroup, Path } = ART;

import firebase from 'react-native-firebase';

import {red_shades} from '../styles/global/colors.js';

import {Colors} from '../styles/global/colors.js';


//DONT KNOW WHY THIS IS HERE JUST YET ASSUMING ILL PULL THIS FROM FOLLOWING IN DATABASE
// let sandbox_id = 'gdax';
// let sandbox_symbols = ['BTC/USD'];
// export let sandbox_exchange = new ccxt[sandbox_id] ();
// let binance_id = 'binance';
// export let binance_exchange = new ccxt[binance_id] ();
// let coinbase_id = 'coinbasepro';
// export let coinbase_exchange = new ccxt[coinbase_id] ();
//

  //EXCHANGE INFORMATION
    let str = ccxt.exchanges;

  //WINDOW INFORMATION FOR DRAWING OF THE PIE GRAPH
    let screen = Dimensions.get('window');
    let width = screen.width;
    let height = screen.height/3;

    let colors = [];
    let marketColors = {};

    //OFFSETS TO SHOW WHAT THE LINE GRAPH ON THE CENTER COMPONENT
    let xOffset = (width - wp('80%'))/2;
    let yOffset = (height - hp('50%'))/2;

    // this determines the placements of the graph on the screen
    const path = d3.arc()
      .outerRadius(height/3.5) //must be less than 1/2 the chart's height/width
      .padAngle(.08) //defines the amount of whitespace between sections
      .innerRadius(30) //the size of the inner 'donut' whitespace

export default class Balance_pie_chart extends Component {

  //BEGINING STATE
  state = {
    //DATA TO DRAW THE PIE GRAPH
    sectionAngles: [],
    balanceList: [],

    //Line INFO
    historyList: [],
    line:[],
    xAxis: [],
    yAxis: [],
    minY: [],
    maxY:[],

    loading: true,

    //WHICH EXCHANGE I AM GIVEN
    chart_exchange: this.props.chart_exchange,

    //SHOW PIE GRAPH FIRST THEN THE LINE GRAPH
    showPie: true,
    showLineGraph: false,

  };

  constructor(props) {
    super(props);
    console.log("IN BALANCE CHART",this.props.chart_exchange);
      fetchBalance(this.props.chart_exchange, this.state.balanceList)
      .then(() => {
          // balanceList = newData;
          colors = d3.scaleLinear()
          .domain([0, this.state.balanceList.length]).range([255, 0]);

          for(var key in this.state.balanceList){
            marketColors[this.state.balanceList[key].name] = `rgb(`+ colors(key) + `,70,70)`;
          }

          let sectionAngles = d3.pie().value(d => d.holdings)(this.state.balanceList.filter(exchange => exchange.name != "USD-USD"));
          this.setState(previousState => {
            return ({ balanceList: this.state.balanceList,
                     sectionAngles: sectionAngles,
                     loading: false,
                     showPie: true,
                     showLineGraph: false,
                     });
          });

          console.log("Inside fetch in Holdings",this.state.balanceList);
      })
      .catch(err => {
          // this.alert(err);
      })
    // }
    // ,2000);

      console.log("Outside fetch in Holdings",this.state.balanceList);


  }

  _onExchangeSelect = () => {

    console.log('Exchange Selected!',this.props.chart_exchange.name.toString());
    const {navigate} = this.props.navigation;


    navigate('ExchangeDescription',{exchangeName: this.props.chart_exchange.name.toString(), exchange:this.props.chart_exchange});
  }

  showPieGraph(){
    //updating the component to show a line graph
    this.setState(previousState => {
      return ({ balanceList: this.state.balanceList,
               sectionAngles: this.state.sectionAngles,
               loading: false,
               showPie: true,
               showLineGraph: false,
               });
    });
  }

  componentDidMount(){
        this.setState({chart_exchange: this.props.chart_exchange});
  }

loading() {
      if (this.state.loading) {
          return <Spinner/>
      }

      return (
          // Top title of which exchange you are following

          <View styles = {styles.container}>

            <View styles = {styles.graphContainer}>
                {
                    this.state.showPie && (
                        <Surface width={width} height={height}>
                          <Group x={width/2} y={height/2}>
                            {
                              // Graph the pie graph based on the slices calculated with the d3 pie graphing functions
                              this.state.sectionAngles
                              .filter(exchange => (exchange.name != "USD-USD" ))
                              .map(section => (
                                <Shape
                                  key={section.index}
                                  d={path(section)}
                                  stroke="#ffffff"
                                  fill={`${red_shades[section.index]}`}
                                  strokeWidth={1}
                                />
                            ))
                            }
                          </Group>
                        </Surface>
                    )
                }
          </View>

          <ScrollView horizontal style={{borderBottomWidth:2,borderColor:'#fff'}}>
              {
                this.state.balanceList.filter(exchange => exchange.name != "USD-USD").map(exchange => (
                    <TouchableOpacity key={exchange.name} >
                      <Text style={[styles.exchangeTitle,{color:'#fff'}]} testID={exchange.name} >
                        <Text style={{color:'#fff'}}>
                            ${exchange.holdings} in {exchange.name}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  ))
              }
         </ScrollView>

        </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
          {this.loading()}
      </View>

    )
  }
}
