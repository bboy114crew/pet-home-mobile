import React, { Component } from "react";
import {
  View,
  Modal,
  FlatList,
  Dimensions,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { Container, Content, Button, Icon, Title, Text } from "native-base";
import RatingBar from "../../RatingBar";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const animatedValue = new Animated.Value(0);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

class LocationDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      locationItem: null,
    };
  }

  setModalVisible = (visible, locationItem) => {
    this.setState({
      modalVisible: visible,
      locationItem: locationItem,
    });
  };

  _renderImageItem = ({ item }) => {
    return (
      <View
        style={{
          width: SCREEN_HEIGHT / 2.5,
          height: SCREEN_HEIGHT / 2.5,
          backgroundColor: "#CECECE",
          borderWidth: 5,
          borderColor: "#FFFFFF",
        }}
      >
        <Image
          source={{ uri: item.secure_url }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      </View>
    );
  };

  render() {
    const { locationItem } = this.state;
    const headerOpacity = animatedValue.interpolate({
      inputRange: [0, SCREEN_HEIGHT / 2.5 - 54, SCREEN_HEIGHT / 2.5],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    const desOpaticty = animatedValue.interpolate({
      inputRange: [0, SCREEN_HEIGHT / 2.5 - 54, SCREEN_HEIGHT / 2.5 + 10],
      outputRange: [1, 0.3, 0],
      extrapolate: "clamp",
    });

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
      >
        {locationItem ? (
          <Container>
            <View
              style={{
                height: 74,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                zIndex: 1,
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 74,
                  backgroundColor: "#FFFFFF",
                  opacity: headerOpacity,
                }}
              />
              <View
                style={{
                  marginTop: 20,
                  height: 54,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <Button
                    transparent
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Icon
                      name="md-close"
                      style={{ color: "#EC466A", fontSize: 26 }}
                    />
                  </Button>
                </View>
                <Animated.View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: headerOpacity,
                  }}
                >
                  <Title style={{ color: "#EC466A" }}>
                    {locationItem.name}
                  </Title>
                </Animated.View>
                <View>
                  <Button transparent>
                    <Icon
                      name="md-more"
                      style={{ color: "#EC466A", fontSize: 26 }}
                    />
                  </Button>
                </View>
              </View>
            </View>
            <AnimatedScrollView
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: animatedValue,
                      },
                    },
                  },
                ],
                {
                  useNativeDriver: true,
                }
              )}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={locationItem.images}
                extraData={item => item.public_id + ""}
                renderItem={this._renderImageItem}
              />
              <View
                style={{
                  margin: 10,
                  flexWrap: "wrap",
                }}
              >
                <Animated.View
                  style={{
                    opacity: desOpaticty,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                    }}
                  >
                    {locationItem.name}
                  </Text>
                  <Text note style={{ fontSize: 14, marginBottom: 4 }}>
                    
                  </Text>
                  <Text style={{ fontSize: 14 }}>
                    {locationItem.description}
                  </Text>
                </Animated.View>
                <View
                  style={{
                    height: 0.5,
                    marginBottom: 20,
                    marginTop: 10,
                    backgroundColor: "#CECECE",
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", flex: 1 }}>Đánh giá</Text>
                  <Button iconRight transparent>
                    <Text style={{ color: "#00cc99" }}>Viết đánh giá</Text>
                    <Icon
                      name="ios-create-outline"
                      style={{ color: "#00cc99" }}
                    />
                  </Button>
                </View>

                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                >
                  <RatingBar
                    size={SCREEN_WIDTH / 5 - 45}
                    rating={3}
                    space={10}
                    disabled={false}
                  />
                </View>
                {renderComment()}
                {renderComment()}
                {renderComment()}
              </View>
            </AnimatedScrollView>
          </Container>
        ) : null}
      </Modal>
    );
  }
}

const renderComment = () => {
  return (
    <View
      style={{
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text style={{ flex: 1, fontWeight: "500" }}>Td Chien</Text>
        <Text note style={{ fontSize: 12, textAlign: "right" }}>
          11/11/2018
        </Text>
      </View>
      <View
        style={{
          marginBottom: 4,
          marginTop: 4,
        }}
      >
        <RatingBar size={10} rating={4} space={4} disabled={true} />
      </View>
      <Text style={{ fontSize: 14 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
    </View>
  );
};

export default LocationDetailModal;
