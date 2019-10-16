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

class Sandbox {
  constructor(usd_balance) {
    this.balance = [
      { holdings: usd_balance, name: "USD" },
      { holdings: 0.0, name: "BTC" },
      { holdings: 0.0, name: "LTC" },
      { holdings: 0.0, name: "ETH" }
    ];
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

  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("bots");

  ref.get().then(botDoc => {
    botDoc.forEach(doc => {
      currentBots.push(doc._data);
    });
  });
}

//pausing all users bots
export async function pauseAllBots() {
  let currentUserID = getCurrentUserID();
  // console.log('Pausing bot for: ', getCurrentUserEmail());

  let currentBots = [];

  fetchCurrentBots(currentBots);

  setTimeout(() => {
    // console.log("Fetched Bots:",currentBots);

    currentBots.forEach(function(bot) {
      // console.log("Each bot:", bot);

      bot.running = false;

      let ref = firebase
        .firestore()
        .collection("users")
        .doc(currentUserID)
        .collection("bots")
        .doc(bot.name);

      ref.set(bot);
    });
  }, 2000);
}

//pausing all users bots
export async function resumeAllBots() {
  let currentUserID = getCurrentUserID();
  // console.log('Resuming bot for: ', getCurrentUserEmail());

  let currentBots = [];

  fetchCurrentBots(currentBots);

  setTimeout(() => {
    // console.log("Fetched Bots:",currentBots);

    currentBots.forEach(function(bot) {
      // console.log("Each bot:", bot);

      bot.running = true;

      let ref = firebase
        .firestore()
        .collection("users")
        .doc(currentUserID)
        .collection("bots")
        .doc(bot.name);

      ref.set(bot);
    });
  }, 2000);
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
export async function storeBotStrategyBuyOrder(bot, orderId, isRunning, currentPrice, historyMinPrice, historyMaxPrice, currentPriceOfUserSpecificedAmount) {
    let currentUserID = getCurrentUserID();

    let longtermBuyOrderObject = {
        orderId:orderId,
        currentPrice:currentPrice,
        historyMinPrice:historyMinPrice,
        historyMaxPrice:historyMaxPrice,
        currentPriceOfUserSpecificedAmount:currentPriceOfUserSpecificedAmount
    }

    bot.longtermBuyOrderObject = [];
    bot.longtermBuyOrderObject.push(longtermBuyOrderObject);
    bot.running = isRunning

    let ref = firebase
      .firestore()
      .collection("users")
      .doc(currentUserID)
      .collection("bots")
      .doc(bot.name);

    ref.set(bot);

    console.log("Bot buy order stored successfully!");
}

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



//Adding an exchange subcollection
export async function addSandBoxSubCollection(starting_usd_balance) {
  let currentUserID = getCurrentUserID();
  console.log("Adding sandbox collection to: ", getCurrentUserEmail());

  let sandbox = new Sandbox(starting_usd_balance);
  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("sandbox")
    .doc("sandbox_coinbase");

  ref.set(sandbox);
}

//Adding an exchange subcollection
export async function writeSandBoxBalance(
  currency,
  new_btc_balance,
  new_usd_balance
) {
  let sandbox_object = [];

  console.log(
    "Writing sandbox exchange collection to: ",
    getCurrentUserEmail()
  );

  let ref = firebase
    .firestore()
    .collection("users")
    .doc(getCurrentUserID())
    .collection("sandbox");

  ref.get().then(sandbox_exchanges => {
    sandbox_exchanges.forEach(doc => {
      const balances = doc._data.balance;
      balances.forEach(balance => {
        sandbox_object.push(balance);
      });
    });

    for (let i = 0; i < sandbox_object.length; i++) {
      if (sandbox_object[i].name === "USD") {
        sandbox_object[i].holdings = new_usd_balance;
      }

      if (sandbox_object[i].name === "BTC") {
        sandbox_object[i].holdings = new_btc_balance;
      }
    }

    // TODO: automate the process of selecting the coins in the DB

    ref.doc("sandbox_coinbase").set({
      balance: sandbox_object
    });
  });
}

//Adding an exchange subcollection
export async function fetchSandBoxBalance(pulledSandboxBalance) {
  let currentUserID = getCurrentUserID();
  // console.log('Fetching sandbox exchange collection to: ', getCurrentUserEmail());

  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("sandbox");

  ref.get().then(sandbox_exchanges => {
    sandbox_exchanges.forEach(doc => {
      // let balanceObj = {};
      // balanceObj.holdings = doc._data.balance.holdings;
      // balanceObj.name = doc._data.balance.name;

      // console.log('DEBUGG');
      // console.log(doc._data.balance);

      pulledSandboxBalance.push(doc._data.balance);
    });
  });
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
  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("exchanges");

  ref.get().then(exchanges => {
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
  let ref = firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("exchanges")
    .doc(exchangeName)
    .collection("markets");

  ref.get().then(markets => {
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

  addSandBoxSubCollection(1000000);

  let name = getCurrentUserID();
  let email = getCurrentUserEmail();

  firebase
    .firestore()
    .collection("users")
    .doc(currentUserID)
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
  return firebase.auth().currentUser.uid;
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
