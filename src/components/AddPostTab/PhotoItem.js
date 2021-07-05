import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icon, Spinner, Toast } from "native-base";
import ImageServices from "../../services/ImageServices";

class PhotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { item } = this.props;
    if (item.url) return;
    this._uploadImage();
  }

  _uploadImage = async () => {
    this._setLoading(true);
    try {
      const { item } = this.props;
      const result = await ImageServices.uploadImage(item);
      this._onUploadDone({ ...result, _id: item._id });
    } catch (error) {}
    this._setLoading(false);
  };

  _onUploadDone = image => {
    this.image = image;
    const { onUploadDone } = this.props;
    if (onUploadDone) {
      onUploadDone(image);
    }
  };

  _setLoading = loading => {
    this.setState({
      loading,
    });
  };

  _onPress = async () => {
    const { removeItem, item } = this.props;
    const { loading } = this.state;
    try {
      if (loading) {
        ImageServices.cancelUpload();
      }
      if (removeItem) {
        const img = this.image ? this.image : item;
        removeItem(img);
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { item } = this.props;
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: item.url ? item.url : item.uri }}
          style={styles.photo}
        />
        {loading ? (
          <View style={styles.loading}>
            <Spinner color="#615c70" />
          </View>
        ) : null}
        <TouchableOpacity onPress={this._onPress} style={styles.removeBtn}>
          <Icon name="md-close" style={styles.removeIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 4,
  },
  photo: {
    width: 150,
    height: 200,
  },
  removeBtn: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    color: "#FFF",
    fontSize: 10,
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF90",
  },
});

export default PhotoItem;
