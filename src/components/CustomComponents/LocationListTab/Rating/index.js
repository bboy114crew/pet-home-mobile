import React, { Component } from "react";
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import { Container, Header, Right, Icon, Button, Left } from "native-base";
import { Divider, Screen, Image, TouchableOpacity, Title } from "@shoutem/ui";
import { Rating } from "react-native-elements";
import LocationServices from "../../../../services/LocationServices";
const { width, height } = Dimensions.get("window");

export default class RatingComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      commentList: [],
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._requestGetCommentRating();
    }
  }

  _onBack = () => {
    this.props.navigation.goBack(null);
  };

  _requestGetCommentRating = async () => {
    try {
      const id = this.props.navigation.getParam("_id", "NO-ID");
      const result = await LocationServices.getReview(id);
      this.setState({ commentList: result });
    } catch (error) {
      throw error;
    }
  };

  _onWriteComment = data => {
    console.log(data);
  };

  _renderComment = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FCFCFC",
          padding: 10,
          marginTop: 6,
          marginRight: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: item.reviewerId.avatar,
            }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                flex: 1,
                fontWeight: "500",
                fontFamily: "OpenSans-Bold",
              }}
            >
              {item.reviewerId.appName}
            </Text>
            <Text note style={{ fontSize: 12, fontFamily: "OpenSans-Light" }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Rating
          type="star"
          startingValue={item.ratingStar}
          imageSize={15}
          readonly
          style={{
            marginTop: 8,
          }}
        />
        <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 12 }}>
          {item.message}
        </Text>
        <Divider styleName="line" />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const locationDetail = navigation.getParam("locationDetail", "NO-ID");
    const { name, systemRating } = locationDetail;
    return (
      <Container>
        <Header
          transparent
          style={{
            marginTop: 10,
            marginLeft: 5,
          }}
        >
          <Left>
            <Button onPress={this._onBack} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <View style={styles.nameLocation}>
            <Title>{name}</Title>
          </View>
          <Right />
        </Header>
        <Screen style={{ backgroundColor: "#FCFCFC" }}>
          <ScrollView style={{ marginLeft: 10 }}>
            <View
              style={{
                height: 90,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 30,
                    marginTop: 10,
                    marginBottom: 4,
                    marginLeft: 10,
                    height: 90,
                  }}
                >
                  {"Đánh giá"}
                </Text>
                {/* <TouchableOpacity
                  styleName="flexible"
                  onPress={() => this._onWriteComment("jsjs")}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontFamily: "OpenSans-Bold",
                      marginRight: 10,
                      marginTop: 20,
                      // alignItems: 'center'
                    }}
                  >
                    Viết đánh giá
                  </Text>
                </TouchableOpacity> */}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Rating
                  type="star"
                  startingValue={systemRating}
                  imageSize={30}
                  style={{
                    marginTop: 10,
                    paddingRight: 10,
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                  readonly
                />
                <Text
                  style={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: 13,
                    marginLeft: 2,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  {`${this.state.commentList.length} Đánh giá`}
                </Text>
              </View>
            </View>
            {this.state.commentList.length > 0 ? (
              <FlatList
                data={this.state.commentList}
                keyExtractor={(item, index) => item._id}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderComment}
                style={{ marginBottom: 20, flex: 1, marginTop: 10 }}
              />
            ) : null}
          </ScrollView>
        </Screen>
      </Container>
    );
  }
}

const styles = {
  nameLocation: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
};
