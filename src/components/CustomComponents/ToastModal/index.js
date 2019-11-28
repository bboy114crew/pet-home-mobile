import React, { PureComponent } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const animatedValue = new Animated.Value(1);
const AnimButton = Animated.createAnimatedComponent(TouchableOpacity);

class ToastModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toast: undefined,
    };
  }

  show = (message, duration = 3000, theme = "dark") => {
    this.setState({
      toast: {
        message,
        duration,
        theme,
      },
    });
  };

  _timeoutClear = duration => {
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ toast: undefined });
    });
  };

  render() {
    const { toast } = this.state;
    if (!toast) return null;

    const animOpacity = animatedValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });

    const { theme, message, duration } = toast;

    this._timeoutClear(duration);
    return (
      <AnimButton
        activeOpacity={1}
        onPress={() => this._timeoutClear(200)}
        style={[
          styles.container,
          {
            opacity: animOpacity,
            backgroundColor: theme === "light" ? "#FFFFFF" : "#2c3e50",
          },
        ]}
      >
        <Text
          style={{
            color: theme === "light" ? "#2c3e50" : "#FFFFFF",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      </AnimButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    borderRadius: 10,
    alignSelf: "center",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default ToastModal;
