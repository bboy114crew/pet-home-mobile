import React, { Component } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Icon } from "native-base";

const animateTrans = new Animated.Value(1);

const transAnimation = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

class TabBar extends Component {
  state = {
    stateStyle: styles.listState,
  };

  animateShow = () => {
    transAnimation(animateTrans, 1);
  };

  animateHide = () => {
    transAnimation(animateTrans, 0);
  };

  _onPress = index => {
    const { onTabPress } = this.props;
    let stateStyle = {};
    if (index === 1) {
      stateStyle = styles.mapState;
    } else {
      stateStyle = styles.listState;
    }
    if (onTabPress) {
      this.setState({
        stateStyle: stateStyle,
      });
      onTabPress(index);
    }
  };

  render() {
    return (
      <Animated.View style={[this.state.stateStyle, styles.animatedView]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this._onPress(0);
          }}
          style={styles.tab}
        >
          <Icon name="ios-list-box-outline" style={{color: this.props.tabIndex === 0 ? "#EC466A" : "#00000030"}} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this._onPress(1);
          }}
          style={styles.tab}
        >
          <Icon name="ios-navigate-outline" style={{color: this.props.tabIndex === 1 ? "#EC466A" : "#00000030"}} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this._onPress(2);
          }}
          style={styles.tab}
        >
          <Icon name="ios-bookmark-outline" style={styles.icon} />
        </TouchableOpacity> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  animatedView: {
    height: 50,
    flexDirection: "row",
    transform: [
      {
        translateY: animateTrans.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    
  },
  mapState: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF96",
  },
  listState: {
    backgroundColor: "#FFFFFF",
  },
});

export default TabBar;
