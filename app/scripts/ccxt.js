import ccxt from 'ccxt';
import {Alert} from 'react-native';
import firebase from 'react-native-firebase';

import {pauseAllBots} from './firebase.js'

let sandbox_id = 'gdax';
let sandbox_symbols = ['BTC/USD'];
export let sandbox_exchange = new ccxt[sandbox_id] ();

let binance_id = 'binance';
export let binance_exchange = new ccxt[binance_id] ();

let coinbase_id = 'coinbasepro';
export let coinbase_exchange = new ccxt[coinbase_id] ();


//Coinbase pro sandbox practice key
sandbox_exchange.apiKey = '1a2a436861a6b81bb76ed5daae68f983';
sandbox_exchange.secret = 'BjdUP19NKl6yerrN4nVT5yirgsYyb+uxM6dP3YDLYGwAr68h/fjdA3ZiEzR1dRZg+CZfyALF1I2nc6iV7hCYuQ==';
sandbox_exchange.password = '1259domab5fh'
sandbox_exchange.symbol = sandbox_symbols;
sandbox_exchange.sandboxName = 'sandbox';

sandbox_exchange.urls.api = 'https://api-public.sandbox.pro.coinbase.com';
sandbox_exchange.title = 'gdax';

// Elliot REAL Binance API key
// binance_exchange.apiKey = 'ecSzwA5Jb7WWmKBAIyKsFujVeeIGYXWTE0dmMTg3x0NtsEhQtv8HpSoQW4IfqlA6';
// binance_exchange.secret = 'iluWwsG6IgyX860onmoSmWoBpqXxAaji12U7EkL4V74CMy8vUJ7YaPXK2tajXH9S';

//Elliot REAL Coinbase Pro API key
coinbase_exchange.apiKey = 'c03d61ae02582da100103b931caa6007';
coinbase_exchange.secret = 'BCFcR+cyRZjsO6mZbUTLUIV3hA8OamKOpnAjFGRmUGUwcAH5zp71R+Qt6UtpywdtJhDSSrEU9yzmPMeu3AoMJg==';
coinbase_exchange.password = '2sj111hleg3'

// Takes in an array of symbols, amount and price
export let limitBuyOrder = async (exchange, orderId, symbol, amount, price) => {
    // List of methods https://github.com/ccxt/ccxt/wiki/Manual
    await exchange.createLimitBuyOrder(symbol, amount, price)
    .then(res => {
        console.log(`Limit buy order ${res.id} is successful!`);
        orderId.push(res.id);
    })
    .catch(error => {
      const { code, message } = error;
      console.log(message);

      // Works on both iOS and Android
      Alert.alert(
        message,
        'Please Try Again',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
      {pauseAllBots()};
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}

// Creates a limit sell order
export let limitSellOrder = async (exchange, symbol, amount, price) => {
    // List of methods https://github.com/ccxt/ccxt/wiki/Manual
    await exchange.createLimitSellOrder(symbol, amount, price)
    .then(res => {
        console.log(`Limit sell order ${res.id} is successful!`);
    })
    .catch(error => {
      const { code, message } = error;
      console.log(message);

      // Works on both iOS and Android
      Alert.alert(
        message,
        'Please Try Again',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    });
}

//fetches historical data for coin price from coinbase
export let fetchHistory = async () => {
      let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
      if (coinbase_exchange.has.fetchOHLCV) {

            await sleep (coinbase_exchange.rateLimit) // milliseconds
            console.log (await coinbase_exchange.fetchOHLCV (  'LTC/USD', '1d')) // one minute

      }
}

// Cancels an order given the order ID
export let cancelOrder = async (exchange, id) => {
    exchange.cancelOrder(id);
    console.log(`Order ${id} successfully canceled!`);
}

//View market of of given exchange and market
export async function fetchTicker(exchange,market,marketInfo){
    // console.log("Fetching Ticker");
    // console.log(JSON.stringify(exchange));
    // console.log(market);
    // const  data = { info: "" };
    await exchange.fetchTicker (market)
    .then( res => {
        // marketInfo.push(res);
        Object.assign(marketInfo, marketInfo, res)
    //    console.log("ccxt marketInfo: ", marketInfo );
    //    console.log("ccxt res: ", res );
        // return data.info;
    })
    .catch( err => {
        console.log(err);
    })
}

//View market of of given exchange and market
export async function fetchOrder(exchange,order,orderArray){
    // console.log("Fetching Ticker");
    // console.log(JSON.stringify(exchange));
    // console.log(market);
    // const  data = { info: "" };
    await exchange.fetchOrder (order)
    .then(res => {
        // console.log ("\n\nFetched Order Status: "+order.status)
        orderArray.push(res);
    })

    .catch( err => {
        console.log(err);
    })
}

// View your balance given the keys are provided.
export async function fetchBalance(exchange, _balanceList){
  //Use this if you want to change balance to different base other than USD
  // let marketTitleList = [];
  // await exchange.loadMarkets()
  // .then( res => {
  //
  //     let id = 0;
  //     let marketList = Object.values(res);
  //
  //     marketList.forEach(e => {
  //         title = JSON.stringify(e.symbol);//.replace(/[/]/g, "-");
  //           marketTitleList.push(title);
  //       })
  //     });
  //
  //   console.log("List of markets!",marketTitleList);
    let binanceArray = [];
    let binanceObj = {};

    await exchange.fetchBalance()
    .then(res => {

        if (exchange.name.toLowerCase() === 'binance'){

          binanceArray = res["info"].balances.filter(coin => coin.free > 0);

          console.log("binanceArray: ", binanceArray);

          //create an array of objects containing the name and amount
          binanceArray.map(e => {
            let balanceObj = {};
            balanceObj.holdings = parseFloat( Number(e.free).toFixed(2));
            balanceObj.name = e.asset + "-USDT";
            console.log("FULL MARKET NAME",  balanceObj.name);

            _balanceList.push(balanceObj);
            // {currency: e.currency, available: e.available}

          });

            // console.log("Calling !Inside fetchbalance",_balanceList);

        } else if (exchange.name.toLowerCase() === 'coinbase pro' || exchange.name.toLowerCase() === 'gdax'){

            res.info.filter(e => e.balance > 0)

            // console.log(exchange, res);

            //create an array of objects containing the name and amount
            .map(e => {
              let balanceObj = {};
              balanceObj.holdings =parseFloat( Number(e.available).toFixed(2));
              balanceObj.name = e.currency + "-USD";
              // console.log("FULL MARKET NAME",  balanceObj.name);

              _balanceList.push(balanceObj);
              // {currency: e.currency, available: e.available}
            })
              // console.log("Calling !Inside fetchbalance",_balanceList);
          }
    })
    .catch(err => console.log(err));
}

// //fetches historical data for coin price from coinbase
// export let fetchHistory = async (historyList,name) => {
//     let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
//     if (coinbase_exchange.has.fetchOHLCV) {
//         console.log((name,historyList));
//        // for (symbol in sandbox_exchange.markets) {
//           await sleep (coinbase_exchange.rateLimit) // milliseconds

//         //   console.log(await coinbase_exchange.fetchOHLCV (  'LTC/USD', '1d')) // one minute
//         // }
//           historyList = await coinbase_exchange.fetchOHLCV (  'LTC/USD', '1d');
//           return historyList;
//     }
// }



// View markets of given exchange
export async function fetchMarkets_Item_Info(_exchange,_markets,exchangeTitle,exchange_id){
    // console.log("Fetching Markets");
    await _exchange.loadMarkets()
    .then( res => {
        let id = 0;
        let marketList = Object.values(res);

        marketList.forEach(e => {
            let marketObj = {};
            marketObj.id = id;
            marketObj.exchange = exchangeTitle;
            marketObj.exchange_id = exchange_id;
            marketObj.title = JSON.stringify(e.symbol).replace(/["']/g, "");//.replace(/[/]/g, "-");
            let market = JSON.stringify(e.symbol).replace(/["']/g, "");
            let marketInfo = [];

            fetchTicker(_exchange,market,marketInfo).then(function() {
                    let left_amount = "1 ";
                    let left_currency = (marketObj.title.substring(0, marketObj.title.indexOf("/")));
                    let eq = "  =  ";
                    let right_amount = (JSON.stringify(Number(marketInfo.bid).toFixed(2)).replace(/["']/g, ""));
                    let space = " ";
                    let right_currency = space.concat(marketObj.title.substring(marketObj.title.indexOf("/")+1,marketObj.title.length));

                    //uncomment to change
                    marketObj.author = left_amount+left_currency+eq+right_amount+right_currency;


                    // console.log(right_currency);
            });

            _markets.push(marketObj);

            id += 1;
          })
    })
    .catch( err => {
        console.log(err);
    })
}
