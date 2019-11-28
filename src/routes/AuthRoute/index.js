import { createStackNavigator } from "react-navigation";
import Login from "../../containers/Login";
import Register from "../../containers/Register";
import ForgetPassword from "../../containers/ForgetPassword";

const AuthRoute = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Đăng nhập",
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: "Đăng ký",
      },
    },
    ForgetPassword: {
      screen: ForgetPassword,
      navigationOptions: {
        title: "Quên mật khẩu",
      },
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

export default AuthRoute;
