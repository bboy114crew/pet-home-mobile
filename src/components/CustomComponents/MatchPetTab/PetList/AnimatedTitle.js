import React, { Component } from "react";
import { Dimensions, Animated } from "react-native";
import { Title } from "native-base";

const SCREEN_WIDTH = Dimensions.get("window").width;

class AnimatedTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, animatedValue, item} = this.props

    const animateScale = animatedValue.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.1, 1, 0.1],
    })

    const transform = [{scale: animateScale}]

    return (
      <Animated.View
        style={{
          marginTop: 40,
          transform: transform
        }}
      >
        <Title
          style={[
            {
              color: "#EC466A",
            },
          ]}
        >
          {item.name}
        </Title>
      </Animated.View>
    );
  }
}

export default AnimatedTitle;
