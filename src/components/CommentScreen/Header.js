import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Thumbnail, Text, Icon } from "native-base";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { postData } = this.props;
    const date = new Date(postData.createdAt);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              flex: 1,
              paddingRight: 20,
            }}
          >
            <Icon name="ios-arrow-back-outline" style={{ color: "#EC466A" }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Thumbnail small source={{ uri: postData.ownerId.avatar }} circular />
          <View
            style={{
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "500" }}>
              {postData.ownerId.appName}
            </Text>
            <Text note style={{ fontSize: 12, alignSelf: "flex-start" }}>
              {date.toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
