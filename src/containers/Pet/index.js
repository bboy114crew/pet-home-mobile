import React, { Component } from "react";
import { View, Text } from "react-native";
import PetScreen from "../../components/PetScreen";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions/UIActions";

class Pet extends Component {
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
      <PetScreen
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
)(Pet);
