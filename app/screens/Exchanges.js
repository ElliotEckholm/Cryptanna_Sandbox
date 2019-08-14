//////////////UI imports//////////////
import React, { Component } from 'react';
import { StatusBar, FlatList, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Styles from '../styles/Exchanges.style';
import ExchangeItem from '../items/ExchangeItem';


////////////Navigation imports/////////////
import Markets from './Markets';

/////////////Functionality imports//////////
import ccxt from 'ccxt';

let exchanges = {};
ccxt.exchanges.forEach(id => {
  exchanges[id] = new ccxt[id]();
});

export default class Exchanges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchanges: [],
      data: []
    };
  }

  componentWillMount() {
    let exchanges = this.state.exchanges.slice();

    for (let i = 0; i < ccxt.exchanges.length; i++) {
      let exchange = {};

      exchange.title = ccxt.exchanges[i].toString();

      if (exchange.title === 'gdax' || exchange.title === 'coinbasepro' || exchange.title === 'binance'){
        exchange.id = i;
        //load titles from ccxt API

        //load properties from ccxt exchange objects
        let obj = new ccxt[exchange.title]();
        //load images from object
        let img = obj.urls.logo;
        exchange.thumbnail = img.toString();

        exchanges.push(exchange);

        console.log("Loaded Exchanges: ", exchange.title);
      }


    }

    this.setState({ exchanges }); //React method to update state object
  }

  searchFilterFunction_Exchanges(text) {
    const newData = this.state.exchanges.filter(item => {
      const itemData = `${item.title.toUpperCase()}
    ${item.title.toUpperCase()} ${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ Data: newData });
  }

  _renderItem = ({ item }) => (
    <ExchangeItem
      id={item.id}
      title={item.title}
      author={item.author}
      thumbnail={item.thumbnail}
      navigation={this.props.navigation}
    />
  );

  renderExchanges = () => {
    return (
      <FlatList
        data={this.state.exchanges}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  render() {


    return (
      <View style={Styles.container}>
        <StatusBar barStyle="light-content" />
        <SearchBar
          showLoading
          clearIcon={{ color: 'red' }}
          searchIcon={false}
          onChangeText={text => this.searchFilterFunction_Exchanges(text)}
          autoCorrect={false}
          placeholder="Search Exchanges"
        />

        <View>
          <Text style={Styles.text}>Exchanges</Text>
        </View>


        <FlatList
          ListEmptyComponent={this.renderExchanges}
          data={this.state.Data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
