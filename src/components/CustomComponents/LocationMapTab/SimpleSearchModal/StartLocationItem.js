import React, { Component } from "react";
import { Text, ListItem, Thumbnail, Left, Body } from "native-base";

class StartLocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPress = () => {
    const { onItemPress, item } = this.props;
    if (onItemPress) {
      onItemPress(
        {
          id: item.id,
          icon: item.icon,
          name: item.name,
          latitude: item.geometry.location.lat,
          longitude: item.geometry.location.lng,
          formatted_address: item.formatted_address,
        },
        "start"
      );
    }
  };

  render() {
    const { item } = this.props;

    return (
      <ListItem thumbnail onPress={this._onPress}>
        <Left>
          <Thumbnail small square source={{ uri: item.icon }} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.formatted_address}</Text>
        </Body>
      </ListItem>
    );
  }
}

export default StartLocationItem;
