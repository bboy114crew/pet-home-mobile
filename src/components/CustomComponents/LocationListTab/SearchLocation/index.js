import React, { Component } from 'react';
import { View, TextInput, Dimensions, Platform } from 'react-native';
import { Container, Header, Icon, Button, Spinner } from 'native-base';
import { Text, Screen, Image, TouchableOpacity } from '@shoutem/ui';
import LocationList from '../LocationList';
import FilterModal from '../FilterModal';
import LocationServices from "../../../../services/LocationServices";
import { Constants } from "expo";

const { width, height } = Dimensions.get('window');
class SearchLocation extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const textSearch = navigation.getParam('textSearch', 'NO-ID');
    this.state = {
      textSearch: textSearch,
      loading: true,
      loadingCategory: true,
      listLocations: [],
      lat: '',
      long: '',
      radius: '',
      ratingGt: '',
      ratingLt: '',
      typeIdArray: [],
      listLocationCategories: '',
    };
  }

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      if(this.state.textSearch === ''){
        this._requestGetAllLocation();
      } else {
        this._requestGetLocation();
      }
    }
  }

  _requestGetLocation = async () => {
    try {
      const result = await LocationServices.searchLocation({
        textSearch: this.state.textSearch,
        lat: this.state.lat,
        long: this.state.long,
        radius: this.state.radius,
        ratingGt: this.state.ratingGt,
        ratingLt: this.state.ratingLt,
        typeIdArray: this.state.typeIdArray       
      });
      this.setState({ listLocations: result, loading: false });
    } catch (error) {
      throw error;
    }
  };

  _requestGetAllLocation = async () => {
    try {
      const result = await LocationServices.searchAllLocation();
      this.setState({ listLocations: result, loading: false });
    } catch (error) {
      throw error;
    }
  };

  _onChangeText = text => {
    this.setState({textSearch: text});
  };

  _onBlur = () => {
    this.setState({showCancel: !this.state.showCancel});
  }

  _onFocus = () => {
    this.setState({showCancel: !this.state.showCancel});
  }

  _onSearch = () => {
    this._requestGetLocation();
  }
  
  _onBack = () => {
    this.props.navigation.goBack(null);
  }

  _requestGetLocationWithFilter = async (selectedStar, selectedAll) => { 
    try {
      const result = await LocationServices.searchLocation({
        textSearch: this.state.textSearch,
        lat: this.state.lat,
        long: this.state.long,
        radius: this.state.radius,
        ratingGt: selectedStar,
        ratingLt: selectedStar + 1,
        typeIdArray: selectedAll       
      });
      this.setState({ listLocations: result, loading: false });
    } catch (error) {
      throw error;
    }
  };

  _onPressFilter = (selectedStar, selectedAll) => {
    this._requestGetLocationWithFilter(selectedStar, selectedAll);
  }

  render() {
    console.disableYellowBox = true; 
    const { loading, listLocations, loadingCategory, listPrivateCategories, listPublicCategories } = this.state;
    if (loading && loadingCategory) {
      return (
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <Spinner color="#615c70" />
        </View>
      );
    }
    return (
      <Container>
        <Screen style={{backgroundColor: '#FCFCFC'}}>
          <Header
            transparent
            style={{
              marginTop: 10,
            }}
          >              
            <View  
              style={{
                flex: 1,
                flexDirection: 'row'
              }}>
              <View
                style={styles.searchBar}
              >
                <Button 
                  onPress={this._onBack}
                  transparent        
                  >
                  <Icon name='arrow-back' style={{marginLeft: 0, marginRight: 10}}/>
                </Button>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    placeholder="Tìm kiếm địa điểm"
                    clearButtonMode={"while-editing"}
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    style={{
                      borderBottomWidth: 0,
                      flex: 1,
                      fontFamily:"OpenSans-Bold"                   
                    }}
                    returnKeyLabel="Tìm"
                    returnKeyType="search"
                    onSubmitEditing={this._onSearch}
                    onChangeText={this._onChangeText}
                    onBlur={this._onBlur}
                    onFocus={this._onFocus}
                    value={this.state.textSearch}
                  />
                </View>
              </View>
            </View> 
          </Header>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {this.filterModal.setVisibleModal(true)}}
            style={styles.item} 
          >
            <Text style={styles.text}>
              Bộ lọc
            </Text>
          </TouchableOpacity>
          {listLocations.length === 0 ? 
          <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
            <Image
              styleName="medium-square"
              source={require("../../../../assets/icons/find-icon.png")}
            />
            <Text style={{
              marginTop: 10,
              fontWeight: "bold"
            }}> Không có kết quả nào </Text>
          </View> : 
          <LocationList data={this.state.listLocations} navigation={this.props.navigation}/> }
        </Screen>
        <FilterModal 
          onPressFilter={(selectedStar, selectedAll) => this._onPressFilter(selectedStar, selectedAll)} 
          ref={ref => (this.filterModal = ref)} />       
      </Container>
    );
  }
}

const styles = {
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white',
    marginLeft: 2,
    borderRadius: 5,
    shadowColor: "#CACACA",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  emptyResult: {
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    height: 40,
    width: 60,
    borderRadius: 5,
    margin: 10,
    marginTop: 16,
    marginLeft: 6,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    borderColor: '#DADADA',
    borderWidth: 0.5,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
    marginBottom: 6,
    color: "#615c70",
  },
};

export default SearchLocation;