import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Count from "./Mark";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isSelected != nextState.isSelected;
  }

  _selectItem = () => {
    const { onItemPress, item, size, maxNumber } = this.props;
    const { isSelected } = this.state;

    if (!isSelected) {
      if (size < maxNumber) {
        onItemPress("add", item);
        this.setState({
          isSelected: true,
        });
      }
    } else {
      onItemPress("remove", item);
      this.setState({
        isSelected: false,
      });
    }
  };

  render() {
    const { item } = this.props;
    const { isSelected } = this.state;
    return (
      <TouchableOpacity
        onPress={this._selectItem}
        activeOpacity={0.7}
        style={styles.container}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        {isSelected ? <Count /> : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 3 - 4,
    height: Dimensions.get("screen").width / 3 - 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    margin: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Photo;
