import React, { Component } from "react";
import { Dimensions, Platform, Image, View } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  HeaderBackButton
} from "react-navigation";
import { Icon } from "react-native-elements";
import { logo } from "./assets/images/images.js";
import Command from "./screens/Command.js";
import Onboarding from "./screens/Onboarding.js";
import Bots from "./screens/Bots.js";
import MediumBotDescription from "./screens/MediumBotDescription.js";
import AggressiveBotDescription from "./screens/AggressiveBotDescription.js";
import LongtermBotDescription from "./screens/LongtermBotDescription.js";
import Exchanges from "./screens/Exchanges.js";
import Profile from "./screens/Profile.js";
import Markets from "./screens/Markets.js";
import SelectMarket from "./screens/SelectMarket.js";
import Login from "./screens/Login.js";
import LoadingScreen from "./screens/LoadingScreen.js";
import Signup from "./screens/Signup.js";
import Settings from "./screens/Settings.js";
import TrackExchange from "./screens/TrackExchange.js";
import Sandbox from "./screens/Sandbox.js";
import TrackedMarkets from "./screens/TrackedMarkets.js";
import MediumBotSelectMarket from "./screens/MediumBotSelectMarket.js";
import LongtermBotSelectMarket from "./screens/LongtermBotSelectMarket.js";
import AggressiveBotSelectMarket from "./screens/AggressiveBotSelectMarket.js";
import ExchangeDescription from "./screens/ExchangeDescription.js";
import MarketDescription from "./screens/MarketDescription.js";
import Welcome from "./screens/Welcome.js";
import TermsConds from "./screens/TermsConds.js";

import { Colors } from "./styles/global/colors";
import styles from "./styles/tabBar.style.js";

let screen = Dimensions.get("window");

export const LoginStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: (
        <HeaderBackButton
          style={{ backgroundColor: "black" }}
          onPress={() => navigation.goBack(null)}
        />
      ),
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  TermsConds: {
    screen: TermsConds,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  }
});

export const ExchangeStack = createStackNavigator({
  Exchanges: {
    screen: Exchanges,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Markets: {
    screen: Markets,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  },
  SelectMarket: {
    screen: SelectMarket,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  }
});

export const CommandStack = createStackNavigator({
  Command: {
    screen: Command,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarVisible: true
    })
  },
  Onboarding: {
    screen: Onboarding,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarVisible: true
    })
  },
  ExchangeDescription: {
    screen: ExchangeDescription,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  MarketDescription: {
    screen: MarketDescription,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: (
        <HeaderBackButton
          style={{ backgroundColor: "black" }}
          onPress={() => navigation.goBack(null)}
        />
      ),
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },

  Exchanges: {
    screen: Exchanges,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  Markets: {
    screen: Markets,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  },
  SelectMarket: {
    screen: SelectMarket,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  },
  TrackExchange: {
    screen: TrackExchange,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  }
});

export const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  TermsConds: {
    screen: TermsConds,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.lightBlue
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  }
});

export const BotsStack = createStackNavigator({
  Bots: {
    screen: Bots,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarVisible: true
    })
  },
  MediumBotDescription: {
    screen: MediumBotDescription,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: true
    })
  },
  AggressiveBotDescription: {
    screen: AggressiveBotDescription,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: true
    })
  },
  LongtermBotDescription: {
    screen: LongtermBotDescription,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: true
    })
  },
  TrackedMarkets: {
    screen: TrackedMarkets,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  },
  MediumBotSelectMarket: {
    screen: MediumBotSelectMarket,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  },
  AggressiveBotSelectMarket: {
    screen: AggressiveBotSelectMarket,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  },
  LongtermBotSelectMarket: {
    screen: LongtermBotSelectMarket,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.darkGrayBackground,
        borderBottomWidth: 0
      },
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      tabBarVisible: true,
      gesturesEnabled: false
    })
  }
});

export const SandboxStack = createStackNavigator({
  Sandbox: {
    screen: Sandbox,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

export const Tabs = createBottomTabNavigator(
  {
    Command: {
      screen: CommandStack,
      navigationOptions: {
        tabBarLabel: "Command",
        tabBarIcon: ({ tintColor }) => (
          // <Icon name="network" type="entypo" size={28} color={tintColor} />
          <Icon name="home" type="entypo" size={28} color={tintColor} />
        )
      }
    },
    Bots: {
      screen: BotsStack,
      navigationOptions: {
        tabBarLabel: "Bots",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="eye" type="entypo" size={28} color={tintColor} />
        )
      }
    },

    Sandbox: {
      screen: SandboxStack,
      navigationOptions: {
        tabBarLabel: "Sandbox",
        tabBarIcon: ({ tintColor }) => (
          // <Icon name="palette" type="entypo" size={28} color={tintColor} />
          <Icon name="palette" type="entypo" size={28} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          // <View style={[styles.profileTab]}>
          <Icon name="user" type="entypo" size={28} color={tintColor} />
        )
        // </View>
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: "#F8F8F8", // active icon color
      inactiveTintColor: "#586589", // inactive icon color
      style: {
        backgroundColor: Colors.darkGrayBackground // TabBar background
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      Tabs: {
        screen: Tabs
      },
      LoginStack: {
        screen: LoginStack
      }
    },

    {
      initialRouteName: signedIn ? "Tabs" : "LoginStack"
    }
  );
};
