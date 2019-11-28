import React, { Component } from "react";
import { View, Image, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 74;
const AVATAR_MAX_SCALE = 1;
const AVATAR_MIN_SCALE = 0.5;
const AVATAR_SIZE = 80;

const BODY_HEIGHT = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AnimatedAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { animatedValue, userData } = this.props;

    let avatarTransX = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [SCREEN_WIDTH / 2 - AVATAR_SIZE / 2, 50],
      extrapolate: "clamp",
    });

    let avatarTransY = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [
        AVATAR_SIZE - BODY_HEIGHT,
        -27 + (AVATAR_SIZE * AVATAR_MIN_SCALE) / 2 - 84,
      ],
      extrapolate: "clamp",
    });

    let avatarScale = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [AVATAR_MAX_SCALE, AVATAR_MIN_SCALE],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: avatarTransX,
            },
            {
              translateY: avatarTransY,
            },
            {
              scale: avatarScale,
            },
          ],
          position: "absolute",
          bottom: -84,
          left: 0,
        }}
      >
        <View
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: AVATAR_SIZE,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            borderWidth: 3,
            borderColor: "#FFF",
            backgroundColor: "#7DDFEA",
          }}
        >
          <Image
            source={{ uri: userData.avatar }}
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              resizeMode: "cover",
            }}
          />
        </View>
      </Animated.View>
    );
  }
}

export default AnimatedAvatar;
