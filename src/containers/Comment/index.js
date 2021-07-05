import React, { Component } from "react";
import { connect } from "react-redux";
import CommentScreen from "../../components/CommentScreen";
import { toggle } from "../../redux/actions/UIActions";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CommentScreen
        navigation={this.props.navigation}
        userData={this.props.auth.userData}
        toast={this.props.toast}
        socket={this.props.socket}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    socket: state.socket
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
)(Comment);
