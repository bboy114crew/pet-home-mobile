import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import Comment from "./Comment";
import PostServices from "../../../services/PostServices";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  async componentDidMount() {
    await this._requestGetComments();
    const { postData, userData } = this.props;
    this.props.socket.on("commentPost", async post => {
      if (post._id === postData._id) {
        await this._requestGetComments();
        if (post.userCommentId === userData._id) {
          this.list.scrollToEnd();
        }
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
    const { comments } = this.state;
    return (
      <FlatList
        ref={ref => (this.list = ref)}
        scrollEnabled={false}
        data={comments}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Comment comment={item} />}
      />
    );
  }
}

export default CommentList;
