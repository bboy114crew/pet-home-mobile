import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Badge,
} from "native-base";
import { clearNotification } from "../../../redux/actions/NotificationActions";
import { connect } from "react-redux";

class CustomHeader extends Component {
  _actionLeft = () => {
    const { actionLeft } = this.props;
    if (actionLeft) {
      actionLeft();
    }
  };

  _actionRight = () => {
    const { actionRight, badgeNumberRight } = this.props;
    if (badgeNumberRight && this.props.notification) {
      this.props.clearNotification();
    }
    if (actionRight) {
      actionRight();
    }
  };

  _headerColor = () => {
    const { headerColor } = this.props;
    if (!headerColor) {
      return "transparent";
    }
    return this.props.headerColor;
  };

  _buttonLeft = () => {
    const { buttonLeft, badgeNumberLeft } = this.props;
    if (!buttonLeft) {
      return null;
    }
    return (
      <Button
        vertical
        badge
        iconRight
        transparent
        onPress={this._actionLeft}
        style={{ marginLeft: 4 }}
      >
        {badgeNumberLeft ? (
          <Badge
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 16,
              height: 16,
            }}
          >
            <Text style={{ fontSize: 8, color: "#FFF" }}>
              {badgeNumberLeft}
            </Text>
          </Badge>
        ) : null}
        <Icon name={buttonLeft} style={{ color: "#EC466A", fontSize: 26 }} />
      </Button>
    );
  };

  _buttonRight = () => {
    const { buttonRight, badgeNumberRight, notification } = this.props;
    if (!buttonRight) {
      return null;
    }

    return (
      <Button vertical badge iconLeft transparent onPress={this._actionRight}>
        {badgeNumberRight && this.props.notification.length > 0 ? (
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 4,
              height: 16,
              width: 16,
              zIndex: 3,
              backgroundColor: "red",
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 10, color: "#FFF" }}>
              {notification.length > 9 ? "9+" : notification.length}
            </Text>
          </View>
        ) : null}
        <Icon name={buttonRight} style={{ color: "#EC466A", fontSize: 26 }} />
      </Button>
    );
  };

  render() {
    const { title } = this.props;
    return (
      <Header
        noShadow={true}
        hasTabs={true}
        style={{
          backgroundColor: this._headerColor(),
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: "transparent",
          shadowOffset: { height: 0, width: 0 },
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Left style={{}}>{this._buttonLeft()}</Left>
        <Body style={{ justifyContent: "center", alignItems: "center" }}>
          <Title style={{ color: "#EC466A", textAlign: "center" }}>
            {title}
          </Title>
        </Body>
        <Right style={{}}>{this._buttonRight()}</Right>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearNotification: () => {
      dispatch(clearNotification());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
