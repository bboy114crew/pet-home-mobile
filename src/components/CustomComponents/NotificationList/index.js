import React, { Component } from "react";
import { TouchableOpacity, FlatList, RefreshControl } from "react-native";
import {
  Left,
  Body,
  Right,
  ListItem,
  Thumbnail,
  Text,
  Icon,
} from "native-base";
import UserServices from "../../../services/UserServices";
import { connect } from "react-redux";

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loading: false,
    };
  }

  componentDidMount() {
    this._requestGetNotification();
  }

  _requestGetNotification = async () => {
    this._setLoading(true);
    try {
      const { userData } = this.props.auth;
      const result = await UserServices.getNotifications(userData._id);
      this.setState({ notifications: result.reverse() });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _setLoading = loading => {
    this.setState({ loading });
  };

  _onItemPress = item => {
    if (item.type === "post" || item.type === "post-comment" || item.type === "post-vote") {
      this.props.navigation.navigate({
        routeName: "CommentScreen",
        params: {
          postId: item.content.post._id,
          userData: this.props.auth.userData
        },
      });
      this.props.onItemPress();
    }
  };

  _renderItem = ({ item }) => {
    return (
      <ListItem thumbnail onPress={() => this._onItemPress(item)}>
        <Left>
          <Thumbnail circular source={{ uri: item.sender.avatar }} />
        </Left>
        <Body>
          <Text>{item.message}</Text>
          <Text note style={{ fontSize: 10 }}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </Body>
        <Right>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="ios-more" />
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  };

  render() {
    const { notifications } = this.state;
    return (
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._requestGetNotification}
          />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(NotificationList);
