import { createStackNavigator } from "react-navigation";
import PetHome from "../../containers/Pet";

const PetRoute = createStackNavigator(
  {
    PetHome: {
      screen: PetHome,
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

export default PetRoute;
