import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class AnimatedOptionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onChangeTab = tab => {
    this.props.onChangeTab(tab);
  };

  render() {
    const { animatedValue, tab } = this.props;

    let transY = animatedValue.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -126],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          zIndex: 5,
          height: 46,
          transform: [
            {
              translateY: transY,
            },
          ],
          borderBottomWidth: 0.5,
          borderBottomColor: "#00000030",
          backgroundColor: "#FFF",
        }}
      >
        <TouchableOpacity
          onPress={() => this._onChangeTab(0)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 0.25,
            borderRightColor: "#00000030",
            backgroundColor: "#FFF",
          }}
        >
          <Text
            style={{
              color: tab === 0 ? "#3498db" : "#00000050",
            }}
          >
            Bài viết
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._onChangeTab(1)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 0.25,
            borderLeftColor: "#00000030",
            backgroundColor: "#FFF",
          }}
        >
          <Text
            style={{
              color: tab === 1 ? "#3498db" : "#00000050",
            }}
          >
            Ảnh
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default AnimatedOptionBar;
