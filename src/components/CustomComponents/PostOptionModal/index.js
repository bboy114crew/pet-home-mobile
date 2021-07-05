import React, { Component } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { Button, Text } from "native-base";
import ReportModal from "./ReportModal";
const OPTIONS = {
  Report: onPress => {
    return (
      <Button
        full
        warning
        key={"report"}
        onPress={() => onPress("report")}
        style={{ borderBottomWidth: 0.5, borderBottomColor: "#818181" }}
      >
        <Text>Tố cáo bài viết</Text>
      </Button>
    );
  },
  Edit: onPress => {
    return (
      <Button
        full
        info
        key={"edit"}
        onPress={() => onPress("edit")}
        style={{ borderBottomWidth: 0.5, borderBottomColor: "#818181" }}
      >
        <Text>Sửa bài viết</Text>
      </Button>
    );
  },
  Delete: onPress => {
    return (
      <Button
        full
        danger
        key={"delete"}
        onPress={() => onPress("delete")}
        style={{ borderBottomWidth: 0.5, borderBottomColor: "#818181" }}
      >
        <Text>Xóa bài viết</Text>
      </Button>
    );
  },
  Save: onPress => {
    return (
      <Button
        full
        success
        key={"save"}
        onPress={() => onPress("save")}
        style={{ borderBottomWidth: 0.5, borderBottomColor: "#818181" }}
      >
        <Text>Lưu bài viết</Text>
      </Button>
    );
  },
};

class PostOptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      options: [],
    };
  }

  setModalVisible = (visible, postData, options) => {
    this.postData = postData;
    this.setState({
      modalVisible: visible,
      options: visible ? options : [],
    });
  };

  _onPress = type => {
    if (type === "report") return this._openReport();
  };

  _openReport = () => {
    this.reportModal.setModalVisible(true, this.postData);
  };

  _reportModalCallback = () => {
    this.setModalVisible(false);
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
        animationType="fade"
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF90",
            zIndex: 6,
          }}
          activeOpacity={1}
          onPress={() => this.setModalVisible(false, [])}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
            }}
          >
            {this.state.options.map(opt => {
              return OPTIONS[opt](this._onPress);
            })}
          </View>
        </TouchableOpacity>
        <ReportModal
          modalCallback={this._reportModalCallback}
          ref={ref => (this.reportModal = ref)}
          toast={this.props.toast}
        />
      </Modal>
    );
  }
}

export default PostOptionModal;
