import { createStackNavigator } from "react-navigation";
import LocationHome from "../../containers/LocationHome";
import LocationDetail from "../../components/CustomComponents/LocationListTab/LocationDetail";
import SearchLocation from "../../components/CustomComponents/LocationListTab/SearchLocation";
import ProductDetail from "../../components/CustomComponents/LocationListTab/ProductDetail";
import RatingComment from "../../components/CustomComponents/LocationListTab/Rating";
import LocationMapTab from "../../components/CustomComponents/LocationMapTab";
import LocationListTab from "../../components/CustomComponents/LocationListTab";

const LocationRoute = createStackNavigator(
  {
    LocationHome: {
      screen: LocationHome,
    },
    LocationDetail: {
      screen: LocationDetail,
    },
    SearchLocation: {
      screen: SearchLocation,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
    RatingComment: {
      screen: RatingComment,
    },
    LocationMapTab: {
      screen: LocationMapTab,
    },
    LocationListTab: {
      screen: LocationListTab,
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

export default LocationRoute;
