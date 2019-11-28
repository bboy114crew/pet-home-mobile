import React, { Component } from "react";
import { View, Image, TouchableOpacity, ActionSheetIOS } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import Comment from "./Comment";
import Vote from "./Vote";
import PostGridImage from "../../PostGridImage";
import ReadMoreText from "../../ReadMoreText";
import ChatModal from "../../ChatModal";
import MessageServices from "../../../../services/MessageServices";
import PostServices from "../../../../services/PostServices";

import { connect } from "react-redux";
import { toggle } from "../../../../redux/actions/UIActions";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChatModal: false,
      postData: undefined,
    };
  }

  componentDidMount() {
    this._requestGetPostData();
  }

  _requestGetPostData = async () => {
    try {
      const { postData } = this.props;
      const result = await PostServices.getPostById(postData._id);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
  };

  _optionPress = () => {
    const { optionPress, postData } = this.props;
    if (optionPress) {
      optionPress(postData);
    }
  };

  _voteCallback = voteType => {
    if (voteType === 1) {
      this.downVote._requestGetVote();
    } else {
      this.upVote._requestGetVote();
    }
  };

  _subscribeHidePost = () => {
    const { socket, userData } = this.props;
    const { postData } = this.state;
    if (userData) {
      socket.on("hidePost", post => {
        if (postData && post.id === postData._id) {
          this._requestGetPostData();
        }
      });
    }
    socket.on("editPost", post => {
      if (postData && post._id === postData._id) {
        console.log("edit post: ", post);
        this._requestGetPostData();
      }
    });
  };

  _onUserPress = () => {
    const { postData, userData } = this.props;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Bỏ qua", "Gửi tin nhắn"],
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 1) {
          try {
            const users = [
              {
                user: postData.ownerId._id,
              },
              {
                user: userData._id,
              },
            ];
            const conversation = await MessageServices.createConversation(
              users
            );
            this.setState({ renderChatModal: true }, () => {
              this.chatModal
                .getWrappedInstance()
                .setModalVisible(true, conversation);
            });
          } catch (error) {
            throw error;
          }
        }
      }
    );
  };

  render() {
    const { userData, socket, toast } = this.props;
    const { postData } = this.state;

    if (socket) {
      this._subscribeHidePost();
    }

    if (!postData) return null;

    const date = new Date(postData.createdAt);
    return (
      <Card>
        {this.state.renderChatModal === true ? (
          <ChatModal ref={ref => (this.chatModal = ref)} userData={userData} />
        ) : null}
        {postData.deletionFlag === true ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              position: "absolute",
              zIndex: 1,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onPress={() => {
              toast({ message: "Bài viết này đã bị cấm", duration: 5000 });
            }}
          />
        ) : null}
        <CardItem>
          <Left>
            <TouchableOpacity
              disabled={userData ? postData.ownerId._id === userData._id : true}
              activeOpacity={0.8}
              onPress={this._onUserPress}
            >
              <Thumbnail source={{ uri: postData.ownerId.avatar }} />
            </TouchableOpacity>
            <View>
              <Text style={{ alignSelf: "flex-start" }}>
                {postData.ownerId.appName}
              </Text>
              <Text note style={{ fontSize: 12, alignSelf: "flex-start" }}>
                {date.toLocaleDateString()}
              </Text>
            </View>
          </Left>
          <Right style={{ alignSelf: "flex-start" }}>
            {userData ? (
              <TouchableOpacity
                onPress={this._optionPress}
                hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
                activeOpacity={0.7}
              >
                <Icon name="ios-more" style={{ color: "#000" }} />
              </TouchableOpacity>
            ) : null}
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <ReadMoreText numberOfLines={3}>
              <Text>{postData.title}</Text>
            </ReadMoreText>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <View style={{ flex: 1 }}>
            <PostGridImage images={postData.images} />
          </View>
        </CardItem>
        <CardItem>
          <Left>
            <Vote
              ref={ref => (this.upVote = ref)}
              postData={postData}
              type={1}
              voteCallback={this._voteCallback}
              userData={userData}
            />
            <Comment
              postData={postData}
              navigation={this.props.navigation}
              userData={userData}
              socket={this.props.socket}
            />
          </Left>
          <Right>
            <Vote
              ref={ref => (this.downVote = ref)}
              postData={postData}
              type={0}
              voteCallback={this._voteCallback}
              userData={userData}
            />
          </Right>
        </CardItem>
      </Card>
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
    toast: toast => {
      dispatch(toggle(toast));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
