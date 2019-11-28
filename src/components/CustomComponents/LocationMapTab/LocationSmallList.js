import React, { Component } from "react";
import { View, FlatList, Animated, Dimensions } from "react-native";
import LocationItem from "./LocationItem";
import DetailModal from "./DetailModal";

const animationMove = (animated, value) => {
  Animated.timing(animated, {
    toValue: value,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

class LocationSmallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateTrans: new Animated.Value(0),
    };
    this.items = {};
  }

  moveDown = () => {
    const { animateTrans } = this.state;
    animationMove(animateTrans, 1);
  };

  moveUp = () => {
    const { animateTrans } = this.state;
    animationMove(animateTrans, 0);
  };

  _onPress = item => {
    const { onItemPress } = this.props;
    this.scrollToIndex(this.props.locationData.indexOf(item));
    if (onItemPress) {
      onItemPress(item);
    }
  };

  scrollToIndex = index => {
    this.locationList.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };

  _renderItem = ({ item }) => {
    return (
      <View ref={ref => (this.items[item.id] = { ref, item })}>
        <LocationItem
          item={item}
          onPress={this._onPress}
          isAnimated={!this.state.scrollEnabled}
        />
      </View>
    );
  };

  render() {
    let opacity = this.state.animateTrans.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [1, 0, 0, 1],
    });

    let transY = this.state.animateTrans.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [
        0,
        -200,
        Dimensions.get("screen").height + 100,
        Dimensions.get("screen").height - 160,
      ],
    });

    let transform = [{ translateY: transY }];

    return (
      <View>
        <Animated.View
          style={[
            {
              opacity: opacity,
              transform: transform,
              overflow: "visible",
            },
          ]}
        >
          <FlatList
            ref={ref => (this.locationList = ref)}
            data={this.props.locationData}
            renderItem={this._renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item._id}
          />
        </Animated.View>
      </View>
    );
  }
}

export default LocationSmallList;
