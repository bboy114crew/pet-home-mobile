import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  SectionList,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { Button, Text } from "native-base";
import PetInfo from "./PetInfo";
import OptionsBar from "./OptionsBar";

class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, userData } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onLongPress={() => this.props.onLongPress(item)}
        style={{
          borderWidth: 5,
          borderColor: "#FFF",
          marginBottom: 10,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 4,
          }}
        >
          <PetInfo
            petId={
              userData._id === item.sender._id
                ? item.content.ownerPet
                : item.content.requestPet
            }
            onInfoPress={this.props.onInfoPress}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../../assets/icons/ic_heart.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <PetInfo
            petId={
              userData._id === item.sender._id
                ? item.content.requestPet
                : item.content.ownerPet
            }
            onInfoPress={this.props.onInfoPress}
          />
        </View>
        <OptionsBar
          userData={this.props.userData}
          item={item}
          onChangeStatus={this.props.onChangeStatus}
          onChatPress={this.props.onChatPress}
        />
      </TouchableOpacity>
    );
  }
}

export default RequestItem;
