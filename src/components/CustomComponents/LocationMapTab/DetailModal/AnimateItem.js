import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity)
class AnimateItem extends Component {
  constructor(props) {
    super(props);

    const { fromPos, toPos } = this.props;

    this.state = {
      animatedTrans: new Animated.ValueXY({ x: fromPos.x, y: fromPos.y }),
      canRender: true,
    };

    this.show();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.canRender === this.state.canRender) {
      return false;
    }

    return true;
  }

  show = () => {
    const { fromPos, toPos, onAnimationDone } = this.props;
    Animated.timing(this.state.animatedTrans, {
      toValue: { x: toPos.x, y: toPos.y },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onAnimationDone();
      this.setState({ canRender: false });
    });
  };

  hide = (fromPos, toPos, onAnimationDone) => {
    this.setState(
      {
        canRender: true,
      },
      () => {
        this.state.animatedTrans.setValue({ x: fromPos.x, y: fromPos.y });
        Animated.timing(this.state.animatedTrans, {
          toValue: { x: toPos.x, y: toPos.y },
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onAnimationDone();
        });
      }
    );
  };

  render() {
    const { item } = this.props;

    if (this.state.canRender) {
      return (
        <AnimatedTouch
          ref={ref => (this.locItem = ref)}
          style={{
            borderRadius: 10,
            transform: [...this.state.animatedTrans.getTranslateTransform()],
            justifyContent: "center",
            padding: 10,
            position: "absolute",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#00cc99",
                marginRight: 4,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#00cc99",
                marginRight: 4,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#00cc99",
                marginRight: 4,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#00cc99",
                marginRight: 4,
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#615c70",
                marginRight: 10,
              }}
            />
            <Text style={{ fontSize: 12 }}>{`${
              item.rating
            }/5 - Cách bạn 1.2Km`}</Text>
          </View>
        </AnimatedTouch>
      );
    } else {
      return null;
    }
  }
}

export default AnimateItem;
