import React, { Component } from "react";
import { View, Text } from "react-native";
import LoginScreen from "../../components/LoginScreen";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <LoginScreen navigation={this.props.navigation} />;
  }
}

export default Login;
