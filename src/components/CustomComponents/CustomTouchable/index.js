import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginFb } from "../../../services/LoginFacebook";
import { login, logout } from "../../../redux/actions/AuthActions";
import { setLoading } from "../../../redux/actions/UIActions";
import { toggle } from "../../../redux/actions/UIActions";

class CustomTouchable extends Component {
  _onPress = async () => {
    const {
      auth,
      onCustomPress,
      login,
      loginRequired,
      setLoading,
    } = this.props;
    if (!auth.userData && loginRequired) {
      setLoading(true);
      try {
        const userData = await loginFb();
        if (!userData) {
          setLoading(false);
        }
        if (userData._id) {
          login(userData);
        } else {
          this.props.toast({ message: userData, duration: 3000 });
        }
      } catch (error) {
        throw error;
      }
      setLoading(false);
    } else {
      if (onCustomPress) {
        onCustomPress();
      }
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} {...this.props}>
        {this.props.children}
      </TouchableOpacity>
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
    login: userData => {
      dispatch(login(userData));
    },
    logout: () => {
      dispatch(logout());
    },
    setLoading: loading => {
      dispatch(setLoading(loading));
    },
    toast: toast => {
      dispatch(toggle(toast));
    },
  };
};

CustomTouchable.propTypes = {
  loginRequired: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTouchable);
