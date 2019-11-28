import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Keyboard,
  Animated,
} from "react-native";
import { Text, Icon, Button } from "native-base";
import PostServices from "../../services/PostServices";

const animatedValue = new Animated.Value(0);

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      containerHeight: 0,
      commentContent: "",
    };
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow = event => {
    this.setState({ keyboardHeight: event.startCoordinates.height });
    this._startAnim(1);
  };

  _keyboardWillHide = event => {
    this.setState({ keyboardHeight: 0 });
    this._startAnim(0);
  };

  _startAnim = value => {
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  _requestSendComment = async () => {
    try {
      const deletionFlag = await this._requestGetDeletionFlag();
      if (deletionFlag === true) {
        console.log(this.props.toast);
        Keyboard.dismiss();
        this.props.toast({ message: "Bài viết này đã bị cấm", duration: 3000 });
        return;
      }
      const { commentContent } = this.state;
      const { postData, userData, sendCommentCallback } = this.props;
      const data = {
        postId: postData._id,
        userCommentId: userData._id,
        content: commentContent,
        notification:
          postData.ownerId._id !== userData._id
            ? {
                tokens: [postData.ownerId.expoToken],
                data: {
                  message: `${userData.appName} đã bình luận bài viết của bạn`,
                  content: {
                    post: {
                      _id: postData._id,
                    },
                  },
                  sender: userData._id,
                  receiver: postData.ownerId._id,
                  type: "post-comment",
                },
              }
            : null,
      };
      await PostServices.addComment(data);
      sendCommentCallback && sendCommentCallback();
      this.props.socket.emit("commentPost", {
        ...postData,
        userCommentId: userData._id,
      });
    } catch (error) {}
    this.setState({ commentContent: "" });
    Keyboard.dismiss();
  };

  _requestGetDeletionFlag = async () => {
    try {
      const { postData } = this.props;
      const result = await PostServices.getPostById(postData._id);
      return result.deletionFlag;
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { keyboardHeight, containerHeight, commentContent } = this.state;

    const transY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0 - keyboardHeight],
      extrapolate: "clamp",
    });

    const transform = [{ translateY: transY }];

    return (
      <Animated.View
        style={[styles.background, { transform }]}
        onLayout={event =>
          this.setState({ containerHeight: event.nativeEvent.layout.height })
        }
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Viết bình luận"
            underlineColorAndroid="transparent"
            multiline={true}
            style={styles.text}
            onChangeText={text => this.setState({ commentContent: text })}
            value={commentContent}
            ref={ref => (this.input = ref)}
          />
          <View style={styles.right}>
            <TouchableOpacity
              style={styles.button}
              disabled={commentContent.length < 1}
              onPress={this._requestSendComment}
            >
              <Image
                source={require("../../assets/icons/ic_send.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 4,
    paddingTop: 4,
  },
  container: {
    backgroundColor: "#EEEEEE",
    flexDirection: "row",
    borderRadius: 10,
    overflow: "scroll",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    paddingBottom: 6,
    paddingTop: 6,
  },
  text: {
    flex: 1,
    borderBottomWidth: 0,
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  right: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    flex: 1,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "cover",
  },
});

export default Footer;
