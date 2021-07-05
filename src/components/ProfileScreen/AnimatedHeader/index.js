import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";

import AnimatedBackground from "./AnimatedBackground";
import AnimatedAvatar from "./AnimatedAvatar";
import AnimatedName from "./AnimatedName";
import AnimatedNavBar from "./AnimatedNavBar";
import EditInfoModal from "./EditInfoModal";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 74;
const BODY_HEIGHT = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class AnimatedHeader extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  _onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Bỏ qua", "Thay ảnh nền", "Thay ảnh đại diện", "Đổi tên"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex !== 0) {
          this.editModal.getWrappedInstance().setModalVisible(true, buttonIndex);
        }
      }
    );
  };

  render() {
    const { userData, animatedValue } = this.props;

    let transY = animatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [0, HEADER_MIN_HEIGHT - HEADER_MAX_HEIGHT],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          backgroundColor: "#FFFFFF",
          transform: [
            {
              translateY: transY,
            },
          ],
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: HEADER_MAX_HEIGHT,
        }}
      >
        <EditInfoModal
          userData={userData}
          ref={ref => (this.editModal = ref)}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={this._onPress}>
          <AnimatedNavBar
            animatedValue={animatedValue}
            navigation={this.props.navigation}
          />
          <AnimatedBackground
            animatedValue={animatedValue}
            userData={userData}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: BODY_HEIGHT,
            }}
          >
            <AnimatedAvatar animatedValue={animatedValue} userData={userData} />

            <AnimatedName animatedValue={animatedValue} userData={userData} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default AnimatedHeader;
