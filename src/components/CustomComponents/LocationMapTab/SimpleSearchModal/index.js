import React, { Component } from "react";
import { View, Modal, TextInput } from "react-native";
import { Header, Icon, Button, Container, Content } from "native-base";

import LocationList from "./LocationList";
import GoogleMap from "../../../../services/GoogleMap";
import LocationServices from "../../../../services/LocationServices";
import FilterModal from "../../LocationListTab/FilterModal";

class SimpleSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      textSearch: "",
      locationData: [],
    };
    this.textSearch = "";
    this.lat = "";
    this.long = "";
    this.radius = 100000000000;
    this.ratingGt = "";                                                                                              
    this.ratingLt = "";
    this.typeIdArray = [];
  }

  componentDidMount() {}

  setModalVisible = (visible, searchType) => {
    this.searchType = searchType;
    if (visible) {
      this.setState(
        {
          modalVisible: visible,
          locationData: searchType === "start" ? [] : this.locationData,
        },
        () => {
          if (searchType === "destination") {
            const { userLocation } = this.props;
            this._requestSearchLocation(
              "",
              userLocation.latitude,
              userLocation.longitude
            );
          }
          this.LocationList.show(searchType);
        }
      );
    } else {
      this.setState({
        modalVisible: visible,
      });
    }
  };

  // _requestGetLocationList = async () => {
  //   try {
  //     const result = await LocationServices.getSuggestLocation();
  //     this.locationData = result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  _onSearchQueryChange = text => {
    this.textSearch = text;
    if (this.searchWaiting) {
      clearTimeout(this.searchWaiting);
    }
    this.searchWaiting = setTimeout(() => {
      this.searchWaiting = null;
      const { userLocation } = this.props;
      if (this.searchType === "start") {
        this._searchStartLocation(text, userLocation);
      }
      if (this.searchType === "destination") {
        this._searchDestinationLocation(text, userLocation);
      }
    }, 200);
  };

  _searchStartLocation = async (text, nearby) => {
    const results = await GoogleMap.searchLocation(text, nearby);
    if (results) {
      this.setState({
        locationData: results,
      });
    }
  };

  _onPressFilter = (selectedStar, selectedAll) => {
    const { userLocation } = this.props;
    this.lat = userLocation.latitude;
    this.long = userLocation.longitude;
    this.ratingGt = selectedStar;
    this.ratingLt = selectedStar + 1;
    this.typeIdArray = selectedAll;
    this._requestSearchLocation(this.textSearch, this.lat, this.long);
  };

  _requestSearchLocation = async (text, lat, long) => {
    try {
      const result = await LocationServices.searchLocation({
        textSearch: text,
        lat,
        long,
        radius: this.radius,
        ratingGt: this.ratingGt,
        ratingLt: this.ratingLt,
        typeIdArray: this.typeIdArray,
      });
      this.setState({ locationData: result });
    } catch (error) {
      throw error;
    }
  };

  _searchDestinationLocation = (text, nearby) => {
    console.log("destination: ", text, nearby);
    this._requestSearchLocation(text, nearby.latitude, nearby.longitude);
  };

  _onSelectLocation = (location, searchType) => {
    const { onLocationChange } = this.props;
    if (onLocationChange) {
      onLocationChange(location, searchType);
    }
    this.setModalVisible(false);
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType="fade"
      >
        <Container>
          <Header
            transparent
            style={{
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#B5B5B5",
                borderRadius: 5,
              }}
            >
              <Button
                transparent
                iconRight
                onPress={() => this.setModalVisible(false)}
              >
                <Icon
                  name="ios-arrow-back-outline"
                  style={{ color: "#EC466A" }}
                />
              </Button>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Tìm kiếm"
                  underlineColorAndroid="transparent"
                  numberOfLines={1}
                  style={{
                    borderBottomWidth: 0,
                  }}
                  onChangeText={this._onSearchQueryChange}
                  clearButtonMode="while-editing"
                />
              </View>
              <Button
                transparent
                iconLeft
                onPress={() => this.filterModal.setVisibleModal(true)}
              >
                <Icon name="md-options" style={{ color: "#EC466A" }} />
              </Button>
            </View>
          </Header>
          <Content>
            <LocationList
              ref={ref => (this.LocationList = ref)}
              locationData={this.state.locationData}
              onItemPress={this._onSelectLocation}
            />
          </Content>
        </Container>
        <FilterModal
          ref={ref => (this.filterModal = ref)}
          onPressFilter={(selectedStar, selectedAll) =>
            this._onPressFilter(selectedStar, selectedAll)
          }
        />
      </Modal>
    );
  }
}

export default SimpleSearchModal;
