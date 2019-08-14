
export class BasicStrategy {
    constructor(exchange, market, btc_amount,usd_amount) {
        this.exchange = exchange;
        this.market = market;
        this.btc_amount = btc_amount;
        this.usd_amount = usd_amount;

    }

    async basic_strategy_function(exchange, market, btc_amount,usd_amount){

      console.log("BASIC-BOT-Exchange",this.exchange);
      console.log("BASIC-BOT-Market",this.market);
      console.log("BASIC-BOT-Amount",this.btc_amount);

      // await exchange.fetchOrderBook(exchange.market[0])
      // .then(res => {
      //     let bid = res.bids.length ? res.bids[0][0] : undefined
      //     let buyAsk = res.asks.length ? res.asks[0][0] : undefined
      //     let spread = (bid && buyAsk) ? buyAsk - bid : undefined
      //     console.log (exchange.id, 'market price', { bid, buyAsk, spread });
      //
      //     limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
      //
      //     // waits 30 seconds before placing a sell
      //     setTimeout(() => {
      //         let sellAsk = res.asks.length ? res.asks[0][0] : undefined
      //         console.log(`Will sell when price reaches ${bid * 1.2}`);
      //         limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
      //         fetchBalance();
      //     }, 30000)
      //
      // })
      // .catch(err => console.log(err))
    }
}

export class AdvancedStrategy {
    constructor(exchange, market, amount) {
        this.exchange = exchange;
        this.market = market;
        this.amount = amount;


    }

    async basic_strategy_function(exchange, market, amount){

      console.log("BASIC-BOT-Exchange",this.exchange);
      console.log("BASIC-BOT-Market",this.market);
      console.log("BASIC-BOT-Amount",this.amount);

      // await exchange.fetchOrderBook(exchange.market[0])
      // .then(res => {
      //     let bid = res.bids.length ? res.bids[0][0] : undefined
      //     let buyAsk = res.asks.length ? res.asks[0][0] : undefined
      //     let spread = (bid && buyAsk) ? buyAsk - bid : undefined
      //     console.log (exchange.id, 'market price', { bid, buyAsk, spread });
      //
      //     limitBuyOrder(exchange.market[0], 1, buyAsk.toFixed(2));
      //
      //     // waits 30 seconds before placing a sell
      //     setTimeout(() => {
      //         let sellAsk = res.asks.length ? res.asks[0][0] : undefined
      //         console.log(`Will sell when price reaches ${bid * 1.2}`);
      //         limitSellOrder(exchange.market[0], 1, (sellAsk * 1.2).toFixed(2));
      //         fetchBalance();
      //     }, 30000)
      //
      // })
      // .catch(err => console.log(err))
    }
}



// export const BasicStrategy = new Strategy(basic_strategy);
