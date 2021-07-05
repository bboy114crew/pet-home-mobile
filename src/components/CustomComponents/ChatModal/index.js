import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import CustomHeader from "../CustomHeader";
import MessageServices from "../../../services/MessageServices";

import { connect } from "react-redux";
import { pushNotification } from "../../../redux/actions/NotificationActions";
import {
  joinChatRoom,
  leaveChatRoom,
} from "../../../redux/actions/UserActions";
import UserServices from "../../../services/UserServices";

class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      messages: [],
      conversationTitle: "",
    };
  }

  componentDidMount() {}

  _connectSocket = conversation => {
    const { socket, userData } = this.props;
    socket.emit("joinConversation", conversation);
    this.props.joinChatRoom(conversation._id);
    socket.on("sendMessage", async data => {
      const mes = {
        _id: data.message._id,
        text: data.message.text,
        createdAt: data.message.createdAt,
        user: data.user,
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, mes),
      }));
    });
  };

  _getSenderInfo = async id => {
    try {
      const info = await UserServices.findUser(id);
      return info;
    } catch (error) {
      throw error;
    }
  };

  _requestGetMessages = async conversation => {
    try {
      const result = await MessageServices.getMessages(conversation._id);
      let messages = result.messages.map(mes => {
        return {
          _id: mes._id,
          text: mes.content,
          createdAt: mes.createdAt,
          user: {
            _id: mes.sender._id,
            name: mes.sender.appName,
            avatar: mes.sender.avatar,
          },
        };
      });
      messages = messages.reverse();
      this.setState({ messages });
      return true;
    } catch (error) {
      throw error;
    }
  };

  setModalVisible = (visible, conversation) => {
    if (!visible) {
      this.props.socket.emit("leaveConversation", this.conversation);
      this.props.leaveChatRoom();
      this.setState({ messages: [] });
    }
    this.conversation = conversation;
    if (visible) {
      const { userData } = this.props;
      const receivers = conversation.users.filter(
        item => item.user._id !== userData._id
      );
      this.setState({ conversationTitle: receivers[0].user.appName });
      this._requestGetMessages(conversation);
      this._connectSocket(conversation);
    }
    this.setState({
      modalVisible: visible,
    });
  };

  _onDismiss = () => {};

  _onSend = async (messages = []) => {
    const { userData, socket } = this.props;

    const receivers = this.conversation.users.filter(
      item => item.user._id !== userData._id
    );

    const receiver = receivers[0].user._id;

    const data = {
      conversationId: this.conversation._id,
      message: messages[0],
      user: {
        _id: messages[0].user._id,
        name: userData.appName,
        avatar: userData.avatar,
      },
      notification: {
        content: {
          room: this.conversation._id
        },
        sender: userData._id,
        receiver: receiver,
        type: "message",
      },
    };
    socket.emit("sendMessage", data);
  };

  render() {
    const { modalVisible } = this.state;
    const { userData } = this.props;
    return (
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => {}}
        onDismiss={this._onDismiss}
      >
        <CustomHeader
          title={this.state.conversationTitle}
          buttonLeft="md-close"
          actionLeft={() => {
            this.setModalVisible(false);
          }}
        />
        {modalVisible ? (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => {
              this._onSend(messages);
            }}
            user={{
              _id: userData._id,
            }}
          />
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    joinChatRoom: roomId => {
      dispatch(joinChatRoom(roomId));
    },
    leaveChatRoom: () => {
      dispatch(leaveChatRoom());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    withRef: true,
  }
)(ChatModal);
