import React, { Component } from "react";
import { Image, Animated } from "react-native";

const HEADER_MAX_HEIGHT = 200;

class AnimatedBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userData, animatedValue } = this.props;

    let imageScaleY = animatedValue.interpolate({
      inputRange: [0 - HEADER_MAX_HEIGHT, 0, HEADER_MAX_HEIGHT],
      outputRange: [1.5, 1, 0],
      extrapolate: "clamp",
    });

    let imageScaleX = animatedValue.interpolate({
      inputRange: [0 - HEADER_MAX_HEIGHT, 0],
      outputRange: [1.5, 1],
      extrapolate: "clamp",
    });

    let imageOpacity = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [0.8, 0],
      extrapolate: "clamp",
    });

    let imageScale = [
      {
        scaleY: imageScaleY,
      },
      {
        scaleX: imageScaleX,
      },
    ];

    return (
      <Animated.View
        style={{
          transform: imageScale,
          opacity: imageOpacity,
          height: "100%",
          width: "100%",
          backgroundColor: "#FF8EBC",
        }}
      >
        <Image
          source={{ uri: userData.background }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </Animated.View>
    );
  }
}

export default AnimatedBackground;
