import React, { Component } from "react";
import {
  View,
  FlatList,
  Modal,
  Dimensions,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import PetServices from "../../../services/PetServices";
import CustomHeader from "../CustomHeader";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const animatedValue = new Animated.Value(1);

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      petInfo: undefined,
      likeNumber: 0,
      infoHeight: 0,
    };

    this.showInfo = true;
  }

  setModalVisible = (modalVisible, petId) => {
    this.setState({ modalVisible });
    if (petId) {
      this._requestGetInfo(petId);
    } else {
      this.setState({ petInfo: undefined });
    }
  };

  _requestGetInfo = async petId => {
    try {
      const info = await PetServices.getPetById(petId);
      const likeNumber = await PetServices.getLikeNumber(info._id);
      this.setState({ petInfo: info, likeNumber });
    } catch (error) {
      throw error;
    }
  };

  _showInfo = showValue => {
    this.showInfo = showValue === 1;
    animatedValue.stopAnimation();
    Animated.timing(animatedValue, {
      toValue: showValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { petInfo } = this.state;

    const transY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.infoHeight, 0],
      extrapolate: "clamp",
    });

    return (
      <Modal
        transparent={false}
        visible={this.state.modalVisible}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
          }}
        >
          <CustomHeader
            title=""
            buttonLeft="md-close"
            actionLeft={() => {
              this.setModalVisible(false);
            }}
          />
          {this.state.petInfo ? (
            <FlatList
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
              }}
              data={petInfo.images}
              keyExtractor={item => item._id}
              horizontal
              pagingEnabled
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    activeOpacity={1}
                    onPress={() => {
                      const showValue = this.showInfo === true ? 0 : 1;
                      this._showInfo(showValue);
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
                  </TouchableOpacity>
                );
              }}
            />
          ) : null}
          {this.state.petInfo ? (
            <Animated.View
              onLayout={event => {
                this.setState({ infoHeight: event.nativeEvent.layout.height });
              }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                backgroundColor: "#00000090",
                justifyContent: "center",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                transform: [
                  {
                    translateY: transY,
                  },
                ],
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#FFF",
                  }}
                >{`Tên: ${petInfo.name}`}</Text>
                <Text
                  style={{
                    flex: 1,
                    color: "#FFF",
                  }}
                >{`Loài: ${petInfo.breed}`}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#FFF",
                  }}
                >{`Giống: ${petInfo.branch}`}</Text>
                <Text
                  style={{
                    flex: 1,
                    color: "#FFF",
                  }}
                >{`Giới tính: ${petInfo.gender}`}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#FFF",
                    marginBottom: 4,
                  }}
                >{`Tuổi: ${petInfo.age}`}</Text>
                <Text
                  style={{
                    flex: 1,
                    color: "#FFF",
                  }}
                >{`Lượt thích: ${this.state.likeNumber}`}</Text>
              </View>

              <Text
                style={{
                  flex: 1,
                  color: "#FFF",
                  marginBottom: 4,
                }}
              >{`Giới thiệu: ${petInfo.description}`}</Text>
            </Animated.View>
          ) : null}
        </View>
      </Modal>
    );
  }
}

export default InfoModal;
