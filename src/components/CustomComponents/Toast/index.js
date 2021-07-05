import React, { PureComponent } from "react";
import {
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { clear } from "../../../redux/actions/UIActions";

const animatedValue = new Animated.Value(1);
const AnimButton = Animated.createAnimatedComponent(TouchableOpacity);

class Toast extends PureComponent {
  state = {
    toasting: false,
  };

  _timeoutClear = duration => {
    animatedValue.stopAnimation();
    this.setState({ toasting: true });
    Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ toasting: false });
      this.props.clear();
    });
  };

  render() {
    const { toast } = this.props;

    if (!toast) return null;

    const animOpacity = animatedValue.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });

    const { theme, message, duration } = toast;

    if (this.state.toasting === false) {
      this._timeoutClear(duration);
    }

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

const mapStateToProps = state => {
  return {
    toast: state.ui.toast,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clear: () => {
      dispatch(clear());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);
