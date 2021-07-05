import React, { Component } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { Container } from "native-base";

import TabBar from "./TabBar";
import LocationListTab from "../CustomComponents/LocationListTab";
import LocationMapTab from "../CustomComponents/LocationMapTab";
import TabContainer from "./TabContainer";

import { locationData } from "../../utils/fakeData";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SCREENS = [
  {
    index: 0,
    screen: "LIST",
  },
  {
    index: 1,
    screen: "MAP",
  },
  {
    index: 2,
    screen: "SAVED",
  },
];

export default class extends Component {
  state = {
    tabIndex: 0,
    renderTab: true,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { tabIndex } = this.state;
    if (tabIndex === nextState.tabIndex) {
      return false;
    }
    return true;
  }

  _showTabBar = show => {
    if (!this.tabBar) return;

    if (!show) {
      this.tabBar.animateHide();
    } else {
      this.tabBar.animateShow();
    }
  };

  _onTabPress = index => {
    this.setState({ tabIndex: index });
    this.tabs.scrollTo({
      x: index * SCREEN_WIDTH,
      y: 0,
      animated: true,
    });
  };

  _onDirectionPress = locationItem => {
    this.setState({ renderTab: false });
    this.props.navigation.navigate({
      routeName: "LocationMapTab",
      params: {
        type: "navigation",
        locationItem,
        onNavigationBackPress: () => {
          this.setState({ renderTab: true });
        },
        onDirectionPress: this._onDirectionPress,
      },
      key: "locationMapTab" + locationItem._id
    });
  };

  _renderTab = () => {
    return SCREENS.map(value => {
      if (value.screen === "LIST") {
        return (
          <TabContainer key={value.index}>
            <LocationListTab
              navigation={this.props.navigation}
              userData={this.props.userData}
              toast={this.props.toast}
              onDirectionPress={this._onDirectionPress}
            />
          </TabContainer>
        );
      }
      if (value.screen === "MAP") {
        return (
          <TabContainer key={value.index}>
            <LocationMapTab
              onDirectionPress={this._onDirectionPress}
              showTabBar={this._showTabBar}
              locationData={locationData}
              navigation={this.props.navigation}
              userData={this.props.userData}
              toast={this.props.toast}
              ref={ref => (this.locationMapTab = ref)}
            />
          </TabContainer>
        );
      }
      if (value.screen === "SAVED") {
        return (
          <TabContainer key={value.index}>
            <View
              style={{
                flex: 1,
                backgroundColor: "blue",
              }}
            />
          </TabContainer>
        );
      }
    });
  };

  render() {
    return (
      <Container>
        <ScrollView
          ref={ref => (this.tabs = ref)}
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          bounces={false}
          scrollEnabled={false}
        >
          {this._renderTab()}
        </ScrollView>
        {this.state.renderTab === true ? (
          <TabBar
            ref={ref => (this.tabBar = ref)}
            onTabPress={this._onTabPress}
            tabIndex={this.state.tabIndex}
          />
        ) : null}
      </Container>
    );
  }
}
