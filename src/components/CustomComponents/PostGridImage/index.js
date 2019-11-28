import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ShowImageModal from "./ShowImageModal";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class PostGridImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderOne = () => {
    const { images } = this.props;
    if (images.length === 0) return null;
    return images.map(image => {
      if (!image) return null;
      return (
        <Image key={image._id} source={{ uri: image.url }} style={styles.one} />
      );
    });
  };

  _renderTwo = () => {
    const { images } = this.props;
    if (images.length === 0) return null;
    const size = images.length;
    return (
      <View>
        <Image
          key={images[0]._id}
          source={{ uri: images[0].url }}
          style={styles.moreThumbnail}
        />
        {
          <View style={styles.list}>
            {images.map((image, index) => {
              if (!image) return null;
              if (index === 0) return null;
              if (index > 2) return null;
              return (
                <View key={image._id}>
                  <Image source={{ uri: image.url }} style={styles.small} />
                  {index === 2 && size - 3 > 0 ? (
                    <View style={styles.more}>
                      <Text style={styles.text}>{`+${size - 3}`}</Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        }
      </View>
    );
  };

  _renderImage = () => {
    const { images } = this.props;
    const size = images.length;
    if (size > 0 && size <= 2) {
      return this._renderOne();
    }
    return this._renderTwo();
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.showImageModal.setModalVisible(true, this.props.images)
        }
      >
        <ShowImageModal ref={ref => (this.showImageModal = ref)} />
        {this._renderImage()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  one: {
    height: 400,
    width: null,
    flex: 1,
  },
  moreThumbnail: {
    height: SCREEN_WIDTH / 2 - 14,
    width: null,
    flex: 1,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  small: {
    width: SCREEN_WIDTH / 2 - 14,
    height: SCREEN_WIDTH / 2 - 14,
  },
  more: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF90",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#615c70",
    fontSize: 26,
  },
});

export default PostGridImage;
