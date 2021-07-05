import React, { Component } from "react";
import { View, Animated } from "react-native";

import { Button, Icon } from "native-base";

const HEADER_MAX_HEIGHT = 200;

class AnimatedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { animatedValue } = this.props;
    // Padding top 30, height = 54
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
        <View>
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
