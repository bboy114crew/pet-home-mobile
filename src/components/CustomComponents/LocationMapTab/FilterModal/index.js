import React, { Component } from "react";
import {
  View,
  Modal,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from "react-native";
import {
  Header,
  Icon,
  Button,
  Container,
  Content,
  Text,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Title,
  Footer,
} from "native-base";
import { locationData, markerType } from "../../../../utils/fakeData";

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
    };
  }

  setVisibleModal = visible => {
    // console.log(visible);
    this.setState({
      visibleModal: visible,
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.visibleModal}
        transparent={false}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}
        >
          <Header transparent>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1 }}>
              <Title style={{ color: "#EC466A" }}>Tùy chọn</Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent >
                <Text>Xóa</Text>
              </Button>
            </Right>
          </Header>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <Text>Đánh giá</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  borderColor: '#C5C5C5',
                  borderRadius: 5
                }}
              >
                <Text>
                  <Text style={{fontSize: 18}} >2 </Text>
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  borderColor: '#C5C5C5',
                  borderRadius: 5
                }}
              >
                <Text>
                  <Text style={{fontSize: 18}} >3 </Text>
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 0.5,
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  borderColor: '#C5C5C5',
                  borderRadius: 5
                }}
              >
                <Text>
                  <Text style={{fontSize: 18}} >4 </Text>
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                  <Icon name="md-star" style={{color: "#FDD84B", fontSize: 16}} />
                </Text>
              </TouchableOpacity>
            </View>
            <Text>Loại địa điểm</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.setVisibleModal(false)}
              style={{
                backgroundColor: "#E12F3B",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
            >
              <Text style={{ color: "#FFF" }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "#00B24E",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
            >
              <Text style={{ color: "#FFF" }}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default FilterModal;
