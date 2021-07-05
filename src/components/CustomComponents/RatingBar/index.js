import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";


const itemNumber = [1, 2, 3, 4, 5];

class RatingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
    };
  }

  _onPress = (value) => {
    this.setState({
      rating: value
    })
  };

  render() {
    const { size, space, disabled } = this.props;
    const { rating } = this.state

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        {itemNumber.map(value => {
          let color = "#615c70";
          if (value <= rating) {
            color = "#00cc99";
          }
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={disabled}
              key={value}
              onPress={() => this._onPress(value)}
              style={{
                width: size,
                height: size,
                borderRadius: size,
                backgroundColor: color,
                marginRight: space,
              }}
            />
          );
        })}
      </View>
    );
  }
}

export default RatingBar;
