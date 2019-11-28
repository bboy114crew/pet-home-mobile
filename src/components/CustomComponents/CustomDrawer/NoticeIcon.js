import React, { PureComponent } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Icon } from "native-base";
import CustomTouchable from "../CustomTouchable";

const animatedValue = new Animated.Value(0);

class NoticeIcon extends PureComponent {
  _onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };

  _startAnim = () => {
    animatedValue.stopAnimation();
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  render() {
    const { name, notification } = this.props;
    const animValue = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    if (!!notification) {
      this._startAnim();
    }
    return (
      <CustomTouchable
        loginRequired={true}
        style={styles.buttonBody}
        onCustomPress={this._onPress}
      >
        <Icon name={name} style={styles.iconBody} />
        {!!notification ? (
          <Animated.View
            style={[
              styles.notification,
              {
                opacity: animValue,
                transform: [
                  {
                    scale: animatedValue,
                  },
                  {
                    translateX: 10,
                  },
                ],
              },
            ]}
          />
        ) : null}
      </CustomTouchable>
    );
  }
}

const styles = StyleSheet.create({
  buttonBody: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconBody: {
    color: "#B5B5B5",
    marginBottom: 10,
    marginTop: 10,
  },
  notification: {
    position: "absolute",
    top: 10,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 8,
  },
});

export default NoticeIcon;
