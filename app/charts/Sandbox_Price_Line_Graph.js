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
  Image,
  ScrollView
} from 'react-native';
import styles from '../styles/Sandbox_Price_Line_Graph.style.js';

import ccxt, { yobit } from 'ccxt';
import * as d3 from 'd3';
import {scaleTime, scaleLinear} from "d3-scale";
import Morph from 'art/morph/path';
import { Button } from 'react-native-elements';
import { text } from 'd3-fetch';
import * as shape from 'd3-shape';
// import LimitOrderButton from '../buttons/LimitOrderButton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from './../config/Spinner';

import Command from '../screens/Command.js';
import ExchangeDescription from '../screens/ExchangeDescription.js';


import {fetchSandBoxBalance, getCurrentUserID, fetchSandboxBotTradeHistory} from '../scripts/firebase.js';
import {fetchTicker,fetchBalance , sandbox_exchange, coinbase_exchange} from '../scripts/ccxt.js';

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
// export let exchange = new ccxt[coinbase_id] ();
//

  //EXCHANGE INFORMATION
    let str = ccxt.exchanges;

  //WINDOW INFORMATION FOR DRAWING OF THE PIE GRAPH
    let screen = Dimensions.get('window');
    let width = screen.width;
    let height = screen.height/4;

    let colors = [];
    let marketColors = {};

    //OFFSETS TO SHOW WHAT THE LINE GRAPH ON THE CENTER COMPONENT
    let xOffset = (width - wp('90%'))/2;
    let yOffset = (height - hp('55%'))/2;

    // this determines the placements of the graph on the screen
    const path = d3.arc()
      .outerRadius(height/3.5) //must be less than 1/2 the chart's height/width
      .padAngle(.08) //defines the amount of whitespace between sections
      .innerRadius(30) //the size of the inner 'donut' whitespace

export default class Sandbox_Price_Line_Graph extends Component {

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
    buyDotList:[],
    sellDotList:[],
    graphTimeFrame: 300,

    loading: true,

    //WHICH EXCHANGE I AM GIVEN
    chart_exchange: sandbox_exchange,

    //SHOW PIE GRAPH FIRST THEN THE LINE GRAPH
    showPie: true,
    showLineGraph: true,
    sandboxBotTradeHistory:  [],

  };

  constructor(props) {
    super(props);

  }

  // _onExchangeSelect = () => {
  //   console.log('Exchange Selected!',sandbox_exchange.name.toString());
  //   const {navigate} = this.props.navigation;
  //   navigate('ExchangeDescription',{exchangeName: sandbox_exchange.name.toString(), exchange:sandbox_exchange});
  // }

  showPieGraph(){
    //updating the component to show a line graph
    this.setState(previousState => {
      return ({ balanceList: this.state.balanceList,
               sectionAngles: this.state.sectionAngles,
               loading: false,
               showPie: true,
               showLineGraph: true,
               });
    })
  }

  componentDidMount(){
        this.setState({
            chart_exchange: sandbox_exchange,
        });

    // setInterval(()=>{
      fetchedSandboxBotTradeHistory = []
      fetchSandboxBotTradeHistory(fetchedSandboxBotTradeHistory)

      setTimeout(()=>{


        this.setState({sandboxBotTradeHistory: fetchedSandboxBotTradeHistory})

        // console.log("Mounting Price Graph: ", this.state.sandboxBotTradeHistory)


    // },4000)

    console.log("IN Line graph",sandbox_exchange);
      fetchBalance(sandbox_exchange, this.state.balanceList)
      .then(() => {
          // balanceList = newData;
          colors = d3.scaleLinear()
          .domain([0, this.state.balanceList.length]).range([255, 0]);

          for(var key in this.state.balanceList){
            marketColors[this.state.balanceList[key].name] = `rgb(70,70,70)`;
          }

          let sectionAngles = d3.pie().value(d => d.holdings)(this.state.balanceList.filter(exchange => exchange.name != "USD-USD"));
          this.setState(previousState => {
            return ({ balanceList: this.state.balanceList,
                     sectionAngles: sectionAngles,
                     loading: false,
                     showPie: true,
                     showLineGraph: true,
                     });
          });
          console.log("Inside fetch in Holdings",this.state.balanceList);
      })
      .catch(err => {
      })
      console.log("Outside fetch in Holdings",this.state.balanceList);
      this.fetchHistory(coinbase_exchange);

    },1000);
  }

loading() {
      if (this.state.loading) {
          return (
            <Spinner/>
          );
      }

      return (
          <View styles = {styles.container}>
            <Text style={{color:'#fff', textAlign:'center', fontWeight:'bold'}}>
                Sandbox
            </Text>
            <Text  style={{color:Colors.lightGray, textAlign:'center', fontWeight:'bold',paddingTop:10}}>
                {this.state.graphTimeFrame} Days
            </Text>
            <Text style={[styles.exchangeTitle]} >
              BTC/USD
            </Text>

          <View styles = {styles.graphContainer}>

            {/*
            - If state variable of lineGraph is true
            - showLineGraph and showPie will always be different
            */}
            {(

              <View style = {styles.graph}>
                <Surface width={width} height={height}>
                  <Group x={0} y={height/2}>
                    {
                      // Actual Line based on the  data of fetch history
                      <Shape
                        d={this.state.line}
                        strokeWidth={2}
                        stroke="#ffffff"
                      />
                    }
                    {
                      //Inner Green Line
                      // TODO : if first val is > end val, turn line red instead of green representing deficit
                      <Shape
                        d={this.state.line}
                        strokeWidth={2}
                        stroke={Colors.lightBlue}
                      />
                    }
                    {
                      //xAxis
                      <Shape
                        d={this.state.xAxis}
                        strokeWidth={2}
                        stroke={Colors.lightGray}
                      />
                    }
                    {
                      //yAxis
                      <Shape
                        d={this.state.yAxis}
                        strokeWidth={2}
                        stroke={Colors.darkGray}
                      />
                    }
                    {
                      //line representing minY
                      <Shape
                        d={this.state.minY}
                        strokeWidth={3}
                        stroke={Colors.white}
                      />
                    }
                    {
                      //line representing maxY
                      <Shape
                        d={this.state.maxY}
                        strokeWidth={3}
                        stroke={Colors.white}
                      />
                    }

                    {this.state.buyDotList.map((buyDot) => (
                      <Shape
                        d={buyDot}
                        strokeWidth={6}
                        stroke={Colors.green}
                      />
                    ))}
                    {this.state.sellDotList.map((sellDot) => (
                      <Shape
                        d={sellDot}
                        strokeWidth={6}
                        stroke={Colors.red}
                      />
                    ))}
                  </Group>
                </Surface>
              </View>
            )}
          </View>


        </View>
      );
  }

   fetchHistory = async (exchange) => {
     //convert timeFrame given in days to UTC time
     let d = new Date();
     d.setDate(d.getDate() - (this.state.graphTimeFrame + 1));
     let parsedUnixTime = d.getTime();
     // console.log("FETCH HISTORY TEST", exchange);
    let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
    if (exchange.has.fetchOHLCV) {
          await sleep (exchange.rateLimit) // milliseconds
          this.state.historyList = [];
          name = exchange.name.replace("-","/");
          historyList = await exchange.fetchOHLCV ("BTC/USD", '1d',parsedUnixTime,undefined,{});
          historyList.reverse();
          let min = Infinity;
          let max = -Infinity;
          // let openList = [];
          // let closeList = [];
          // let minList = [];
          // let maxList = [];
          let yAxisArr = [];
          let i;


          for(i = 0; i <= historyList.length - 1; i++){



            if(historyList[i][4] < min){
              min = historyList[i][4];
            }
            if(max < historyList[i][4]){
              max = historyList[i][4];
            }
            this.state.historyList.push({x:i,y:historyList[i][4]});
            // openList.push({x:i,y:historyList[i][1]});
            // maxList.push({x:i,y:historyList[i][2]});
            // minList.push({x:i,y:historyList[i][3]});
            // closeList.push({x:i,y:historyList[i][4]});
            yAxisArr.push({x:i,y:historyList[i][4]});
          }

          // console.log("Sandbox price history length: "+ historyList.length)
          // console.log("Sandbox price history : "+ historyList)

          console.log("Sandbox Min: "+ min);
          console.log("Sandbox Max: "+ max);
          yAxisArr[0] = {x:0,y:min - min/4};
          yAxisArr[i - 1] = {x:i - 1 ,y:max + max/4};

          //LINE INFORMATION DATA
          let scaleX =  scaleTime().domain([0,historyList.length - 1]).range([xOffset + 40 ,width - xOffset - 20]);
          let scaleY =  scaleLinear().domain([min - min/4,max + max/4]).range([height + yOffset - 20,yOffset + 10]);

          console.log("\n\n Scaled X: ", scaleX)

          //THIS IS WHAT I HAVE TO USE DATA WITH AND FORMAT HOW THE DATA IS ORGANIZED
          let newLine = shape.line()
                      .x(d => scaleX(d.x))
                      .y(d => scaleY(d.y))
                      .curve(shape.curveLinear)(this.state.historyList);

          let xAxis = shape.line()
                      .x(d => scaleX(d.x))
                      .y(height + yOffset - 20)
                      .curve(shape.curveLinear)(this.state.historyList);

          let yAxis = shape.line()
                      .x(xOffset + 40)
                      .y(d => scaleY(d.y))
                      .curve(shape.curveLinear)(yAxisArr);

          let minY = shape.line()
                      .x(d => scaleX(d))
                      .y(scaleY(min))
                      .curve(shape.curveLinear)([-0.5,0.5]);

          let maxY = shape.line()
                      .x(d => scaleX(d))
                      .y(scaleY(max))
                      .curve(shape.curveLinear)([-0.5,0.5]);



          console.log("Max in Line Graph: ", max)
          console.log("Scaled in Price Line Graph: ", scaleY(max))
          //How to make circle in center of graph
          //make sure stroke is 10
          let buyDotList = []
          let sellDotList = []
          this.state.sandboxBotTradeHistory.forEach((tradeHistoryObject)=>{

            if (tradeHistoryObject.type == "Buy"){
              let buyDot = shape.line()
                            ///use scale functions here
                          .x(scaleX(tradeHistoryObject.index))
                          .y(scaleY(tradeHistoryObject.price))
                          .curve(shape.curveLinear)
                          //use normal 0-this.state.timeframe here
                          ([-4,4]);

              buyDotList.push(buyDot)
            }
            if (tradeHistoryObject.type == "Sell"){
              let sellDot = shape.line()
                            ///use scale functions here
                          .x(scaleX(tradeHistoryObject.index))
                          .y(scaleY(tradeHistoryObject.price))
                          .curve(shape.curveLinear)
                          //use normal 0-this.state.timeframe here
                          ([-4,4]);

              sellDotList.push(sellDot)
            }


          })







          this.setState(previousState => {
            return ({ balanceList: this.state.balanceList,
                      historyList: this.state.historyList,
                      //Line Information
                      line:newLine,
                      xAxis:xAxis,
                      yAxis:yAxis,
                      minY:minY,
                      maxY:maxY,
                      showLineGraph:true,

                      //Pie Information
                      sectionAngles: this.state.sectionAngles,
                      showPie: false,
                      loading: false,
                      buyDotList: buyDotList,
                      sellDotList: sellDotList
                      });
          });



    }
}



  render() {
    return (
      <View style={styles.container}>
          {this.loading()}
      </View>

    )
  }
}
