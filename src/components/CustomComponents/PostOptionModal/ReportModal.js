import React, { Component } from "react";
import { View, Modal, FlatList, StyleSheet } from "react-native";
import { List, Button, Text, Spinner } from "native-base";
import CustomHeader from "../CustomHeader";
import PostServices from "../../../services/PostServices";

const reports = [
  {
    content: "Nội dung không phù hợp",
  },
  {
    content: "Ngôn từ đả kích",
  },
  {
    content: "Lặp lại liên tục",
  },
];

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: false,
    };
  }

  setModalVisible = (modalVisible, post) => {
    this.postData = post;
    this.setState({
      modalVisible,
    });
  };

  _selectReport = async description => {
    this._setLoading(true);
    try {
      const data = {
        postId: this.postData._id,
        reporterId: this.props.userData._id,
        description,
      };
      await PostServices.report(data);
      this.props.toast({
        message: "Báo cáo bài viết thành công",
        theme: "dark",
        duration: 3000,
      });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
    this.setModalVisible(false);
  };

  _setLoading = loading => {
    this.setState({
      loading,
    });
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Button
          block
          rounded
          info
          onPress={() => this._selectReport(item.content)}
        >
          <Text>{item.content}</Text>
        </Button>
      </View>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={false}
        animationType="slide"
      >
        {loading ? (
          <View style={styles.loading}>
            <Spinner color="#615c70" />
          </View>
        ) : null}
        <View style={styles.container}>
          <CustomHeader
            buttonLeft="md-close"
            actionLeft={() => this.setModalVisible(false)}
          />
          <FlatList
            data={reports}
            keyExtractor={item => item.content}
            renderItem={this._renderItem}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#FFFFFF95",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  container: {
    marginBottom: 20,
    flex: 1,
  },
  item: {
    margin: 10,
  },
});

export default ReportModal;
