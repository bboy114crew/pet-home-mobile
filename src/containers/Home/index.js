import React, { Component } from "react";
import { connect } from "react-redux";
import HomeTab from "../../components/HomeTab";
import { toggle } from "../../redux/actions/UIActions";
import { deletePost } from "../../redux/actions/PostActions";

class Home extends Component {
  render() {
    return (
      <HomeTab
        navigation={this.props.navigation}
        userData={this.props.auth.userData}
        toast={this.props.toast}
        deletePost={this.props.deletePost}
        notifications={this.props.notifications}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    notifications: state.notification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toast: toast => {
      dispatch(toggle(toast));
    },
    deletePost: post => {
      dispatch(deletePost(post));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
