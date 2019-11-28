import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Font, AppLoading, DangerZone } from "expo";
import DrawerRoute from "./src/routes/DrawerRoute";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./src/redux/configStore";
import Toast from "./src/components/CustomComponents/Toast";
import AppSpinner from "./src/components/CustomComponents/AppSpinner";
import NotificationHandle from "./src/components/CustomComponents/NotificationHandle";
import SocketHandle from "./src/components/CustomComponents/SocketHandle";

let { Lottie } = DangerZone;

const { persistor, store } = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, renderApp: false };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      "Rubik-Black": require("./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
      "Rubik-BlackItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
      "Rubik-Bold": require("./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
      "Rubik-BoldItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
      "Rubik-Italic": require("./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
      "Rubik-Light": require("./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
      "Rubik-LightItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
      "Rubik-Medium": require("./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
      "Rubik-MediumItalic": require("./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
      "Rubik-Regular": require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf"),
      "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
      OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
      "OpenSans-Bold": require("./assets/fonts/OpenSans-Semibold.ttf"),
    });
    this.setState({ loading: false });
  }

  _splash = () => {
    setTimeout(() => {
      // this.animation.reset();
      // this.animation.play();
    }, 10);
    setTimeout(() => {
      this.setState({
        renderApp: true,
      });
    }, 3000);
  };

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    if (this.state.renderApp === false) {
      this._splash();
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
            }}
          >
            {/* <Lottie
              source={require("./src/assets/icons/dino_dance.json")}
              style={{ width: 300, height: 300 }}
              ref={ref => (this.animation = ref)}
              autoPlay={true}
              loop={true}
            /> */}
            <Image
              source={require("./src/assets/icons/logo.gif")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
      );
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <DrawerRoute />
            <Toast />
            <AppSpinner />
            <NotificationHandle />
            <SocketHandle />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
