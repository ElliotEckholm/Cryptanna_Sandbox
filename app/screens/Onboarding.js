import React, { Component } from "react";
import { View, Button, Text, StyleSheet, Image } from "react-native";
import ImageResizeMode from "react-native/Libraries/Image/ImageResizeMode";
import Swiper from "react-native-swiper";

export default class Onboarding extends Component {
  goToCommand() {
    const { navigate } = this.props.navigation;
    navigate("Command");
  }

  gotItSwipe() {
    return " << Got it? Swipe. >>";
  }

  render() {
    return (
      <Swiper
        showsButtons={false}
        loop={false}
        showsPagination={false}
        ref="swiper"
      >
        <View style={styles.slide1}>
          <View style={{ flex: 0.15 }}>
            <Text style={styles.header}>Welcome</Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/images/White_Eye.png")}
              />
            </View>
          </View>
          <View style={{ flex: 0.2, paddingTop: 40 }}>
            <Text style={styles.information}>
              Enter the relevant information per exchange and click 'Add' :
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/images/onboarding1.png")}
            />
          </View>
          <View style={[styles.bottom, { flex: 0.05 }]}>
            <Text style={styles.bottomText}>{this.gotItSwipe()}</Text>
          </View>
        </View>

        <View style={styles.slide2}>
          <View style={{ flex: 0.15 }}>
            <Text style={styles.header}>Welcome</Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/images/White_Eye.png")}
              />
            </View>
          </View>
          <View style={{ flex: 0.1, paddingTop: 40 }}>
            <Text style={styles.information}>Select an exchange:</Text>
          </View>
          <View style={{ flex: 0.35 }}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/images/onboarding2.png")}
            />
          </View>
          <View style={{ flex: 0.1 }}>
            <Text style={styles.information}>Click 'Add Exchange':</Text>
          </View>
          <View style={{ flex: 0.15 }}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/images/onboarding2.1.png")}
            />
          </View>
          <View style={[styles.bottom, { flex: 0.05 }]}>
            <Text style={styles.bottomText}>{this.gotItSwipe()}</Text>
          </View>
        </View>

        <View style={styles.slide3}>
          <View style={{ flex: 0.15 }}>
            <Text style={styles.header}>Welcome</Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/images/White_Eye.png")}
              />
            </View>
          </View>
          <View style={{ flex: 0.2, paddingTop: 40 }}>
            <Text style={styles.information}>
              To add your own exchange, select the Your Exchanges '+' symbol on
              the command page:
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/images/onboarding3.png")}
            />
          </View>
          <View style={{ flex: 0.05 }}>
            <Text onPress={() => this.goToCommand()} style={styles.bottomText}>
              {this.gotItSwipe()}
            </Text>
          </View>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    backgroundColor: "#171717"
  },
  slide2: {
    flex: 1,
    backgroundColor: "#171717"
  },
  slide3: {
    flex: 1,
    backgroundColor: "#171717"
  },
  bottom: {
    justifyContent: "center"
  },
  bottomText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  header: {
    fontSize: 24,
    color: "white",
    paddingTop: 40,
    textAlign: "center",
    fontWeight: "bold"
  },
  information: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  }
});
