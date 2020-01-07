import firebase from "react-native-firebase";
import { Alert } from "react-native";
import Command from "../screens/Command.js";
import Login from "../screens/Login.js";
import Bots from "./Bots_Database.js";

import { fetchBalance } from "../scripts/ccxt.js";
const ref = firebase.firestore().collection("users");

let fb = firebase;

class Exchange {
  constructor(name, totalBalance, track, apiKey, secret, passphrase) {
    this.name = name;
    this.totalBalance = totalBalance;
    this.track = track;
    this.apiKey = apiKey;
    this.secret = secret;
    this.passphrase = passphrase;
  }
}

class Market {
  constructor(exchange, marketName, marketBalance) {
    this.exchange = exchange;
    this.marketName = marketName;
    this.marketBalance = marketBalance;
  }
}


// let longtermBuyOrderObject = {
//     orderId:orderId,
//     orderType:orderType,
//     currentPrice:currentPrice,
//     historyMinPrice:historyMinPrice,
//     historyMaxPrice:historyMaxPrice,
//     currentPriceOfUserSpecificedAmount:currentPriceOfUserSpecificedAmount,
//     timeOfBuy:timeOfBuy
// }
class TradeOrdersClass {
  cconstructor(orderId, orderType, currentPrice, historyMinPrice, historyMaxPrice, currentPriceOfUserSpecificedAmount, timeOfBuy) {
    this.orderId = orderId;
    this.orderType = orderType;
    this.currentPrice = currentPrice;
    this.historyMinPrice = historyMinPrice;
    this.historyMaxPrice = historyMaxPrice;
    this.currentPriceOfUserSpecificedAmount = currentPriceOfUserSpecificedAmount;
    this.timeOfBuy = timeOfBuy;

  }
}

export async function signOutUser() {
  await firebase
    .auth()
    .signOut()
    .then(user => {
      console.log("Signed out");
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch(error => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}
//
// export async function signOutUser() {
//   await firebase
//     .auth()
//     .signOut()
//     .then(user => {
//       console.log('Signed out');
//       // If you need to do anything with the user, do it here
//       // The user will be logged in automatically by the
//       // `onAuthStateChanged` listener we set up in App.js earlier
//     })
//     .catch(error => {
//       const { code, message } = error;
//       // For details of error codes, see the docs
//       // The message contains the default Firebase string
//       // representation of the error
//     });
// }

//Adding a bots subcollection
export async function addBotsSubCollection(bot) {
  let currentUserID = getCurrentUserID();
  console.log("Adding bot collection to: ", getCurrentUserEmail());

  //constructor(exchange, market, strat, running, tradeAmount)
  // let Bot = new Bots(
  //   exchangeName,
  //   marketName,
  //   botName,
  //   strategy,
  //   running,
  //   tradeAmount
  // );
  let botRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("bots")
    .doc(bot.name);

  botRef.set(bot);
}

//Pulling names of all bots usser has
export async function fetchCurrentBots(currentBots) {
  let currentUserID = getCurrentUserID();

  await firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("bots")
    .get()
    .then(botDoc => {
      botDoc.forEach(doc => {
        currentBots.push(doc._data);
    });
  });
}

//pausing all users bots
// export async function pauseAllBots() {
//   let currentUserID = getCurrentUserID();
//   // console.log('Pausing bot for: ', getCurrentUserEmail());
//
//   let currentBots = [];
//
//   fetchCurrentBots(currentBots);
//
//   setTimeout(() => {
//     // console.log("Fetched Bots:",currentBots);
//
//     currentBots.forEach(function(bot) {
//       // console.log("Each bot:", bot);
//
//       bot.running = false;
//
//       let ref = firebase
//         .firestore()
//         .collection("users")
//         .doc(currentUserID)
//         .collection("bots")
//         .doc(bot.name);
//
//       ref.set(bot);
//     });
//   }, 2000);
// }

//pausing all users bots
export async function resumeAllBots() {
  let currentUserID = getCurrentUserID();
  // console.log('Resuming bot for: ', getCurrentUserEmail());

  let currentBots = [];

  await fetchCurrentBots(currentBots).then(()=>{
    currentBots.forEach(function(bot) {


      bot.running = true;

      firebase
        .firestore()
        .collection("users")
        .doc(currentUserID)
        .collection("bots")
        .doc(bot.name)
        .set(bot);
    });

  })

}

//Checking if specific bot is running or not
export async function isBotRunning(botName, isRunning) {
  let currentUserID = getCurrentUserID();
  // console.log('BOT RUNNING', botName);

  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("bots");

  ref.get().then(botDoc => {
    botDoc.forEach(doc => {
      if (doc._data.name == botName) {
        isRunning.push(doc._data.running);
      }
    });
  });
}

//Storing longtermBuyOrderObject in Bot's document
// export async function storeBotStrategyBuyOrder(bot, orderType, orderId, isRunning, currentPrice, historyMinPrice, historyMaxPrice, currentPriceOfUserSpecificedAmount, timeOfBuy) {
//     let currentUserID = getCurrentUserID();
//
//     let longtermBuyOrderObject = {
//         orderId:orderId,
//         orderType:orderType,
//         currentPrice:currentPrice,
//         historyMinPrice:historyMinPrice,
//         historyMaxPrice:historyMaxPrice,
//         currentPriceOfUserSpecificedAmount:currentPriceOfUserSpecificedAmount,
//         timeOfBuy:timeOfBuy
//     }
//
//     bot.longtermBuyOrderObject = [];
//     bot.longtermBuyOrderObject.push(longtermBuyOrderObject);
//     bot.running = isRunning
//
//
//
//
//     let ref = firebase
//       .firestore()
//       .collection("users")
//       .doc(currentUserID)
//       .collection("bots")
//       .doc(bot.name);
//
//     ref.update({
//       longtermBuyOrderObject: firebase.firestore().FieldValue.arrayUnion(longtermBuyOrderObject)
//     });
//
//     console.log("Bot buy order stored successfully!");
// }

//Fetching and then Deleting longtermBuyOrderObject in Bot's document
export async function fetchBotStrategyBuyOrder(bot, longtermBuyOrderObject) {
    let currentUserID = getCurrentUserID();


    let ref = firebase
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("bots");

    ref.get().then(botDoc => {
      botDoc.forEach(doc => {
        if (doc._data.name == bot.name) {
          longtermBuyOrderObject.push(doc._data.longtermBuyOrderObject);
        }
      });
    });


    console.log("Bot buy order Fetched successfully!");
}



//Storing longtermBuyOrderObject in Bot's document
export async function storeBotStrategyOrder(
  botName,
  orderId,
  orderType,
  orderStatus,
  currentPrice,
  historyMinPrice,
  historyMaxPrice,
  currentPriceOfUserSpecificedAmount,
  timeOfBuy

) {
  let currentUserID = getCurrentUserID();
  console.log("Adding exchange collection to: ", getCurrentUserEmail());



  let longtermOrderObject = {
          orderId:orderId,
          orderType:orderType,
          orderStatus:orderStatus,
          currentPrice:currentPrice,
          historyMinPrice:historyMinPrice,
          historyMaxPrice:historyMaxPrice,
          currentPriceOfUserSpecificedAmount:currentPriceOfUserSpecificedAmount,
          timeOfBuy:timeOfBuy
      }


  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("bots")
    .doc(botName)
    .collection("Trades")
    .doc(orderType);

  ref.set(longtermOrderObject);
}


//Storing longtermBuyOrderObject in Bot's document
export async function storeBotSandboxTradeHistory(botName,tradeHistoryArray, sandBoxBotObject) {
  let currentUserID = getCurrentUserID();
  console.log("Adding sandbox bot trade history collection to: ", getCurrentUserEmail());


  //delete pre-existing bot if there
  await firebase.firestore()
  .collection("users")
  .doc(currentUserID)
  .collection("bots")
  .doc(botName)
  .delete().then(()=>{

    //recreate the bot with new data
    firebase
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("bots")
      .doc(botName)
      .set({sandBoxBotObject});

      //Loop through trade history data
      tradeHistoryArray.forEach((tradeHistoryObject) => {
        let tradeObjectStorageName = tradeHistoryObject.type +tradeHistoryObject.count.toString()
        let ref = firebase
          .firestore()
          .collection("users")
          .doc(currentUserID)
          .collection("bots")
          .doc(botName)
          .collection("Trades")
          .doc(tradeObjectStorageName)

        ref.set(tradeHistoryObject);

      });

  })


  //Change all other sandbox bot most recent run == to false so only the latest run bot is shown in the sandbox tab
  let currentBots = [];
  await fetchCurrentBots(currentBots).then(()=>{
    currentBots.forEach(sandboxBot => {

      if (sandboxBot.sandBoxBotObject.botName == botName){
          sandboxBot.sandBoxBotObject.mostRecentRun = true;
      }else{
          sandboxBot.sandBoxBotObject.mostRecentRun = false;
      }

      let ref = firebase
        .firestore()
        .collection("users")
        .doc(currentUserID)
        .collection("bots")
        .doc(sandboxBot.sandBoxBotObject.botName);

      ref.set(sandboxBot);
    });
  })


}




//Storing longtermBuyOrderObject in Bot's document
export async function storeBotStrategySellOrder(bot, orderType, orderId, isRunning, currentPrice, historyMinPrice, historyMaxPrice, currentPriceOfUserSpecificedAmount, timeOfSell) {
    let currentUserID = getCurrentUserID();

    let longtermSellOrderObject = {
        orderId:orderId,
        orderType:orderType,
        currentPrice:currentPrice,
        historyMinPrice:historyMinPrice,
        historyMaxPrice:historyMaxPrice,
        currentPriceOfUserSpecificedAmount:currentPriceOfUserSpecificedAmount,
        timeOfSell:timeOfSell
    }

    bot.longtermSellOrderObject = [];
    bot.longtermSellOrderObject.push(longtermSellOrderObject);
    bot.running = isRunning

    let ref = firebase
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("bots")
      .doc(bot.name);

    ref.set(bot);

    console.log("Bot Sell order stored successfully!");
}

//Fetching and then Deleting longtermBuyOrderObject in Bot's document
export async function fetchBotStrategySellOrder(bot, longtermSellOrderObject) {
    let currentUserID = getCurrentUserID();


    let ref = firebase
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("bots");

    ref.get().then(botDoc => {
      botDoc.forEach(doc => {
        if (doc._data.name == bot.name) {
          longtermBuyOrderObject.push(doc._data.longtermSellOrderObject);
        }
      });
    });


    console.log("Bot Sell order Fetched successfully!");
}



//Adding an sandbox object to user
export async function addSandBoxSubCollection() {

  let currentUserID = getCurrentUserID();
  console.log("Adding sandbox collection to: ", getCurrentUserEmail());

  let sandboxObject = {
    starting_usd_balance : 1000000,
    current_usd_balance : 1000000,
    margin : 0.0,
    current_btc_balance : 0.0,
  }

  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("sandbox")
    .doc("sandbox_coinbase");

  ref.set(sandboxObject);
}

//Adding an exchange subcollection
export async function writeSandBoxBalance(new_btc_balance,new_usd_balance) {
  let sandbox_object = [];
  let currentUserID = getCurrentUserID();
  console.log(
    "Writing sandbox exchange collection to: ",
    getCurrentUserEmail()
  );

  let sandboxObject = {
    starting_usd_balance : 1000000,
    current_usd_balance : new_usd_balance,
    margin : 1000000 - new_usd_balance,
    current_usd_balance :new_btc_balance,
  }

  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("sandbox")
    .doc("sandbox_coinbase");

  ref.set(sandboxObject);
}

//Adding an exchange subcollection
export async function fetchSandBoxBalance(pulledSandboxBalance) {
  let currentUserID = getCurrentUserID();
  // console.log('Fetching sandbox exchange collection to: ', getCurrentUserEmail());

  await firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("sandbox")
    .doc("sandbox_coinbase")
    .get().then(sandbox_exchange => {

      pulledSandboxBalance.push(sandbox_exchange._data);

  });
}

//Fetching Bot Data
export async function fetchSandboxBotData(fetchedSandboxBotData) {
    let currentUserID = getCurrentUserID();
    console.log("Called Fetch Sandbox Bot Field Data")

    //Change all other sandbox bot most recent run == to false so only the latest run bot is shown in the sandbox tab
    let currentBots = [];
    await fetchCurrentBots(currentBots).then(()=>{
      currentBots.forEach(function(sandboxBot)  {

        if (sandboxBot.sandBoxBotObject.mostRecentRun == true){

          fetchedSandboxBotData.push(sandboxBot.sandBoxBotObject);

        }

      });
    })

}

//Fetching Bot Trade History
export async function fetchSandboxBotTradeHistory(fetchedSandboxBotTradeHistory) {
    let currentUserID = getCurrentUserID();

      console.log("\n\nFetching Sandbox Trade History")



      let currentBots = [];
      await fetchCurrentBots(currentBots).then(()=>{

        currentBots.forEach(function(sandboxBot)  {

          if (sandboxBot.sandBoxBotObject.mostRecentRun == true){


            firebase
              .firestore()
              .collection("users")
              .doc(currentUserID)
              .collection("bots")
              .doc(sandboxBot.sandBoxBotObject.botName)
              .collection("Trades")
              .get().then(fetchedBotTradeHistory => {

                fetchedBotTradeHistory.forEach(function(tradeHistoryObject) {
                  fetchedSandboxBotTradeHistory.push(tradeHistoryObject._data);

                });
              });
          }

        });

      })






}

//Adding an exchange subcollection
export async function addExchangeSubCollection(
  exchangeName,
  balance,
  track,
  api_key,
  api_secret,
  api_passphrase
) {
  let currentUserID = getCurrentUserID();
  console.log("Adding exchange collection to: ", getCurrentUserEmail());

  let exchange = new Exchange(
    exchangeName,
    balance,
    track,
    api_key,
    api_secret,
    api_passphrase
  );

  // addMarketSubCollection(exchangeName);

  // addMarketSubCollection(exchangeName,marketName,market)
  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("exchanges")
    .doc(exchangeName);

  ref.set(exchange);
}

//Adding an exchange subcollection
export async function pullTrackedExchangesDocuments(pulledExchangeList) {
  let currentUserID = getCurrentUserID();
  // console.log('Pull exchange documents');

  let docList = [];

  // let exchange = new Exchange(10, true, 'none', 'no_apis');
  await firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("exchanges")
    .get().then(exchanges => {
    exchanges.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc);
      if (doc._data.track == true) {
        // console.log(doc._data);

        pulledExchangeList.push(doc._data);
      }
    });
  });
}

export async function pullTrackedMarketDocuments(
  exchangeName,
  pulledMarketsList
) {
  let currentUserID = getCurrentUserID();
  await firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("exchanges")
    .doc(exchangeName)
    .collection("markets")
    .get().then(markets => {
    markets.forEach(function(doc) {
      pulledMarketsList.push(doc._data);
    });
  });
}

export async function addMarketSubCollection(exchange, balanceList) {
  let currentUserID = getCurrentUserID();
  console.log("Adding market collection to: ", getCurrentUserEmail());
  console.log("Market Sub collection balance", balanceList);

  balanceList.map(balance => {
    let market = new Market(exchange, balance.name, balance.holdings);

    console.log("Markets In Function", market);

    let ref = firebase
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("exchanges")
      .doc(exchange)
      .collection("markets")
      .doc(balance.name);

    ref.set(market);
  });
}

export function createNewUserObject() {
  let currentUserID = getCurrentUserID();
  console.log("Creating User Object for user:");
  console.log(currentUserID);

  addSandBoxSubCollection();

  let name = getCurrentUserID();
  let email = getCurrentUserEmail();


  firebase
    .firestore()
    .collection("users")
    .doc(email)
    .set({
      firstTimeUser: true,
      accountInfo: {
        name: name,
        email: email
      }
    });
}

//============= Firebase Signed-in User Getters ======================

//retrieve current user logged in
export function getCurrentUserID() {
  return firebase.auth().currentUser.email;
}

export function getCurrentUserEmail() {
  return firebase.auth().currentUser.email;
}

export function getCurrentUserDisplayName() {
  return firebase.auth().currentUser;
}

export function getCurrentUserPhoto() {
  return firebase.auth().currentUser.photoURL;
}

export function getCurrentUserPhoneNumber() {
  return firebase.auth().currentUser.phoneNumber;
}

export function getCurrentUserPassword() {
  return firebase.auth().currentUser.password;
}

export function getCurrentUserName() {
  return firebase.auth().currentUser.name;
}

export function getCurrentUser() {
  let docRef = firebase
    .firestore()
    .collection("users")
    .doc(getCurrentUserID());

  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(error => {
      console.log("Error getting document:", error);
    });
}
//=======================================================================

//retrieve user object with all fields contained inside
export async function getUserData() {
  let userID = getCurrentUserID();

  let docRef = firebase
    .firestore()
    .collection("users")
    .doc(userID);

  await docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}

export async function getUserExchanges() {
  let userID = getCurrentUserID();

  let docRef = firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("exchanges");
  await docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        printf("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
}
//login user
export async function onLogin(email, password) {
  await firebase
    .auth()
    .signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then(user => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
      console.log("LOGGING IN");
    })
    .catch(error => {
      const { code, message } = error;
      console.log(message);

      // Works on both iOS and Android
      Alert.alert(
        message,
        "Please Try Again",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}

//sign up new user and create a new user object
export async function createEmailAccount(email, password) {
  console.log("New account!");
  await firebase
    .auth()
    .createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(res => {
      console.log("Account creation successful!");
      console.log(res);

      createNewUserObject();
    })
    .catch(error => {
      const { code, message } = error;
      console.log(message);

      // Works on both iOS and Android
      Alert.alert(
        message,
        "Please Try Again",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}
