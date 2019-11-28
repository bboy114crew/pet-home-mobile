import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";

class Mark extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mark}>
          <Icon name="ios-checkmark" style={styles.icon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "#EC466A",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mark: {
    width: 25,
    height: 25,
    backgroundColor: "#EC466A",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 5,
  },
  icon: {
    color: "#22D973",
  },
});

export default Mark;
