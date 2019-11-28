import React, { Component } from "react";
import { Image, Dimensions } from "react-native";

class BackgroundImage extends Component {
  _getImage = () => {
    const { imageName } = this.props;
    switch (imageName) {
      case "bg1": {
        return require("../../../assets/images/bg1.png");
      }
      case "bg2": {
        return require("../../../assets/images/bg2.png");
      }
      case "bg3": {
        return require("../../../assets/images/bg3.png");
      }
      case "bg4": {
        return require("../../../assets/images/bg4.png");
      }
      default: {
        return require("../../../assets/images/bg1.png");
      }
    }
  };

  render() {
    const img = this._getImage();
    return (
      <Image
        source={img}
        style={{
          position: "absolute",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          resizeMode: "cover",
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          opacity: 0.8,
        }}
      />
    );
  }
}

export default BackgroundImage;
