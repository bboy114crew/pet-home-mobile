import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { Tabs, Tab } from "native-base";
import CustomHeader from "../CustomHeader";
import NotificationList from "../NotificationList";
import MessageList from "../MessageList";
import { Notifications } from "expo";

class ActivityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      initPage: null,
    };
  }

  setVisible = (visible, initPage) => {
    this.setState({
      modalVisible: visible,
      initPage: initPage ? initPage : null,
    });
  };

  render() {
    const { modalVisible, initPage } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {}}
        presentationStyle="pageSheet"
      >
        <CustomHeader
          title="Hoạt động"
          buttonLeft="md-close"
          actionLeft={() => {
            this.setVisible(false);
          }}
        />
        <Tabs
          page={initPage ? initPage : 0}
          tabBarUnderlineStyle={{ backgroundColor: "#EC466A" }}
        >
          <Tab
            heading="Thông báo"
            activeTextStyle={{ color: "#EC466A" }}
            tabStyle={{ backgroundColor: "#FFFFFF" }}
          >
            <NotificationList
              navigation={this.props.navigation}
              onItemPress={() => this.setVisible(false)}
            />
          </Tab>

          <Tab
            heading="Tin nhắn"
            activeTextStyle={{ color: "#EC466A" }}
            tabStyle={{ backgroundColor: "#FFFFFF" }}
          >
            <MessageList />
          </Tab>
        </Tabs>
      </Modal>
    );
  }
}

export default ActivityModal;
