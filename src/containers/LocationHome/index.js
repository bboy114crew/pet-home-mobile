import React, { Component } from "react";
import { View, Text } from "react-native";
import LocationHomeScreen from "../../components/LocationHomeScreen";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions/UIActions";

class LocationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LocationHomeScreen
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
)(LocationHome);
