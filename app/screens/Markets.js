import React, { Component } from 'react';
import {
  StatusBar,
  FlatList,
  Text,
  View,
  Alert
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Exchanges from './Exchanges.js';
import ExchangeItem from '../items/ExchangeItem.js';
import MarketItem from '../items/MarketItem.js';
import AddExchangeButton from '../buttons/AddExchangeButton.js';
import ccxt from 'ccxt';
import Styles from "../styles/Markets.style";
import Spinner from './../config/Spinner';

import {
  fetchMarkets_Item_Info,
  fetchTicker,
  fetchBalance
} from '../scripts/ccxt.js';

let markets = [];

export default class Markets extends Component {
  state = {
    markets,
    data: [],
    prices: [],
    loading: true
  };

  constructor(props) {
    super(props);
    // this.state = {
    //
    // };

    // let refresh = setInterval(() => {
    //   const { params } = this.props.navigation.state;
    //
    //   let title = ccxt.exchanges[params.id].toString();
    //   let exchange = new ccxt[title] ();
    //
    //
    //   tempData = markets;
    //   let newData = [];
    //
    //   fetchMarkets(exchange,markets)
    //   markets = newData;
    //
    //   // console.log(new_markets);
    //   this.setState(previousState => {
    //
    //     return { markets: tempData};
    //   });
    //
    // }
    // ,2000);
  }

  loading() {
      if (this.state.loading) {
          return <Spinner />
      }

      return (this.renderMarkets());
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    let markets = this.state.markets.slice();
    let exchange_id = params.exchange_id;
    let exchangeTitle = ccxt.exchanges[exchange_id].toString();
    let exchange = new ccxt[exchangeTitle] ();

    fetchMarkets_Item_Info(exchange,markets,exchangeTitle,exchange_id)
    .then(() => {
        this.setState({ loading: false, markets });
    })
    .catch(err => {

    });
  }

  _renderItem = ({item}) => (
    <MarketItem
      id={item.id}
      title={item.title}
      author={item.author}
      exchange={item.exchange}
      exchange_id={item.exchange_id}
      navigation={this.props.navigation}
    />
  );

  searchFilterFunction_Markets(text){

    const newData = this.state.markets.filter(item => {
      const itemData = `${item.title.toUpperCase()}
    ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ Data: newData });
  };

  renderMarkets = () => {
    return (
        <FlatList
          extraData={this.state}
          data={this.state.markets}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
     );
  };

  render() {
    const { params } = this.props.navigation.state;
    const { navigation } = this.props;

    <MarketItem navigation={navigation} />

    let exchangeTitle = params.exchangeTitle.toString().replace("_","").toUpperCase();
    // let marketTitle = params.marketTitle.toString();

    return (
      <View style={Styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <SearchBar
          showLoading
          clearIcon={{ color: 'red' }}
          searchIcon={false}
          onChangeText={text => this.searchFilterFunction_Markets(text)}
          autoCorrect={false}
          placeholder="Search Markets"
        />

        <View >
          <Text style={Styles.title}>{exchangeTitle}</Text>

        </View >

        <AddExchangeButton
          navigation={this.props.navigation}
          exchange_id = {params.exchange_id}
        />





        {this.loading()}

      </View>
    );
  }
}
