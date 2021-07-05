import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import { Icon } from "native-base";
import HomeTab from "../../containers/Home";
import SearchPost from "../../containers/SearchPost";
import AddPost from "../../containers/AddPost";

const HomeTabRoute = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTab,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home-outline" style={{ color: tintColor }} />
        ),
      }),
    },
    Add: {
      screen: AddPost,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-add-circle-outline" style={{ color: tintColor }} />
        ),
      }),
    },
    Search: {
      screen: SearchPost,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-search" style={{ color: tintColor }} />
        ),
      }),
    },
    
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#EC466A",
    },
  }
);

const HomeRoute = createStackNavigator(
  {
    Home: HomeTabRoute,
  },
  {
    initialRouteName: "Home",
    navigationOptions: () => ({
      header: null,
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTitle: "Home",
      headerTitleStyle: {
        color: "#000",
        textAlign: "center",
        flexGrow: 1,
        alignSelf: "center",
      },
    }),
  }
);

export default HomeRoute;
