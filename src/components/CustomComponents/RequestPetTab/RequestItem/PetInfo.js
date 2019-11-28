import React, { Component } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import PetServices from "../../../../services/PetServices";

const SCREEN_WIDTH = Dimensions.get("window").width;

class PetInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petInfo: undefined,
    };
  }

  componentDidMount() {
    this._requestGetPetInfo();
  }

  _requestGetPetInfo = async () => {
    const { petId } = this.props;
    try {
      const info = await PetServices.getPetById(petId);
      this.setState({ petInfo: info });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { petInfo } = this.state;

    if (!petInfo) return null;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.props.onInfoPress(this.props.petId)}
        style={{
          width: SCREEN_WIDTH / 2.5,
        }}
      >
        <Image
          source={{ uri: petInfo.images[0].url }}
          style={{
            width: SCREEN_WIDTH / 2.5,
            height: SCREEN_WIDTH / 2.5,
            marginBottom: 4,
          }}
        />
        <Text style={{ color: "#FFF" }}>{petInfo.name}</Text>
      </TouchableOpacity>
    );
  }
}

export default PetInfo;
