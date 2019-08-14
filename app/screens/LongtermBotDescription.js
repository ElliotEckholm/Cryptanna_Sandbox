//////////////UI imports//////////////
import React, { Component } from 'react';
import { Text, View, FlatList, Image  } from 'react-native';
import Styles from '../styles/BotDescription.style';
import {BasicBotClass,AdvancedBotClass} from '../scripts/Bots_Database.js';

import { SearchBar } from 'react-native-elements';
import BotTrackedExchangeItem from '../items/BotTrackedExchangeItem';
import { sandbox_exchange} from '../scripts/ccxt.js';
import {pullTrackedExchangesDocuments} from '../scripts/firebase.js';

/////////////Functionality imports//////////
import ccxt from 'ccxt';


let exchangeList = [];
// ccxt.exchanges.forEach(id => {
//   exchanges[id] = new ccxt[id]();
// });

export default class BotDescription extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    // const selectedBotString = navigation.getParam('selectedBot');

    this.state = {
      selectedBotString:navigation.getParam('selectedBot'),
      selectedBot : '',
      exchangeList : [],
      data: []
    };
    //
    // switch (this.state.selectedBotString) {
    //   case 'basicBot':
    //     this.state.selectedBot = new BasicBotClass('Coinbase','BTC/USD',true,100.0);
    //     break;
    //   case 'advancedBot':
    //     this.state.selectedBot = new AdvancedBotClass('Coinbase','BTC/USD',true,100.0);
    //     break;
    //
    //
    //
    // }
  }




  componentWillMount() {

    pulledExchangeList = [];
    pullTrackedExchangesDocuments(pulledExchangeList);

    setTimeout(() => {
      let _exchangeList = [];

      pulledExchangeList.forEach(function(exchange,id){

        let exchangeObj = {};

        let name = exchange.name.toString().toLowerCase().replace(/\s+/g, '');;
        // console.log(name);

        exchangeObj.id = id;
        exchangeObj.title = name;
        let setExchange = new ccxt[name] ();
        setExchange.apiKey = exchange.apiKey;
        setExchange.secret = exchange.secret;
        setExchange.password = exchange.passphrase;

        //make sandbox custom url
        if (exchange.name == 'gdax'){
          console.log("GDAX TEST");
          setExchange.urls.api = 'https://api-public.sandbox.pro.coinbase.com';

        }


        let img = setExchange.urls.logo;
        exchangeObj.thumbnail = img.toString();

        exchangeObj.exchange = setExchange;





        // console.log("Set Exchange object", exchangeObj.exchange);

        _exchangeList.push(exchangeObj);


      })

         // _exchangeList.push(sandbox_exchange)
        this.setState({ exchangeList:_exchangeList });




    }, 2000)

    // console.log("Pulled Exchanges ",pulledExchangeList);

}

  searchFilterFunction_Exchanges(text) {
    const newData = this.state.exchangeList.filter(item => {
      const itemData = `${item.title.toUpperCase()}
    ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ Data: newData });
  }

  _renderItem = ({ item }) => (
    <BotTrackedExchangeItem
      id={item.id}
      title={item.title}
      thumbnail={item.thumbnail}

      exchange={item.exchange}
      navigation={this.props.navigation}
      botType="Longterm"

    />
  );

  renderExchanges = () => {
    // console.log("This state Exchanges ",this.state.exchangeList);
    return (
      <FlatList
        data={this.state.exchangeList}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}

      />
    );
  };

  _keyExtractor = (item, index) => item.id.toString();
  //
  // <Text>{this.state.selectedBot.exchange}</Text>
  // <Text>{this.state.selectedBot.market}</Text>
  // <Text>{this.state.selectedBot.strategy_name}</Text>
  render() {
    return (
      <View style={Styles.container}>

        <View style={Styles.imageContainer}>
        <Image
          // style={styles.cryptannaImage}
          source={require('../assets/images/White_Eye.png')}
        />
        </View>

        <Text style={Styles.title}>Longterm Bot</Text>


        <Text style={Styles.h4}>Select Exchange:</Text>


        <FlatList
          // ListEmptyComponent={this.renderExchanges}
          data={this.state.exchangeList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

}
