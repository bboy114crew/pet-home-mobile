import { createStackNavigator } from "react-navigation";
import LocationDetail from "../../components/CustomComponents/LocationListTab/LocationDetail";
import SearchLocation from "../../components/CustomComponents/LocationListTab/SearchLocation";
import ProductDetail from "../../components/CustomComponents/LocationListTab/ProductDetail";
import RatingComment from "../../components/CustomComponents/LocationListTab/Rating";

const DetailRoute = createStackNavigator(
  {
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

export default DetailRoute;
