import {
  limitBuyOrder,
  limitSellOrder,
  fetchBalance,
  fetchTicker,
  sandbox_exchange
} from "../scripts/ccxt.js";
import { isBotRunning } from "../scripts/firebase.js";
import ccxt from "ccxt";

export async function fetchHistory(exchange, market, timeFrame) {
  let min = parseFloat(Infinity);
  let max = parseFloat(-Infinity);

  //convert timeFrame given in days to UTC time
  let d = new Date();
  d.setDate(d.getDate() - (timeFrame + 1));
  let parsedUnixTime = d.getTime();
  // console.log('\n\n\n UTC time: ',parsedUnixTime);

  console.log("\n\n\n Fetching History for Market: ", market);
  console.log("FETCH HISTORY TEST", exchange.timeframes);
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  if (exchange.has.fetchOHLCV) {
    await sleep(exchange.rateLimit); // milliseconds
    let historyList = [];
    historyList = await exchange.fetchOHLCV(
      market,
      "1d",
      parsedUnixTime,
      undefined,
      {}
    );
    historyList.reverse();

    console.log(historyList);
    // let openList = [];
    // let closeList = [];
    // let minList = [];
    // let maxList = [];
    // let yAxisArr = [];
    // let i;

    let dataList = [];

    for (i = 0; i <= historyList.length - 1; i++) {
      let d = new Date(historyList[i][0]);
      dataList.push("\n" + d.toLocaleDateString());

      if (historyList[i][4] < min) {
        min = parseFloat(historyList[i][4]);
      }
      if (max < historyList[i][4]) {
        max = parseFloat(historyList[i][4]);
      }
    }

    console.log("\n\n-----FETCH History Info-----\n\n");
    console.log("Data List: " + historyList);
    console.log("Data List Length: " + dataList.length);
    console.log("History Timeframe: " + timeFrame);
    console.log("History Length: " + historyList.length);
    console.log("In History Function Min Price: " + min);
    console.log("Max Price: " + max);

    let priceExtremaArray = [min, max];
    return priceExtremaArray;
  }
}

function EMACalc(mArray, mRange) {
  let k = 2 / (mRange + 1);
  // first item is just the same as the first item in the input
  emaArray = [mArray[0]];
  // for the rest of the items, they are computed with the previous one
  for (let i = 1; i < mArray.length; i++) {
    emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
}

////////////////////////////////-----BASIC--------////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

async function basic_strategy_function(bot) {
  set_interval_time = 1000; //1 seconds
  let botInterval = null;
  let windowPriceArray = [];
  let growingPriceArray = [];

  if (botInterval !== null) return;
  botInterval = setInterval(() => {
    let isRunning = [];
    isBotRunning(bot.name, isRunning);
    //console.log("\n Bot Name \n", bot.name);
    interval_price_sum = 0.0;
    numberOfPrices = 10;

    setTimeout(() => {
      if (isRunning[0] == true) {
        // console.log("BASIC-BOT-Exchange",bot.exchange);
        // console.log("BASIC-BOT-Market",bot.market);
        // console.log("BASIC-BOT-USD-Amount",bot.usd_amount);
        // console.log("BASIC-BOT-BTC-Amount",bot.btc_amount);

        // let market = bot.market;
        //
        // let exchangeTitle = bot.exchange.name;
        // let exchange = new ccxt[exchangeTitle] ();

        // let currentPrice = 0.0;

        let market = bot.market;

        let exchangeTitle = bot.exchange.name.toString().toLowerCase();
        console.log("BASIC-BOT-Exchange", exchangeTitle);
        let exchange = new ccxt[exchangeTitle]();
        let marketInfo = {};

        fetchTicker(exchange, market, marketInfo)
          .then(() => {
            let currentPrice_string =
              "Current Price of Bitcoin: $" + Number(marketInfo.bid).toFixed(2);
            let currentPrice = parseFloat(Number(marketInfo.bid).toFixed(2));

            // console.log("BOT CURRENT PRICE")
            // console.log(currentPrice)

            windowPriceArray.push(currentPrice);
            growingPriceArray.push(currentPrice);

            // interval_price_sum += currentPrice;

            if (windowPriceArray.length == numberOfPrices) {
              console.log(windowPriceArray);

              let priceArraySum = 0.0;
              let priceArrayAvg = 0.0;
              let maxPrice = 0.0;
              let minPrice = 0.0;
              let maxMinSpread = 0.0;
              let priceSpread = 0.0;

              windowPriceArray.forEach(price => {
                priceArraySum += price;
              });

              maxPrice = Math.max.apply(null, windowPriceArray);
              minPrice = Math.min.apply(null, windowPriceArray);
              maxMinSpread = maxPrice - minPrice;
              priceSpread =
                windowPriceArray[numberOfPrices - 1] - windowPriceArray[0];
              priceArrayAvg = priceArraySum / numberOfPrices;

              // console.log("BOT Average PRICE over 10 seconds")
              // console.log(priceArrayAvg)
              // console.log("BOT Max PRICE over 10 seconds")
              // console.log(maxPrice)
              // console.log("BOT Min PRICE over 10 seconds")
              // console.log(minPrice)
              // console.log("BOT Max Min Spread PRICE over 10 seconds")
              // console.log(maxMinSpread)
              // console.log("BOT Price Spread PRICE over 10 seconds")
              // console.log(priceSpread)

              //Bot enters the market here
              //buy when the price is going down
              if (priceSpread < 0 && Math.abs(priceSpread) > 10.0) {
                limitBuyOrder(
                  bot.exchange,
                  bot.market,
                  bot.btc_amount,
                  currentPrice
                );
              }
              //sell when the price is going up
              if (priceSpread > 0) {
                limitSellOrder(
                  bot.exchange,
                  bot.market,
                  bot.btc_amount,
                  currentPrice - 500
                );
              }

              //clear priceArray
              windowPriceArray = [];
            }

            //at interesection of short term and long term EMA
            //if slope_shortTerm < 0 && slope_longTerm > 0 then Sell
            //if slope_shortTerm > 0 && slope_longTerm < 0 then Buy
            shortTerm_EMA = EMACalc(growingPriceArray, 5);
            longTerm_EMA = EMACalc(growingPriceArray, 10);

            console.log("Short Term EMA");
            console.log(shortTerm_EMA[shortTerm_EMA.length - 1]);

            console.log("Long Term EMA");
            console.log(longTerm_EMA[longTerm_EMA.length - 1]);
          })
          .catch(err => {
            console.log(err);
          });

        // limitSellOrder(bot.exchange, bot.market,   bot.btc_amount,   bot.usd_amount);

        //   await bot.exchange.fetchOrderBook(bot.market)
        //   .then(res => {
        //       let bid = res.bids.length ? res.bids[0][0] : undefined
        //       let buyAsk = res.asks.length ? res.asks[0][0] : undefined
        //       let spread = (bid && buyAsk) ? buyAsk - bid : undefined
        //       console.log (exchange.id, 'market price', { bid, buyAsk, spread });
        //
        //       // limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
        //
        //       // waits 30 seconds before placing a sell
        //       setTimeout(() => {
        //           let sellAsk = res.asks.length ? res.asks[0][0] : undefined
        //           console.log(`Will sell when price reaches ${bid * 1.2}`);
        //           // limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
        //
        //       }, 30000)
        //
        //   })
        //   .catch(err => console.log(err))
        //
      } else if (isRunning[0] == false) {
        clearInterval(botInterval);
        botInterval = null;
        setTimeout(() => {
          console.log("BOT STOPPED");
        }, 1000);
      }
    }, 1000);
  }, set_interval_time);
}

////////////////////////////////-----AGGRESSIVE--------////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

async function aggressive_strategy_function(bot) {
  set_interval_time = 1000; //1 seconds
  let botInterval = null;
  let windowPriceArray = [];
  let growingPriceArray = [];

  if (botInterval !== null) return;
  botInterval = setInterval(() => {
    let isRunning = [];
    isBotRunning(bot.name, isRunning);
    //console.log("\n Bot Name \n", bot.name);
    interval_price_sum = 0.0;
    numberOfPrices = 10;

    setTimeout(() => {
      if (isRunning[0] == true) {
        // console.log("BASIC-BOT-Exchange",bot.exchange);
        // console.log("BASIC-BOT-Market",bot.market);
        // console.log("BASIC-BOT-USD-Amount",bot.usd_amount);
        // console.log("BASIC-BOT-BTC-Amount",bot.btc_amount);

        // let market = bot.market;
        //
        // let exchangeTitle = bot.exchange.name;
        // let exchange = new ccxt[exchangeTitle] ();

        // let currentPrice = 0.0;

        let market = bot.market;

        let exchangeTitle = bot.exchange.name.toString().toLowerCase();
        console.log("\n\nAGGRESSIVE-BOT-Exchange", exchangeTitle);
        let exchange = new ccxt[exchangeTitle]();
        let marketInfo = {};

        fetchTicker(exchange, market, marketInfo)
          .then(() => {
            let currentPrice_string =
              "Current Price of Bitcoin: $" + Number(marketInfo.bid).toFixed(2);
            let currentPrice = parseFloat(Number(marketInfo.bid).toFixed(2));

            // console.log("BOT CURRENT PRICE")
            // console.log(currentPrice)

            windowPriceArray.push(currentPrice);
            growingPriceArray.push(currentPrice);

            // interval_price_sum += currentPrice;

            if (windowPriceArray.length == numberOfPrices) {
              console.log(windowPriceArray);

              let priceArraySum = 0.0;
              let priceArrayAvg = 0.0;
              let maxPrice = 0.0;
              let minPrice = 0.0;
              let maxMinSpread = 0.0;
              let priceSpread = 0.0;

              windowPriceArray.forEach(price => {
                priceArraySum += price;
              });

              maxPrice = Math.max.apply(null, windowPriceArray);
              minPrice = Math.min.apply(null, windowPriceArray);
              maxMinSpread = maxPrice - minPrice;
              priceSpread =
                windowPriceArray[numberOfPrices - 1] - windowPriceArray[0];
              priceArrayAvg = priceArraySum / numberOfPrices;

              // console.log("BOT Average PRICE over 10 seconds")
              // console.log(priceArrayAvg)
              // console.log("BOT Max PRICE over 10 seconds")
              // console.log(maxPrice)
              // console.log("BOT Min PRICE over 10 seconds")
              // console.log(minPrice)
              // console.log("BOT Max Min Spread PRICE over 10 seconds")
              // console.log(maxMinSpread)
              // console.log("BOT Price Spread PRICE over 10 seconds")
              // console.log(priceSpread)

              //Bot enters the market here
              //buy when the price is going down
              if (priceSpread < 0 && Math.abs(priceSpread) > 10.0) {
                limitBuyOrder(
                  bot.exchange,
                  bot.market,
                  bot.btc_amount,
                  currentPrice
                );
              }
              //sell when the price is going up
              if (priceSpread > 0) {
                limitSellOrder(
                  bot.exchange,
                  bot.market,
                  bot.btc_amount,
                  currentPrice - 500
                );
              }

              //clear priceArray
              windowPriceArray = [];
            }

            //at interesection of short term and long term EMA
            //if slope_shortTerm < 0 && slope_longTerm > 0 then Sell
            //if slope_shortTerm > 0 && slope_longTerm < 0 then Buy
            shortTerm_EMA = EMACalc(growingPriceArray, 5);
            longTerm_EMA = EMACalc(growingPriceArray, 10);

            console.log("Short Term EMA");
            console.log(shortTerm_EMA[shortTerm_EMA.length - 1]);

            console.log("Long Term EMA");
            console.log(longTerm_EMA[longTerm_EMA.length - 1]);
          })
          .catch(err => {
            console.log(err);
          });

        // limitSellOrder(bot.exchange, bot.market,   bot.btc_amount,   bot.usd_amount);

        //   await bot.exchange.fetchOrderBook(bot.market)
        //   .then(res => {
        //       let bid = res.bids.length ? res.bids[0][0] : undefined
        //       let buyAsk = res.asks.length ? res.asks[0][0] : undefined
        //       let spread = (bid && buyAsk) ? buyAsk - bid : undefined
        //       console.log (exchange.id, 'market price', { bid, buyAsk, spread });
        //
        //       // limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
        //
        //       // waits 30 seconds before placing a sell
        //       setTimeout(() => {
        //           let sellAsk = res.asks.length ? res.asks[0][0] : undefined
        //           console.log(`Will sell when price reaches ${bid * 1.2}`);
        //           // limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
        //
        //       }, 30000)
        //
        //   })
        //   .catch(err => console.log(err))
        //
      } else if (isRunning[0] == false) {
        clearInterval(botInterval);
        botInterval = null;
        setTimeout(() => {
          console.log("BOT STOPPED");
        }, 1000);
      }
    }, 1000);
  }, set_interval_time);
}

////////////////////////////////-----Longterm--------////////////////////////////
///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

async function longterm_strategy_function(bot) {
  set_interval_time = 5000; //1 seconds
  let botInterval = null;
  let windowPriceArray = [];
  let growingPriceArray = [];

  if (botInterval !== null) return;
  botInterval = setInterval(() => {
    let isRunning = [];
    isBotRunning(bot.name, isRunning);
    //console.log("\n Bot Name \n", bot.name);
    interval_price_sum = 0.0;
    numberOfPrices = 10;

    setTimeout(() => {
      if (isRunning[0] == true) {
        //console.log("BASIC-BOT-Exchange",bot.exchange);
        // console.log("BASIC-BOT-Market",bot.market);
        // console.log("BASIC-BOT-USD-Amount",bot.usd_amount);
        // console.log("BASIC-BOT-BTC-Amount",bot.btc_amount);

        // let market = bot.market;
        //
        // let exchangeTitle = bot.exchange.name;
        // let exchange = new ccxt[exchangeTitle] ();

        // let currentPrice = 0.0;

        let market = bot.market;

        let exchangeTitle = bot.exchange.name.toString().toLowerCase();
        console.log("\n\nLongterm-BOT-Exchange", exchangeTitle);
        console.log("\n\nLongterm-BOT-Max Days", bot.maxDays);
        let exchange = new ccxt[exchangeTitle]();
        let marketInfo = {};
        //
        // //buy on X day low and high
        // let priceExtrema = [];
        // // let minPrice = 0
        // priceExtrema = fetchHistory(exchange, market, bot.maxDays).then(
        //   priceExtrema => {
        //     historyMinPrice = priceExtrema[0];
        //     historyMaxPrice = priceExtrema[1];
        //     console.log("Returned Min Price: " + historyMinPrice);
        //     console.log("Returned Max Price: " + historyMaxPrice);
        //
        //       }
        //     );
        //
        //
        //
        //     //Grab Current Price of coin
        //     fetchTicker(exchange, market, marketInfo)
        //       .then(() => {
        //         let currentPrice_string =
        //           "Current Price of Bitcoin: $" + Number(marketInfo.bid).toFixed(2);
        //         let currentPrice = parseFloat(Number(marketInfo.bid).toFixed(2));
        //
        //         let currentPriceOfUserSpecificedAmount = currentPrice * bot.btc_amount;
        //
        //         console.log("BOT CURRENT PRICE")
        //         console.log(currentPrice)
        //
        //
        //         //Check if current price is lower than X day Min
        //         //If lower then buy user specificed amount
        //         //TODO add buy to Firebase to save price
        //         if (currentPrice < historyMinPrice){
        //
        //
        //
        //             //IF at Low of Last X days, buy User Specificed of USD Wallet,
        //             //TODO: Store buy time and amount in Firebase
        //             limitBuyOrder(bot.exchange, bot.market,   bot.btc_amount,   currentPriceOfUserSpecificedAmount);
        //
        //               bot.exchange.fetchOrderBook(bot.market)
        //               .then(res => {
        //                   let bid = res.bids.length ? res.bids[0][0] : undefined
        //                   let buyAsk = res.asks.length ? res.asks[0][0] : undefined
        //                   let spread = (bid && buyAsk) ? buyAsk - bid : undefined
        //                   console.log (exchange.id, 'market price', { bid, buyAsk, spread });
        //
        //                   // limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
        //
        //                   // waits 30 seconds before placing a sell
        //                   setTimeout(() => {
        //                       let sellAsk = res.asks.length ? res.asks[0][0] : undefined
        //                       console.log(`Will sell when price reaches ${bid * 1.2}`);
        //                       // limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
        //
        //                   }, 30000)
        //
        //               })
        //               .catch(err => console.log(err))
        //
        //         }
        //         //If Price is higher than max of last X days and higher than buy order and bot has already bought then Sell
        //         // else if(currentPrice > historyMaxPrice){
        //         //   // if(currentPrice > Check Fireabase for buy order){
        //         //   limitSellOrder(bot.exchange, bot.market,   bot.btc_amount,   currentPriceOfUserSpecificedAmount);
        //         //
        //         //     bot.exchange.fetchOrderBook(bot.market)
        //         //     .then(res => {
        //         //         let bid = res.bids.length ? res.bids[0][0] : undefined
        //         //         let buyAsk = res.asks.length ? res.asks[0][0] : undefined
        //         //         let spread = (bid && buyAsk) ? buyAsk - bid : undefined
        //         //         console.log (exchange.id, 'market price', { bid, buyAsk, spread });
        //         //
        //         //         // limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
        //         //
        //         //         // waits 30 seconds before placing a sell
        //         //         setTimeout(() => {
        //         //             let sellAsk = res.asks.length ? res.asks[0][0] : undefined
        //         //             console.log(`Will sell when price reaches ${bid * 1.2}`);
        //         //             // limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
        //         //
        //         //         }, 30000)
        //         //
        //         //     })
        //         //     .catch(err => console.log(err))
        //         //   // }
        //         //
        //         // }
        //
        //       })
        //       .catch(err => {
        //         console.log(err);
        //       });
        //
        //
        //
        //
        //
        //
        //
        //   }
        // );

        // setTimeout(() => {
        //
        //   console.log("Fetching history");

        //
        //
        //
        //   console.log("Returned Price Array: ", priceExtrema)
        //   console.log("Returned Min Price: " + JSON.stringify(minPrice))
        //   console.log("Returned Max Price: " + historyMaxPrice)
        //
        // },1000);
        //
        // fetchTicker(exchange, market, marketInfo)
        //   .then(() => {
        //     let currentPrice_string =
        //       "Current Price of Bitcoin: $" + Number(marketInfo.bid).toFixed(2);
        //     let currentPrice = parseFloat(Number(marketInfo.bid).toFixed(2));
        //
        //     // console.log("BOT CURRENT PRICE")
        //     // console.log(currentPrice)
        //
        //     windowPriceArray.push(currentPrice);
        //     growingPriceArray.push(currentPrice);
        //
        //     // interval_price_sum += currentPrice;
        //
        //     if (windowPriceArray.length == numberOfPrices) {
        //       console.log(windowPriceArray);
        //
        //       let priceArraySum = 0.0;
        //       let priceArrayAvg = 0.0;
        //       let maxPrice = 0.0;
        //       let minPrice = 0.0;
        //       let maxMinSpread = 0.0;
        //       let priceSpread = 0.0;
        //
        //       windowPriceArray.forEach(price => {
        //         priceArraySum += price;
        //       });
        //
        //       maxPrice = Math.max.apply(null, windowPriceArray);
        //       minPrice = Math.min.apply(null, windowPriceArray);
        //       maxMinSpread = maxPrice - minPrice;
        //       priceSpread =
        //         windowPriceArray[numberOfPrices - 1] - windowPriceArray[0];
        //       priceArrayAvg = priceArraySum / numberOfPrices;
        //
        //       // console.log("BOT Average PRICE over 10 seconds")
        //       // console.log(priceArrayAvg)
        //       // console.log("BOT Max PRICE over 10 seconds")
        //       // console.log(maxPrice)
        //       // console.log("BOT Min PRICE over 10 seconds")
        //       // console.log(minPrice)
        //       // console.log("BOT Max Min Spread PRICE over 10 seconds")
        //       // console.log(maxMinSpread)
        //       // console.log("BOT Price Spread PRICE over 10 seconds")
        //       // console.log(priceSpread)
        //
        //       //Bot enters the market here
        //       //buy when the price is going down
        //       if (priceSpread < 0 && Math.abs(priceSpread) > 10.0) {
        //         limitBuyOrder(
        //           bot.exchange,
        //           bot.market,
        //           bot.btc_amount,
        //           currentPrice
        //         );
        //       }
        //       //sell when the price is going up
        //       if (priceSpread > 0) {
        //         limitSellOrder(
        //           bot.exchange,
        //           bot.market,
        //           bot.btc_amount,
        //           currentPrice - 500
        //         );
        //       }
        //
        //       //clear priceArray
        //       windowPriceArray = [];
        //     }
        //
        //     //at interesection of short term and long term EMA
        //     //if slope_shortTerm < 0 && slope_longTerm > 0 then Sell
        //     //if slope_shortTerm > 0 && slope_longTerm < 0 then Buy
        //     shortTerm_EMA = EMACalc(growingPriceArray, 5);
        //     longTerm_EMA = EMACalc(growingPriceArray, 10);
        //
        //     console.log("Short Term EMA");
        //     console.log(shortTerm_EMA[shortTerm_EMA.length - 1]);
        //
        //     console.log("Long Term EMA");
        //     console.log(longTerm_EMA[longTerm_EMA.length - 1]);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        // limitSellOrder(bot.exchange, bot.market,   bot.btc_amount,   bot.usd_amount);

        //   await bot.exchange.fetchOrderBook(bot.market)
        //   .then(res => {
        //       let bid = res.bids.length ? res.bids[0][0] : undefined
        //       let buyAsk = res.asks.length ? res.asks[0][0] : undefined
        //       let spread = (bid && buyAsk) ? buyAsk - bid : undefined
        //       console.log (exchange.id, 'market price', { bid, buyAsk, spread });
        //
        //       // limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
        //
        //       // waits 30 seconds before placing a sell
        //       setTimeout(() => {
        //           let sellAsk = res.asks.length ? res.asks[0][0] : undefined
        //           console.log(`Will sell when price reaches ${bid * 1.2}`);
        //           // limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
        //
        //       }, 30000)
        //
        //   })
        //   .catch(err => console.log(err))
        //
      } else if (isRunning[0] == false) {
        clearInterval(botInterval);
        botInterval = null;
        setTimeout(() => {
          console.log("BOT STOPPED");
        }, 1000);
      }
    }, 1000);
  }, set_interval_time);
}

function strategySelector(bot) {
  if (bot.strategy_name == "Basic") {
    //console.log("\n Basic Strategy Selected! \n");

    basic_strategy_function(bot);
  } else if (bot.strategy_name == "Aggressive") {
    aggressive_strategy_function(bot);
  } else if (bot.strategy_name == "Longterm") {
    longterm_strategy_function(bot);
  }
}

export function botRunner(bot) {
  //console.log("\n\n\n BOT Runner",bot.strategy_name);

  strategySelector(bot);
}

class BasicStrategy {
  constructor(exchange, market, amount, botName, btc_amount, usd_amount) {
    this.exchange = exchange;
    this.market = market.replace("-", "/");
    this.amount = amount;
    this.botName = botName;
    this.btc_amount = btc_amount;
    this.usd_amount = usd_amount;
  }
}

class LongtermStrategy {
  constructor(
    exchange,
    market,
    amount,
    botName,
    btc_amount,
    usd_amount,
    maxDays
  ) {
    this.exchange = exchange;
    this.market = market.replace("-", "/");
    this.amount = amount;
    this.botName = botName;
    this.btc_amount = btc_amount;
    this.usd_amount = usd_amount;
    this.maxDays = maxDays;
  }
}

export class BasicBotClass {
  constructor(exchange, market, running, tradeAmount, btc_amount, usd_amount) {
    let strategy_name = exchange.name + "-" + market + "-Basic Strategy";

    this.name = "Basic_Trader_" + exchange.name + "_" + market;
    this.strategy_name = "Basic";
    this.exchange = exchange;
    this.market = market;
    this.running = running;
    this.tradeAmount = tradeAmount;
    this.btc_amount = btc_amount;
    this.usd_amount = usd_amount;
    this.strategy = new BasicStrategy(
      exchange,
      market,
      tradeAmount,
      this.name,
      btc_amount,
      usd_amount
    );
  }
}

export class AggressiveBotClass {
  constructor(exchange, market, running, tradeAmount, btc_amount, usd_amount) {
    let strategy_name = exchange.name + "-" + market + "-Basic Strategy";

    this.name = "Aggressive" + "_" + exchange.name + "_" + market;
    this.strategy_name = "Aggressive";
    this.exchange = exchange;
    this.market = market;
    this.running = running;
    this.tradeAmount = tradeAmount;
    this.btc_amount = btc_amount;
    this.usd_amount = usd_amount;
    this.strategy = new BasicStrategy(
      exchange,
      market,
      tradeAmount,
      this.name,
      btc_amount,
      usd_amount
    );
  }
}

export class LongtermBotClass {
  constructor(
    exchange,
    market,
    running,
    tradeAmount,
    btc_amount,
    usd_amount,
    maxDays
  ) {
    let strategy_name = exchange.name + "-" + market + "-Basic Strategy";

    this.name = "Longterm" + "_" + exchange.name + "_" + market;
    this.strategy_name = "Longterm";
    this.exchange = exchange;
    this.market = market;
    this.running = running;
    this.tradeAmount = tradeAmount;
    this.btc_amount = btc_amount;
    this.usd_amount = usd_amount;
    this.maxDays = maxDays;
    this.strategy = new LongtermStrategy(
      exchange,
      market,
      tradeAmount,
      this.name,
      btc_amount,
      usd_amount,
      maxDays
    );
  }
}

// class AdvancedBotClass {
//     constructor(exchange, market, running, tradeAmount) {
//
//         let strategy_name = exchange + '-' + market + '-Advanced Strategy';
//
//         this.strategy_name = strategy_name;
//         this.exchange = exchange;
//         this.market = market;
//         this.running = running;
//         this.tradeAmount = tradeAmount;
//         this.strategy = new BasicStrategy(exchange,market,tradeAmount);
//
//     }
// }
//
// export const BasicBot = new BasicBotClass('Coinbase','BTC/USD',true,100.0);
//
//
//
// export const AdvancedBot = new AdvancedBotClass('Binance','LTC/USD',true,100.0);
