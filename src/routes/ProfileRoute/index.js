import { createStackNavigator } from "react-navigation";
import Profile from "../../containers/Profile";

const ProfileRoute = createStackNavigator(
  {
    ProfileHome: {
      screen: Profile,
    },
  },
  {
    navigationOptions: {
      header: null,
      headerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        color: "#EC466A",
        textAlign: "center",
        flexGrow: 1,
        alignSelf: "center",
      },
    },
  }
);

export default ProfileRoute;
