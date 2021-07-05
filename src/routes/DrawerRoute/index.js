import {
  createDrawerNavigator,
  createStackNavigator,
} from "react-navigation";
import { Dimensions } from "react-native";

import HomeRoute from "../HomeRoute";
import LocationRoute from "../LocationRoute";
import CustomDrawer from "../../components/CustomComponents/CustomDrawer";
import ProfileRoute from "../ProfileRoute";
import PetRoute from "../PetRoute";
import CommentScreen from "../../containers/Comment";

const stackApp = createStackNavigator(
  {
    HomeRoute: {
      screen: HomeRoute,
    },
    LocationRoute: {
      screen: LocationRoute,
    },
    ProfileRoute: {
      screen: ProfileRoute,
    },
    PetRoute: {
      screen: PetRoute,
    },
    CommentScreen: {
      screen: CommentScreen,
    },
  },
  {
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

const DrawerRoute = createDrawerNavigator(
  {
    StackApp: {
      screen: stackApp,
    },
  },
  {
    contentComponent: CustomDrawer,
    style: {
      backgroundColor: "transparent",
    },
    drawerWidth: Dimensions.get("screen").width / 3.5,
    drawerBackgroundColor: "transparent",
    initialRouteName: "StackApp",
  }
);

export default DrawerRoute;
