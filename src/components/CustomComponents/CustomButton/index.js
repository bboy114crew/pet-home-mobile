import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "native-base";
import { loginFb } from "../../../services/LoginFacebook";
import { login, logout } from "../../../redux/actions/AuthActions";
import { toggle } from "../../../redux/actions/UIActions";


class CustomButton extends Component {
  _onPress = async () => {
    const { auth, onCustomPress, login, loginRequired, popup } = this.props;
    if (!auth.userData && loginRequired) {
      if (!popup) {
        this.props.toast({
          message: "Bạn cần đăng nhập",
          duration: 3000,
        });
      } else {
        const userData = await loginFb();
        if (userData._id) {
          login(userData);
        } else {
          this.props.toast({
            message: userData,
            duration: 3000,
          });
        }
      }
    } else {
      if (onCustomPress) {
        onCustomPress();
      }
    }
  };

  render() {
    return (
      <Button onPress={this._onPress} {...this.props}>
        {this.props.children}
      </Button>
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
    toast: toast => {
      dispatch(toggle(toast));
    },
  };
};

CustomButton.propTypes = {
  loginRequired: PropTypes.bool.isRequired,
  popup: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomButton);
