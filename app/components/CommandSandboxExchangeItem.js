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
  Image
} from 'react-native';
import styles from '../styles/CommandExchangeItem.style.js';

import { Colors } from '../styles/global/colors';

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

import {fetchBalance } from '../scripts/ccxt.js';
import {fetchCurrentBots} from '../scripts/firebase.js';

const { Surface, Group, Shape, ArtGroup, Path } = ART;

import firebase from 'react-native-firebase';


//DONT KNOW WHY THIS IS HERE JUST YET ASSUMING ILL PULL THIS FROM FOLLOWING IN DATABASE
let sandbox_id = 'gdax';
let sandbox_symbols = ['BTC/USD'];
export let sandbox_exchange = new ccxt[sandbox_id] ();
let binance_id = 'binance';
export let binance_exchange = new ccxt[binance_id] ();
let coinbase_id = 'coinbasepro';
export let coinbase_exchange = new ccxt[coinbase_id] ();


  //EXCHANGE INFORMATION
    let str = ccxt.exchanges;

  //WINDOW INFORMATION FOR DRAWING OF THE PIE GRAPH
    let screen = Dimensions.get('window');
    let width = screen.width;
    let height = screen.height/4;

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

export default class commandSandboxExchangeItem extends Component {

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
    selectedLine:"",

    loading: false,

    //WHICH EXCHANGE I AM GIVEN
    chart_exchange: "Sandbox",//this.props.chart_exchange,

    //SHOW PIE GRAPH FIRST THEN THE LINE GRAPH
    showPie: true,
    showLineGraph: false,


    toggleBot: [],

    // this._handleTextChange = this._handleTextChange.bind(this);

  };

  constructor(props) {
    super(props);
      // fetchBalance(this.props.chart_exchange, this.state.balanceList)
      // .then(() => {
      //     // balanceList = newData;
      //     colors = d3.scaleLinear()
      //     .domain([0, this.state.balanceList.length]).range([255, 0]);
      //
      //     for(var key in this.state.balanceList){
      //       marketColors[this.state.balanceList[key].name] = `rgb(70,`+ colors(key) + `,70)`;
      //     }
      //
      //     let sectionAngles = d3.pie().value(d => d.holdings)(this.state.balanceList.filter(exchange => exchange.name != "USD-USD"));
      //     this.setState(previousState => {
      //       return ({ balanceList: this.state.balanceList,
      //                sectionAngles: sectionAngles,
      //                loading: false,
      //                showPie: true,
      //                showLineGraph: false,
      //                });
      //     });
      //
      // })
      // .catch(err => {
      //     // this.alert(err);
      // })



  }

  _onExchangeSelect = () => {

    // console.log('Exchange Selected!',this.props.chart_exchange.name.toString());
    const {navigate} = this.props.navigation;


    navigate('Sandbox');
  }

  componentDidMount(){
        this.setState({
            chart_exchange:  "Sandbox",//this.props.chart_exchange,
              toggleBot:false,
        });


        // setInterval(() => {
        //
        //
        //
        //
        //   //Get current bots
        //   let currentBots =[];
        //   fetchCurrentBots(currentBots);
        //
        //   setTimeout(() => {
        //
        //   // console.log("\n\nMATCH BOT:", this.props.chart_exchange.name.toString());
        //
        //   let exchangeName = "Sandbox";//this.props.chart_exchange.name.toString();
        //
        //
        //
        //    let toggleBot_placeholder = false;
        //
        //   // console.log("Command Bot Toggle", this.state.bots_toggle);
        //    currentBots.forEach(function(bot){
        //
        //
        //      let botExchangeName = bot.exchange.name;
        //
        //      let botexchange = bot.exchange;
        //
        //      // console.log("Command exchanges",exchangeName);
        //
        //       // let exchangeName = this.state.chart_exchange;
        //       //
        //       // console.log("\n\nMATCH BOT:",botExchangeName);
        //       //   console.log("\n\nEXCHANGE BOT:",exchangeName);
        //
        //       if (botExchangeName == exchangeName){
        //
        //           // console.log("\n\nMATCH BOT:", botExchangeName);
        //           // console.log("\n\nMATCH Exchange:", exchangeName);
        //
        //            toggleBot_placeholder = true;
        //             // this.state.toggleBot = true;
        //        }
        //        else{
        //           // console.log("\n\n NO MATCH");
        //            toggleBot_placeholder = false;
        //            // this.setState({toggleBot:false});
        //             // this.state.toggleBot = false;
        //        }
        //
        //
        //    })
        //
        //         this.setState({toggleBot:toggleBot_placeholder});
        //
        //   },2000);
        //
        //
        // },2000);






  }

toggleBotFunction = (toggleBot) => {
    // console.log("\n\n\n toggle:", this.props.toggleBot)
    if (toggleBot == true && this.state.toggleBot == 'On'){
        return (
          <View style={styles.image} >
            <Image
              source={require('../assets/images/White_Eye.png')}
              resizeMode="contain"
              style={{height: 35, width: 35}}
            />
          </View>

        );
    }else if (toggleBot == true && this.state.toggleBot == 'Off'){
        return (
          <View style={styles.image} >
            <Image
              source={require('../assets/images/Black_eye.png')}
              resizeMode="contain"
              style={{height: 35, width: 35}}
            />
          </View>
        );
    }
    else{
        return null;
    }
}

// <View styles = {styles.graphContainer}>
//
//   {/*
//   - If the state variable of showpie is true
//   */}
//
//
//   {/*
//   - If state variable of lineGraph is true
//   - showLineGraph and showPie will always be different
//   */}
//   {this.state.showLineGraph && (
//     <View style = {styles.graph}>
//       <Surface width={width} height={height}>
//         <Group x={0} y={height/2}>
//           {
//             // Actual Line based on the  data of fetch history
//             <Shape
//               d={this.state.line}
//               strokeWidth={3}
//               stroke="#000"
//             />
//           }
//           {
//             //Inner Green Line
//             // TODO : if first val is > end val, turn line red instead of green representing deficit
//             <Shape
//               d={this.state.line}
//               strokeWidth={1}
//               stroke="#0f0"
//             />
//           }
//           {
//             //xAxis
//             <Shape
//               d={this.state.xAxis}
//               strokeWidth={3}
//               stroke="#000"
//             />
//           }
//           {
//             //yAxis
//             <Shape
//               d={this.state.yAxis}
//               strokeWidth={3}
//               stroke="#000"
//             />
//           }
//           {
//             //line representing minY
//             <Shape
//               d={this.state.minY}
//               strokeWidth={3}
//               stroke="#000"
//             />
//           }
//           {
//             //line representing maxY
//             <Shape
//               d={this.state.maxY}
//               strokeWidth={3}
//               stroke="#000"
//             />
//           }
//         </Group>
//       </Surface>
//     </View>
//   )}
// </View>
// {/*
// - Graphing view
// - This is where the display of the line graph or pie graph is chosen
// */}
// {/*
// - this contains the logic in adding the buttons on the bottom of the page
// - when the button is pressed the function fetchHistory is called and with that
// data a line graph is displayed
// */}

loading() {
      if (this.state.loading) {
          return <Spinner/>
      }
      return (
          // Top title of which exchange you are following
              <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} onPress={this._onExchangeSelect}>
                  <View style={{flex:.85}}>
                      <Text style={{color:'#fff', fontSize:20, paddingTop:10,paddingBottom:10,paddingLeft:20}}>Sandbox</Text>
                  </View>

                   <View style={{flex:.15,alignSelf:'center'}}>
                        {this.toggleBotFunction(this.state.toggleBot)}
                   </View>
              </TouchableOpacity>
      );
  }
  // getTitle(){
  //   if(this.state.showPie == true && this.state.showLineGraph == false){
  //     return this.props.chart_exchange.name.toString();
  //   } else {
  //     return this.state.selectedLine;
  //   }
  // }

  // showPieGraph(){
  //
  //   //updating the component to show a line graph
  //   this.setState(previousState => {
  //     return ({ balanceList: this.state.balanceList,
  //               historyList: this.state.historyList,
  //               //Line Information
  //               line:this.state.line,
  //               xAxis:this.state.xAxis,
  //               yAxis:this.state.yAxis,
  //               minY:this.state.minY,
  //               maxY:this.state.maxY,
  //               showLineGraph:false,
  //               selectedLine:this.state.selectedLine,
  //
  //               //Pie Information
  //               sectionAngles: this.state.sectionAngles,
  //               showPie: true,
  //               loading: false,
  //     });
  //   });
  //
  // }


//
//    fetchHistory = async (exchange) => {
//      console.log("FETCH HISTORY TEST", exchange);
//     let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
//     if (coinbase_exchange.has.fetchOHLCV) {
//           await sleep (coinbase_exchange.rateLimit) // milliseconds
//           this.state.historyList = [];
//           name = exchange.exchange.name.replace("-USD","");
//           historyList = await coinbase_exchange.fetchOHLCV (name + '/USD', '1d');
//           historyList.reverse();
//           let min = Infinity;
//           let max = -Infinity;
//           // let openList = [];
//           // let closeList = [];
//           // let minList = [];
//           // let maxList = [];
//           let yAxisArr = [];
//           let i;
//           for(i = 0; i <= 30; i++){
//             if(historyList[i][4] < min){
//               min = historyList[i][4];
//             }
//             if(max < historyList[i][4]){
//               max = historyList[i][4];
//             }
//             this.state.historyList.push({x:i,y:historyList[i][4]});
//             // openList.push({x:i,y:historyList[i][1]});
//             // maxList.push({x:i,y:historyList[i][2]});
//             // minList.push({x:i,y:historyList[i][3]});
//             // closeList.push({x:i,y:historyList[i][4]});
//             yAxisArr.push({x:i,y:historyList[i][4]});
//           }
//
//           yAxisArr[0] = {x:0,y:min - min/4};
//           yAxisArr[i - 1] = {x:i - 1 ,y:max + max/4};
//
//           //LINE INFORMATION DATA
//           let scaleX =  scaleTime().domain([0,30]).range([xOffset + 40 ,width - xOffset - 20]);
//           let scaleY =  scaleLinear().domain([min - min/4,max + max/4]).range([height + yOffset - 20,yOffset + 10]);
//
//           //THIS IS WHAT I HAVE TO USE DATA WITH AND FORMAT HOW THE DATA IS ORGANIZED
//           let newLine = shape.line()
//                       .x(d => scaleX(d.x))
//                       .y(d => scaleY(d.y))
//                       .curve(shape.curveLinear)(this.state.historyList);
//
//           let xAxis = shape.line()
//                       .x(d => scaleX(d.x))
//                       .y(height + yOffset - 20)
//                       .curve(shape.curveLinear)(this.state.historyList);
//
//           let yAxis = shape.line()
//                       .x(xOffset + 40)
//                       .y(d => scaleY(d.y))
//                       .curve(shape.curveLinear)(yAxisArr);
//
//           let minY = shape.line()
//                       .x(d => scaleX(d))
//                       .y(scaleY(min))
//                       .curve(shape.curveLinear)([-0.5,0.5]);
//
//           let maxY = shape.line()
//                       .x(d => scaleX(d))
//                       .y(scaleY(max))
//                       .curve(shape.curveLinear)([-0.5,0.5]);
//
//           this.setState(previousState => {
//             return ({ balanceList: this.state.balanceList,
//                       historyList: this.state.historyList,
//                       //Line Information
//                       line:newLine,
//                       xAxis:xAxis,
//                       yAxis:yAxis,
//                       minY:minY,
//                       maxY,maxY,
//                       showLineGraph:true,
//                       selectedLine:name,
//
//                       //Pie Information
//                       sectionAngles: this.state.sectionAngles,
//                       showPie: false,
//                       loading: false,
//                       });
//           });
//
//     }
// }



  render() {
    // console.log("LOOK", this.props.red_shades);
    return (
      <View style={{flex:1, borderBottomWidth:1, borderColor:'#fff', backgroundColor: Colors.darkGray}}>
          {this.loading()}
      </View>

    )
  }
}
