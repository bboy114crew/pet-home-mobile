import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileScreen from "../../components/ProfileScreen";
import { toggle } from "../../redux/actions/UIActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.auth.userData) {
      this.props.navigation.navigate("Home");
      return null;
    }
    return (
      <ProfileScreen
        navigation={this.props.navigation}
        userData={this.props.auth.userData}
        toast={this.props.toast}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
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
)(Profile);
