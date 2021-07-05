import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Notifications } from "expo";
import { connect } from "react-redux";
import UserServices from "../../../services/UserServices";
import {
  pushNotification,
  clearNotification,
} from "../../../redux/actions/NotificationActions";

const animatedValue = new Animated.Value(1);

class NotificationHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canRender: false,
    };
    this.notificationListener = Notifications.addListener(
      this._notificationHandle
    );
  }

  _hide = duration => {
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => this.setState({ canRender: false }));
  };

  _notificationHandle = async notification => {
    try {
      const { userData, userStates } = this.props;
      const sender = await this._getSender(notification.data.sender);
      if (sender._id !== userData._id) {
        // Check don't send notification myself
        if (
          notification.data.type === "message" &&
          notification.data.content.room === userStates.inChatRoom
        ) {
          return;
        }
        this.props.pushNotification(notification.data);
        this.setState({ canRender: true });
      }
    } catch (error) {
      throw error;
    }
  };

  _getSender = async userId => {
    try {
      const sender = await UserServices.findUser(userId);
      return sender;
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { notifications } = this.props;
    let notification = null;

    if (notifications.length !== 0) {
      notification = notifications[notifications.length - 1];
    }

    const animOpacity = animatedValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });

    if (this.state.canRender === false) return null;

    this._hide(3000);

    return (
      <Animated.View style={[styles.container, { opacity: animOpacity }]}>
        <View style={styles.body}>
          <Text>{` ${notification.message}`}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
  body: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#B5B5B5",
  },
  name: {
    fontWeight: "bold",
  },
});

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    notifications: state.notification,
    userStates: state.userStates,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushNotification: notification => {
      dispatch(pushNotification(notification));
    },
    clearNotification: () => {
      dispatch(clearNotification());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationHandle);
