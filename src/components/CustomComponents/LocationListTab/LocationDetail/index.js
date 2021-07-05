import React, { Component } from "react";
import { View, Dimensions, FlatList, ScrollView, Platform } from "react-native";
import {
  Container,
  Header,
  Right,
  Icon,
  Button,
  Left,
  Text,
  Body,
} from "native-base";
import {
  Divider,
  Card,
  Screen,
  Image,
  Subtitle,
  Caption,
  TouchableOpacity,
  Title,
  Spinner
} from "@shoutem/ui";
import { MapCard } from "../DetailCard/index";
import { Rating } from "react-native-elements";
import LocationServices from "../../../../services/LocationServices";
import LocationReviewModal from "../../LocationReviewModal";

import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
class LocationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locationDetail: {},
      reviews: [],
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._requestGetLocationDetail();
    }
  }

  _onBack = () => {
    this.props.navigation.goBack(null);
  };

  _onPressProduct = item => {
    this.props.navigation.navigate("ProductDetail", {
      item: item,
    });
  };

  _onShowRating = locationDetail => {
    this.props.navigation.navigate("RatingComment", {
      locationDetail: locationDetail,
      _id: this.props.navigation.getParam("_id", "NO-ID"),
    });
  };

  _requestGetLocationDetail = async () => {
    const { navigation } = this.props;
    const _id = navigation.getParam("_id", "NO-ID");
    const ownerId = navigation.getParam("ownerId", "NO-ID");
    try {
      const result = await LocationServices.getLocationDetail({
        _id: _id,
        ownerId: ownerId,
      });
      const rv = await this._requestGetReview(_id);
      this.setState({
        locationDetail: result,
        loading: false,
        isFetching: false,
        reviews: rv,
      });
    } catch (error) {
      throw error;
    }
  };

  _requestGetReview = async locationId => {
    try {
      const result = await LocationServices.getReview(locationId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  _renderLocationImage = ({ item }) => (
    <TouchableOpacity
      key={item._id}
      styleName="flexible"
      onPress={this._onPress}
    >
      <Card style={styles.imageLocation}>
        <Image
          style={{
            flex: 1,
            alignSelf: "stretch",
            width: undefined,
            height: undefined,
          }}
          source={{ uri: item.secure_url }}
          borderRadius="5"
        />
      </Card>
    </TouchableOpacity>
  );

  _renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        styleName="flexible"
        onPress={() => this._onPressProduct(item)}
      >
        <Card style={styles.cardProduct}>
          <View
            style={{
              width: height / 3,
              height: height / 3 - 50,
            }}
          >
            <Image
              style={{
                flex: 1,
                alignSelf: "stretch",
                width: undefined,
                height: undefined,
              }}
              source={{ uri: item.images[0] }}
              borderRadius="5"
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
              height: 50,
            }}
          >
            <View styleName="horizontal v-center space-between">
              <Subtitle numberOfLines={1}>{item.name}</Subtitle>
            </View>
            <View styleName="horizontal v-center space-between">
              <View styleName="horizontal">
                <Caption styleName="md-gutter-right">
                  Giá: {item.price}đ
                </Caption>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    const { loading, locationDetail, reviews } = this.state;
    const { navigation } = this.props;
    const userData = navigation.getParam("userData", "NO-ID");
    const locationId = navigation.getParam("_id", "NO-ID");
    const onDirectionPress = navigation.getParam("onDirectionPress", "NO-ID");
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FCFCFC",
          }}
        >
          <Spinner />
        </View>
      );
    }
    return (
      <Container>
        <Header
          transparent
          style={{
            marginTop: 10,
            backgroundColor: "transparent",
          }}
        >
          <Left>
            <Button onPress={this._onBack} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            {/* <View style={styles.nameLocation}> */}
            <Title>{locationDetail.name}</Title>
            {/* </View> */}
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                onDirectionPress({ ...locationDetail, _id: locationId })
              }
            >
              <Icon name="ios-navigate-outline" />
            </Button>
          </Right>
        </Header>
        <LocationReviewModal
          ref={ref => (this.reviewModal = ref)}
          locationId={locationId}
          userData={userData}
          toast={this.props.toast}
        />
        <Screen style={{ backgroundColor: "#ffffff" }}>
          <ScrollView>
            {locationDetail.images.length > 0 ? (
              <FlatList
                data={locationDetail.images}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderLocationImage}
                horizontal
              />
            ) : null}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 20,
                padding: 10,
              }}
            >
              <Image
                source={require("../../../../assets/icons/name.png")}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  width: 25,
                  height: 25,
                }}
              />
              <View
                style={{
                  marginRight: 10,
                  paddingRight: 60,
                }}
              >
                <Subtitle>Tên của hàng / dịch vụ</Subtitle>
                <Caption style={{ paddingRight: 10 }}>
                  {locationDetail.name}
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 20,
                padding: 10,
              }}
            >
              <Image
                source={require("../../../../assets/icons/iconfinder_info.png")}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  width: 25,
                  height: 25,
                }}
              />
              <View
                style={{
                  marginRight: 10,
                  paddingRight: 60,
                }}
              >
                <Subtitle>Thông tin chi tiết</Subtitle>
                <Caption style={{ paddingRight: 10 }}>
                  {locationDetail.description}
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 20,
                padding: 10,
              }}
            >
              <Image
                source={require("../../../../assets/icons/iconfinder_thefreeforty_location.png")}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  width: 25,
                  height: 25,
                }}
              />
              <View
                style={{
                  marginRight: 10,
                  paddingRight: 60,
                }}
              >
                <Subtitle>Địa chỉ</Subtitle>
                <Caption style={{ paddingRight: 10 }}>
                  {locationDetail.address}
                </Caption>
                <Divider styleName="line" />
              </View>
            </View>
            <MapCard
              lat={locationDetail.coordinate.latitude}
              long={locationDetail.coordinate.longitude}
              name={locationDetail.name}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 20,
                padding: 20,
              }}
            >
              <Image
                source={require("../../../../assets/icons/iconfinder_ic_stars.png")}
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  width: 25,
                  height: 25,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                    }}
                  >
                    <Subtitle>Đánh giá</Subtitle>
                  </View>
                  {this.props.userData ? (
                    <Button
                      small
                      transparent
                      onPress={() =>
                        this.reviewModal
                          .getWrappedInstance()
                          .setModalVisible(true)
                      }
                    >
                      <Text>Viết đánh giá</Text>
                    </Button>
                  ) : null}
                </View>
                {reviews.length > 0 ? (
                  <View>
                    <Rating
                      type="star"
                      startingValue={locationDetail.systemRating}
                      imageSize={30}
                      style={{ marginTop: 10, paddingRight: 10 }}
                      readonly
                    />
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#ffffff",
                        padding: 10,
                        marginBottom: 10,
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
                          style={{ width: 36, height: 36, borderRadius: 18 }}
                          source={{
                            uri: reviews[0].reviewerId.avatar,
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              flex: 1,
                              fontWeight: "500",
                              textAlign: "right",
                              fontFamily: "OpenSans-Bold",
                            }}
                          >
                            {reviews[0].reviewerId.appName}
                          </Text>
                          <Text
                            note
                            style={{
                              fontSize: 12,
                              textAlign: "right",
                              fontFamily: "OpenSans-Light",
                            }}
                          >
                            {new Date(
                              reviews[0].createdAt
                            ).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                      <Rating
                        type="star"
                        startingValue={reviews[0].ratingStar}
                        imageSize={15}
                        readonly
                      />
                      <Text style={{ fontSize: 14, marginTop: 8 }}>
                        {reviews[0].message}
                      </Text>
                    </View>
                    <TouchableOpacity
                      styleName="flexible"
                      onPress={() => this._onShowRating(locationDetail)}
                    >
                      <Text
                        style={{
                          color: "#FF8EBC",
                          textAlign: "right",
                          fontFamily: "OpenSans-Bold",
                        }}
                      >
                        {`Xem tất cả ${reviews.length} nhận xét`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text>Chưa có đánh giá</Text>
                  </View>
                )}
              </View>
            </View>

            {locationDetail.products.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 20,
                  padding: 10,
                }}
              >
                <Image
                  source={require("../../../../assets/icons/iconfinder_price.png")}
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    width: 25,
                    height: 25,
                  }}
                />
                <View
                  style={{
                    marginRight: 10,
                    paddingRight: 60,
                  }}
                >
                  <Subtitle>Sản phẩm, dịch vụ</Subtitle>
                </View>
              </View>
            ) : null}
            {locationDetail.products.length > 0 ? (
              <FlatList
                data={locationDetail.products}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderProduct}
                horizontal
                style={{ marginBottom: 20 }}
              />
            ) : null}
          </ScrollView>
        </Screen>
      </Container>
    );
  }
}

const styles = {
  imageLocation: {
    width: width,
    height: height/3,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: "#FCFCFC",
  },
  cardProduct: {
    width: height / 3,
    height: height / 3,
    marginTop: 10,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: "#FCFCFC",
  },
  nameLocation: {
    alignItems: "center",
    justifyContent: "center",
  },
};

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps)(LocationDetail);
