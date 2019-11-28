import React, { Component } from "react";
import { View, Text } from "react-native";

class StaticItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { item } = this.props

    return (
      <View
        ref={ref => (this.locItem = ref)}
        style={{
          borderRadius: 10,
          justifyContent: "center",
          padding: 10,
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
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#00cc99",
              marginRight: 4,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: "#615c70",
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 12 }}>{`${item.rating}/5 - Cách bạn 1.2Km`}</Text>
        </View>
      </View>
    );
  }
}

export default StaticItem;
