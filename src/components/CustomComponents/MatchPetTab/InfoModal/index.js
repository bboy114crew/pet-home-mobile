import React, { Component } from "react";
import {
  View,
  Modal,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Button, Text } from "native-base";

const steps = [
  {
    id: "0",
    icon: require("../../../../assets/icons/ic_reload.png"),
    guide: "Giúp bạn tải lại danh sách Pet",
  },
  {
    id: "1",
    icon: require("../../../../assets/icons/ic_delete.png"),
    guide: "Loại bỏ sự hiển thị của Pet trong danh sách",
  },
  {
    id: "2",
    icon: require("../../../../assets/icons/ic_like.png"),
    guide: "Hãy ấn like nếu bạn yêu quý Pet",
  },
  {
    id: "3",
    icon: require("../../../../assets/icons/ic_heart.png"),
    guide: "Gửi lời mời ghép cặp",
  },
  {
    id: "4",
    icon: require("../../../../assets/icons/ic_talk.png"),
    guide: "Trò chuyện, trao đổi thông tin với chủ nhân của Pet",
  },
];

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      viewableItem: 0,
    };
  }

  setModalVisible = modalVisible => {
    this.setState({ modalVisible });
  };

  _onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length === 1) {
      this.setState({ viewableItem: viewableItems[0].index });
    }
  };

  render() {
    return (
      <Modal
        transparent={false}
        animationType="slide"
        visible={this.state.modalVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={steps}
            pagingEnabled
            horizontal
            keyExtractor={item => item.id}
            onViewableItemsChanged={this._onViewableItemsChanged}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                    padding: 10,
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: "cover",
                      marginBottom: 10,
                    }}
                  />
                  <Text style={{textAlign: 'center'}} >{item.guide}</Text>
                </View>
              );
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {steps.map(item => {
              return (
                <View
                  key={item.id}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginLeft: 4,
                    marginRight: 4,
                    backgroundColor:
                      this.state.viewableItem == item.id
                        ? "#27ae60"
                        : "#7f8c8d",
                  }}
                />
              );
            })}
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 30,
              right: 30,
            }}
          >
            <Button block success onPress={() => this.setModalVisible(false)}>
              <Text>Đã hiểu</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default InfoModal;
