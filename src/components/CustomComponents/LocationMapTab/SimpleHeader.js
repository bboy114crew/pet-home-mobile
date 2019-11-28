import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {
  Header,
  Body,
  Left,
  Right,
  Icon,
  Title,
  Button,
  Text,
} from "native-base";

const transAnimation = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
class SimpleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(1),
      locationItem: null,
    };
  }

  animateShow = () => {
    const { animateTrans } = this.state;
    transAnimation(animateTrans, 1);
  };

  animateHide = () => {
    const { animateTrans } = this.state;
    transAnimation(animateTrans, 0);
  };

  setLocationItem = locationItem => {
    this.setState({
      locationItem: locationItem,
    });
  };

  render() {
    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 0],
    });

    let transform = [{ translateY: transY }];

    const { locationItem } = this.state;
    const { isNavigation } = this.props;

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: transform,
        }}
      >
        <Header
          transparent
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#B5B5B5",
              borderRadius: 5,
            }}
          >
            {locationItem ? (
              <Button
                transparent
                iconRight
                onPress={() => this.props.onBackPress(locationItem)}
              >
                <Icon name="md-close" style={{ color: "#EC466A" }} />
              </Button>
            ) : (
              <Button
                transparent
                iconRight
                onPress={() => {
                  if (isNavigation === true) {
                    this.props.navigation.goBack();
                    this.props.onNavigationBackPress()
                  } else {
                    this.props.navigation.openDrawer();
                  }
                }}
              >
                <Icon
                  name={
                    isNavigation === true ? "ios-arrow-back-outline" : "md-menu"
                  }
                  style={{ color: "#EC466A" }}
                />
              </Button>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.onSearchPress()}
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#EC466A" }}>
                {locationItem ? locationItem.name : "Tìm địa điểm..."}
              </Text>
            </TouchableOpacity>
            <Button
              transparent
              iconLeft
              onPress={() => this.props.onDirectionPress()}
            >
              <Icon name="git-compare" style={{ color: "#EC466A" }} />
            </Button>
          </View>
        </Header>
      </Animated.View>
    );
  }
}

export default SimpleHeader;
