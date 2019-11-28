import React, { Component } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Rating } from "react-native-elements";

class LocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
    this.lastTap = null;
  }

  _onPress = () => {
    this.props.onPress(this.props.item);
  };

  _onHide = () => {
    setTimeout(() => {
      this.locationItem.measureInWindow((x, y) => {
        this.modal.hideModal({
          x: x,
          y: y,
        });
      });
    }, 0);
  };

  render() {
    const { item } = this.props;

    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateX: this.state.pan.x,
              },
              {
                translateY: this.state.pan.y,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          delayPressIn={200}
          delayPressOut={200}
          activeOpacity={0.7}
          onPress={this._onPress}
          ref={ref => (this.locationItem = ref)}
          style={{
            backgroundColor: "#81ecec50",
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Rating
              type="custom"
              startingValue={item.systemRating}
              imageSize={15}
              readonly
              style={{
                borderWidth: 3,
                borderRadius: 10,
                backgroundColor: "#FFF",
                borderColor: "#FFF"
              }}
              ratingBackgroundColor="#FFF"
            />
            <Text style={{ fontSize: 12, marginLeft: 8 }}>{`${
              item.systemRating
            }/5 - Cách bạn ${item.distance}`}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default LocationItem;
