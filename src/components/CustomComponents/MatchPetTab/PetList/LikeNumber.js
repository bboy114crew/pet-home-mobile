import React, { Component } from "react";
import { View, Text } from "react-native";
import PetServices from "../../../../services/PetServices";

class LikeNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeNumber: 0,
    };
  }

  componentDidMount() {
    this._requestGetLikeNumber();
  }

  _requestGetLikeNumber = async () => {
    try {
      const { item } = this.props;
      const result = await PetServices.getLikeNumber(item._id);
      this.setState({ likeNumber: result });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { likeNumber } = this.state;
    if (likeNumber === 0) return null;
    return (
      <View
        style={{
          position: "absolute",
          top: -20,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Text style={{ fontSize: 12, color: "#00000095" }}>{likeNumber}</Text>
      </View>
    );
  }
}

export default LikeNumber;
