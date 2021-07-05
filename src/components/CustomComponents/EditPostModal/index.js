import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import AddPostTab from "../../AddPostTab";
import PostServices from "../../../services/PostServices";
class EditPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      postData: undefined,
    };
  }

  setModalVisible = (visible, postData) => {
    this.setState({
      modalVisible: visible,
    });
    if (postData) {
      this._requestGetPost(postData._id);
    } else {
      this.setState({ postData });
    }
  };

  _requestGetPost = async postId => {
    try {
      const result = await PostServices.getPostById(postId);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { postData, modalVisible } = this.state;
    if (!postData) return null;
    return (
      <Modal transparent={false} visible={modalVisible} animationType="slide">
        {postData ? (
          <AddPostTab
            postData={postData}
            userData={this.props.userData}
            toast={this.props.toast}
            type="edit"
            closeModal={() => this.setModalVisible(false)}
            onEditSuccess={this.props.onEditSuccess}
          />
        ) : null}
      </Modal>
    );
  }
}

export default EditPostModal;
