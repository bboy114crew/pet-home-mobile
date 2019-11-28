import React, { Component } from "react";
import { View, FlatList, Dimensions, Animated } from "react-native";
import { Text, Icon } from "native-base";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedOptionBar from "./AnimatedOptionBar";
import AnimatedPetImage from "./AnimatedPetImage";
import PetServices from "../../../../services/PetServices";

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const animatedValue = new Animated.Value(0);

class PetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPet: [],
      viewableItem: 0,
    };
  }

  componentDidMount() {
    this._requestGetPet();
  }

  _requestGetPet = async () => {
    try {
      const { userData } = this.props;
      const result = await PetServices.getPet(userData._id);
      this.setState({ listPet: result });
    } catch (error) {
      throw error;
    }
  };

  _removeItem = item => {
    const tmp = this.state.listPet.filter(pet => pet._id !== item._id);
    this.setState({ listPet: tmp });
  };

  _onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length === 1) {
      this.setState({ viewableItem: viewableItems[0].index });
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: "100%",
          backgroundColor: "#2A2E40",
        }}
      >
        <AnimatedTitle
          animatedValue={animatedValue}
          item={item}
          index={index}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              marginBottom: 10,
              marginTop: 10,
              fontSize: 16,
            }}
          >
            {item.description}
          </Text>
          <AnimatedPetImage
            animatedValue={animatedValue}
            item={item}
            index={index}
          />
          <View
            style={{
              height: SCREEN_HEIGHT / 5.5,
              width: "100%",
              overflow: "visible",
            }}
          >
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                width: SCREEN_WIDTH,
              }}
            >
              <AnimatedOptionBar
                animatedValue={animatedValue}
                item={item}
                userData={this.props.userData}
                index={index}
                onIgnore={this._removeItem}
                onReload={this._requestGetPet}
                viewableItem={this.state.viewableItem}
                onChatPress={this.props.onChatPress}
                toast={this.props.toast}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flex: 1,
                backgroundColor: "#50576E",
              }}
            >
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 40,
                }}
              >
                <Text>
                  <Text style={{ fontWeight: "bold", color: "#FFF" }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: "#FFF",
                    }}
                  >
                    {`: loài ${item.breed}, giới tính ${item.gender}, giống ${
                      item.branch
                    }, ${item.age} tuổi `}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { listPet } = this.state;
    return (
      <AnimatedList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animatedValue,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        horizontal
        data={listPet}
        keyExtractor={item => item._id}
        pagingEnabled
        renderItem={this._renderItem}
        onViewableItemsChanged={this._onViewableItemsChanged}
      />
    );
  }
}

export default PetList;
