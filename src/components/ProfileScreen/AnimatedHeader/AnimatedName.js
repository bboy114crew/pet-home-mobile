import React, { Component } from "react";
import { Text, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HEADER_MAX_HEIGHT = 200;
const NAME_MAX_WIDTH = SCREEN_WIDTH - 100;
const NAME_MAX_HEIGHT = 24;


class AnimatedName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSize: {
        height: NAME_MAX_HEIGHT,
        width: NAME_MAX_WIDTH,
      },
    };
  }

  render() {
    const { animatedValue, userData } = this.props;
    const { nameSize } = this.state;

    let nameTransX = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [SCREEN_WIDTH / 2 - nameSize.width / 2, 100],
      extrapolate: "clamp",
    });

    let nameTransY = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [-10, (-27 + (nameSize.height * 0.7) / 2) - 80],
      extrapolate: "clamp",
    });

    let nameScale = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          transform: [
            {
              translateX: nameTransX,
            },
            {
              translateY: nameTransY,
            },
            {
              scale: nameScale,
            },
          ],
          bottom: -80,
          left: 0,
        }}
      >
        <Text
          onLayout={event => {
            let nameSize = event.nativeEvent.layout;
            this.setState({ nameSize: nameSize });
          }}
          numberOfLines={1}
          lineBreakMode={"tail"}
          style={{
            fontWeight: "bold",
            fontSize: 24,
            position: "absolute",
            bottom: 0,
            color: "#212121",
            maxWidth: SCREEN_WIDTH / 2
          }}
        >
          {userData.appName}
        </Text>
      </Animated.View>
    );
  }
}

export default AnimatedName;
