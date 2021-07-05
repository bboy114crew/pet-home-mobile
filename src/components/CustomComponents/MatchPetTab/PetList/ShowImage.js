import React, { Component } from "react";
import { View, Modal, FlatList, Dimensions, Image } from "react-native";
import CustomHeader from "../../CustomHeader";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class ShowImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      images: [],
    };
  }

  setModalVisible = (modalVisible, images) => {
    this.setState({
      modalVisible,
      images,
    });
  };

  render() {
    const { modalVisible, images } = this.state;
    return (
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
          }}
        >
          <CustomHeader
            buttonLeft="md-close"
            actionLeft={() => this.setModalVisible(false)}
          />
          {modalVisible ? (
            <FlatList
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
              data={images}
              keyExtractor={item => item._id}
              pagingEnabled
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        resizeMode: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : null}
        </View>
      </Modal>
    );
  }
}

export default ShowImage;
