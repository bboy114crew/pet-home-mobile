import React, { Component } from "react";
import { listMarkerImage } from "../../../../utils/fakeData";
import { Text, ListItem, Thumbnail, Left, Body } from "native-base";

class DestinationLocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPress = () => {
    const { onItemPress, item } = this.props;
    if (onItemPress) {
      onItemPress(item, "destination");
    }
  };

  render() {
    const { item } = this.props;
    const thumb = listMarkerImage[item.typeId.typeLocation].thumbnail;

    return (
      <ListItem thumbnail onPress={this._onPress}>
        <Left>
          <Thumbnail small square source={thumb} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>Hòa Lạc, Thạch Thất, Hà Nội</Text>
        </Body>
      </ListItem>
    );
  }
}

export default DestinationLocationItem;
