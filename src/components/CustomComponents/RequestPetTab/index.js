import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  SectionList,
  ActionSheetIOS,
  RefreshControl,
} from "react-native";
import CustomHeader from "../CustomHeader";
import { Button, Text } from "native-base";
import UserServices from "../../../services/UserServices";
import RequestItem from "./RequestItem";
import ChatModal from "../ChatModal";
import InfoModal from "./InfoModal";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class RequestPetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRequest: [],
      loading: false,
    };
  }

  componentDidMount() {
    this._getRequest();
  }

  _showOptions = item => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Bỏ qua", "Ẩn thông báo"],
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 1) {
          try {
            const { userData } = this.props;
            await UserServices.hideNotification(item._id, userData._id);
            this._getRequest();
          } catch (error) {
            throw error;
          }
        }
      }
    );
  };

  _getRequest = async () => {
    const { userData } = this.props;
    this._setLoading(true);
    try {
      const result = await UserServices.getNotificationsByType(
        userData._id,
        "pet"
      );
      this.setState({ listRequest: result.reverse() });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _renderItem = ({ item }) => {
    return (
      <RequestItem
        userData={this.props.userData}
        item={item}
        toast={this.props.toast}
        onLongPress={this._showOptions}
        onChangeStatus={this._getRequest}
        onChatPress={this._onChatPress}
        onInfoPress={this._onInfoPress}
      />
    );
  };

  _setLoading = loading => {
    this.setState({ loading });
  };

  _onChatPress = conversation => {
    this.chatModal.getWrappedInstance().setModalVisible(true, conversation);
  };

  _onInfoPress = petId => {
    console.log(petId);
    this.infoModal.setModalVisible(true, petId);
  };

  render() {
    const { listRequest } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#2A2E40",
        }}
      >
        <ChatModal
          ref={ref => (this.chatModal = ref)}
          userData={this.props.userData}
        />
        <InfoModal
          ref={ref => (this.infoModal = ref)}
          userData={this.props.userData}
        />
        <CustomHeader
          title="Ghép đôi"
          buttonLeft="md-menu"
          actionLeft={() => this.props.navigation.openDrawer()}
        />
        <FlatList
          data={listRequest}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._getRequest}
            />
          }
        />
      </View>
    );
  }
}

export default RequestPetTab;
