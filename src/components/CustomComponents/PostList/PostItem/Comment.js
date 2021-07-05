import React, { Component } from "react";
import { Button, Icon, Text } from "native-base";
import PostServices from "../../../../services/PostServices";
class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  async componentDidMount() {
    const { postData } = this.props;
    await this._requestGetComments();
    this.props.socket.on("commentPost", post => {
      if (post._id === postData._id) {
        this._requestGetComments();
      }
    });
  }

  _requestGetComments = async () => {
    try {
      const { postData } = this.props;
      const result = await PostServices.getComments(postData._id);
      this.setState({ comments: result });
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <Button
        transparent
        textStyle={{ color: "#00E7C3" }}
        onPress={() => {
          this.props.navigation.navigate("CommentScreen", {
            postId: this.props.postData._id,
            userData: this.props.userData,
          });
        }}
      >
        <Icon name="ios-chatbubbles-outline" style={{ color: "#00E7C3" }} />
        <Text>{this.state.comments.length}</Text>
      </Button>
    );
  }
}

export default Vote;
