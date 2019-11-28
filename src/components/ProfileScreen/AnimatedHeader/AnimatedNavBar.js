import React, { Component } from "react";
import { View, Animated, Dimensions } from "react-native";

import AnimatedBackground from "./AnimatedBackground";
import AnimatedAvatar from "./AnimatedAvatar";
import AnimatedName from "./AnimatedName";
import { Button, Icon } from "native-base";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 74;
const BODY_HEIGHT = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AnimatedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { animatedValue } = this.props;
    // padding top 30, height = 54
    let tranY = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [-10, HEADER_MAX_HEIGHT - 30 - 54],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          height: 54,
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 2,
          transform: [
            {
              translateY: tranY,
            },
          ],
        }}
      >
        <View onLayout={event => console.log(event.nativeEvent.layout)}>
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon name="md-menu" style={{ color: "#EC466A" }} />
          </Button>
        </View>
        <View style={{ flex: 1 }} />
      </Animated.View>
    );
  }
}

export default AnimatedNavBar;
