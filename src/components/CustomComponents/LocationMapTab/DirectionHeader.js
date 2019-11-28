import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Container, Button, Icon } from "native-base";

const transAnimation = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
const animateTrans = new Animated.Value(0);

class DirectionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLocation: props.userLocation,
      destinationLocation: null,
    };
  }

  animateShow = () => {
    transAnimation(animateTrans, 1);
  };

  animateHide = () => {
    transAnimation(animateTrans, 0);
  };

  setStartLocation = location => {
    const { userLocation } = this.props;
    this.setState({
      startLocation: location ? location : userLocation,
    });
  };

  setDestinationLocation = location => {
    this.setState({
      destinationLocation: location,
    });
  };

  _onStartDirection = () => {
    const { onStartDirection } = this.props;
    const { startLocation, destinationLocation } = this.state;
    if (startLocation && destinationLocation && onStartDirection) {
      onStartDirection(
        {
          latitude: startLocation.latitude,
          longitude: startLocation.longitude,
        },
        {
          latitude: destinationLocation.coordinate.latitude,
          longitude: destinationLocation.coordinate.longitude,
        }
      );
    }
  };

  render() {
    let transY = animateTrans.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    let transform = [{ translateY: transY }];

    const { startLocation, destinationLocation } = this.state;

    return (
      <Animated.View style={[styles.animateView, { transform: transform }]}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.back}
            activeOpacity={0.7}
            transparent
            onPress={() => {
              this.props.onBackPress(destinationLocation);
            }}
          >
            <Icon name="ios-arrow-back-outline" style={styles.iconBack} />
          </TouchableOpacity>
          <View style={styles.body}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.onSelectLocationPress("start");
              }}
              style={styles.buttonUp}
            >
              <Text numberOfLines={1} lineBreakMode="tail" style={styles.text}>
                {startLocation.id ? startLocation.name : "Vị trí của bạn"}
              </Text>
              {startLocation.id ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.setStartLocation(null)}
                  hitSlop={{
                    top: 20,
                    left: 20,
                    right: 20,
                    bottom: 20,
                  }}
                  style={styles.clear}
                >
                  <Icon name="md-close" style={styles.clearIcon} />
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.onSelectLocationPress("destination");
              }}
              style={styles.buttonDown}
            >
              <Text numberOfLines={1} lineBreakMode="tail" style={styles.text}>
                {destinationLocation
                  ? destinationLocation.name
                  : "Vị trí dẫn đường"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this._onStartDirection}
            activeOpacity={0.7}
            style={styles.buttonStart}
          >
            <Text style={styles.textStart}>Tìm</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  animateView: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,

    paddingTop: 20,
  },
  container: {
    backgroundColor: "#00cc99",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: "#00000030",
    borderLeftWidth: 0.6,
    borderLeftColor: "#00000020",
    borderTopWidth: 0.3,
    borderTopColor: "#00000010",
    borderRightWidth: 0.3,
    borderRightColor: "#00000010",
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  iconBack: {
    color: "#FFF",
  },
  body: {
    flex: 1,
    marginLeft: 4,
    marginRight: 10,
  },
  buttonUp: {
    backgroundColor: "#FFFFFF80",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#FFF",
    flex: 1,
  },
  clear: {
    justifyContent: "center",
    alignItems: "center",
  },
  clearIcon: {
    fontSize: 16,
    color: "#FFF",
  },
  buttonDown: {
    backgroundColor: "#FFFFFF80",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStart: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textStart: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default DirectionHeader;
