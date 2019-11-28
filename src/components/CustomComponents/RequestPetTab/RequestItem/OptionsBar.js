import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  SectionList,
  Alert,
} from "react-native";
import { Button, Text } from "native-base";
import PetServices from "../../../../services/PetServices";
import MessageServices from "../../../../services/MessageServices";

class OptionsBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _requestChangeStatus = async status => {
    if (status === "decline") {
      Alert.alert(
        "Bạn có chắc muốn từ chối lời mời này?",
        undefined,
        [
          {
            text: "Không",
            style: "cancel",
          },
          {
            text: "Có",
            onPress: () => {
              this._request(status);
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      this._request(status);
    }
  };

  _request = async status => {
    try {
      const { item, userData } = this.props;
      const notification = {
        tokens: [item.sender.expoToken],
        data: {
          message: `${userData.appName} đã ${
            status === "accept" ? "chấp nhận" : "từ chối"
          } ghép đôi với Pet của bạn`,
          content: item.content,
          sender: item.sender._id,
          receiver: item.receiver._id,
          type: "pet",
        },
      };
      await PetServices.changeStatus(item._id, status, notification);
      this.props.onChangeStatus();
    } catch (error) {
      throw error;
    }
  };

  _buttonBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            paddingRight: 50,
          }}
        >
          <Button
            small
            danger
            block
            onPress={() => this._requestChangeStatus("decline")}
          >
            <Text>Từ chối</Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 50,
          }}
        >
          <Button
            small
            success
            block
            onPress={() => this._requestChangeStatus("accept")}
          >
            <Text>Chấp nhận</Text>
          </Button>
        </View>
      </View>
    );
  };

  _statusBar = () => {
    const { userData, item } = this.props;
    const status = item.content.status;
    if (status === "pending") {
      return this._statusPending();
    }
    if (status === "accept") {
      return this._statusAccept();
    }
    if (status === "decline") {
      return this._statusDecline();
    }
  };

  _statusPending = () => {
    return (
      <View
        style={{
          paddingTop: 6,
        }}
      >
        <Text
          style={{ color: "#f1c40f", fontSize: 12 }}
        >{`Hãy đợi phản hồi từ chủ sở hữu Pet`}</Text>
        ;
      </View>
    );
  };

  _statusAccept = () => {
    const { userData, item } = this.props;
    return (
      <View
        style={{
          paddingTop: 6,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "#2ecc71", fontSize: 12 }}>
          {userData._id === item.sender._id
            ? "Lời mời đã được chấp nhận "
            : "Bạn đã chấp nhận lời mời này "}
        </Text>
        <Button
          small
          success
          onPress={async () => {
            try {
              const users = [
                {
                  user: item.sender._id,
                },
                {
                  user: item.receiver._id,
                },
              ];
              const data = await MessageServices.createConversation(users);
              this.props.onChatPress(data);
            } catch (error) {
              throw error;
            }
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#FFF", fontSize: 13 }}>
            Liên lạc ngay nào
          </Text>
        </Button>
      </View>
    );
  };

  _statusDecline = () => {
    return (
      <View
        style={{
          paddingTop: 6,
        }}
      >
        <Text
          style={{ color: "#e74c3c", fontSize: 12 }}
        >{`Lời mời đã bị từ chối`}</Text>
        ;
      </View>
    );
  };

  render() {
    const { userData, item } = this.props;

    if (userData._id === item.sender._id) {
      return this._statusBar();
    }
    if (item.content.status === "accept") {
      return this._statusAccept();
    }
    return this._buttonBar();
  }
}

export default OptionsBar;
