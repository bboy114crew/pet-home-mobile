import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddPostTab from "../../components/AddPostTab";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions/UIActions";
class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userData } = this.props.auth;
    if (!userData) {
      return (
        <View style={styles.background}>
          <Text>Hãy đăng nhập để tạo bài viết</Text>
        </View>
      );
    }
    return (
      <AddPostTab
        navigation={this.props.navigation}
        userData={this.props.auth.userData}
        toast={this.props.toast}
        postData={null}
      />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toast: toast => {
      dispatch(toggle(toast));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
