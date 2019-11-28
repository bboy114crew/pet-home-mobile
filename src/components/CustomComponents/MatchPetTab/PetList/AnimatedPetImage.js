import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import ShowImage from "./ShowImage";
const SCREEN_WIDTH = Dimensions.get("window").width;

class AnimatedPetImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, animatedValue, item } = this.props;

    const animateScale = animatedValue.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              scale: animateScale,
            },
          ],
        }}
      >
        <ShowImage ref={ref => (this.showImage = ref)} />
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => this.showImage.setModalVisible(true, item.images)}
          style={{
            borderRadius: SCREEN_WIDTH / 1.5,
            width: SCREEN_WIDTH / 1.5,
            height: SCREEN_WIDTH / 1.5,
            overflow: "hidden",
            backgroundColor: "#FFF",
            borderWidth: 5,
            borderColor: "#FFF",
          }}
        >
          <Image
            source={{ uri: item.images[0].url }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default AnimatedPetImage;
