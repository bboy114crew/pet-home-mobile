import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import DestinationLocationItem from "./DestinationLocationItem";
import StartLocationItem from "./StartLocationItem";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const animatedValue = new Animated.Value(SCREEN_HEIGHT + 200);
class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationType: null,
    };
  }

  show = type => {
    this.setState(
      {
        locationType: type,
      },
      () => {
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  _renderItem = ({ item }) => {
    const { locationType } = this.state;
    if (locationType === "start") {
      return this._renderStartLocationItem(item);
    }
    if (locationType === "destination") {
      return this._renderDestinationItem(item);
    }
  };

  _renderStartLocationItem = item => {
    const { onItemPress } = this.props;
    return <StartLocationItem item={item} onItemPress={onItemPress} />;
  };

  _renderDestinationItem = item => {
    const { onItemPress } = this.props;
    return <DestinationLocationItem item={item} onItemPress={onItemPress} />;
  };

  render() {
    const { locationType } = this.state;
    if (locationType) {
      return (
        <Animated.View
          style={{
            paddingBottom: 8,
            transform: [
              {
                translateY: animatedValue,
              },
            ],
          }}
        >
          <FlatList
            data={this.props.locationData}
            extraData={this.props.locationData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={this._renderItem}
          />
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

export default LocationList;
