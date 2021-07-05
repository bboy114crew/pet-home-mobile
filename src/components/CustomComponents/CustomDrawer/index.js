import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Alert } from "react-native";
import { Icon } from "native-base";
import CustomTouchable from "../CustomTouchable";
import ActivityModal from "../ActivityModal";

import { connect } from "react-redux";
import { logout } from "../../../redux/actions/AuthActions";
import { setLoading } from "../../../redux/actions/UIActions";
import UserServices from "../../../services/UserServices";
import { Notifications } from "expo";

import {
  pushNotification,
  clearNotification,
} from "../../../redux/actions/NotificationActions";

import NoticeIcon from "./NoticeIcon";

class CustomDrawer extends Component {
  _onPressProfile = () => {
    this.props.navigation.navigate("ProfileRoute");
  };

  _onPressLogout = () => {
    Alert.alert(
      "Đăng xuất",
      undefined,
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            const { userData } = this.props.auth;
            this.props.setLoading(true);
            try {
              await UserServices.removeToken(userData._id);
              this.props.logout();
              this.props.navigation.navigate("HomeRoute");
            } catch (error) {
              throw error;
            }
            this.props.setLoading(false);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    const { userData } = this.props.auth;
    const { notification } = this.props;
    return (
      <View style={styles.container}>
        <CustomTouchable
          loginRequired={true}
          onCustomPress={this._onPressProfile}
          activeOpacity={0.7}
          style={styles.profile}
        >
          <Icon name="ios-contact-outline" style={styles.icon} />
        </CustomTouchable>
        <View style={styles.body}>
          <CustomTouchable
            loginRequired={false}
            style={styles.buttonBody}
            onCustomPress={() => {
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate("Home");
            }}
          >
            <Icon name="ios-home-outline" style={styles.iconBody} />
          </CustomTouchable>
          <CustomTouchable
            loginRequired={false}
            style={styles.buttonBody}
            onCustomPress={() => {
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate("LocationHome");
            }}
          >
            <Icon name="ios-map-outline" style={styles.iconBody} />
          </CustomTouchable>
          <CustomTouchable
            loginRequired={true}
            style={styles.buttonBody}
            onCustomPress={() => {
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate("PetRoute");
            }}
          >
            <Icon name="ios-paw-outline" style={styles.iconBody} />
          </CustomTouchable>
          <NoticeIcon
            name="ios-notifications-outline"
            notification={notification.some(
              item =>
                item.type === "post" ||
                item.type === "post-comment" ||
                item.type === "post-vote"
            )}
            onPress={() => {
              this.props.clearNotification();
              this.props.navigation.closeDrawer();
              this.activityModal.setVisible(true, 0);
            }}
          />
          <NoticeIcon
            name="ios-chatbubbles-outline"
            notification={notification.some(item => item.type === "message")}
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.activityModal.setVisible(true, 1);
            }}
          />
        </View>
        <View style={styles.under}>
          {userData ? (
            <CustomTouchable
              loginRequired={false}
              style={styles.buttonBody}
              onPress={this._onPressLogout}
            >
              <Icon name="md-log-out" style={styles.icon} />
            </CustomTouchable>
          ) : null}
        </View>
        <ActivityModal
          ref={ref => {
            this.activityModal = ref;
          }}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width / 3.5,
    backgroundColor: "#FFF",
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  icon: {
    color: "#B5B5B5",
  },
  body: {
    flex: 4,
    alignItems: "center",
  },
  buttonBody: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconBody: {
    color: "#B5B5B5",
    marginBottom: 10,
    marginTop: 10,
  },
  under: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    notification: state.notification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    },
    setLoading: loading => {
      dispatch(setLoading(loading));
    },
    clearNotification: () => {
      dispatch(clearNotification());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer);
