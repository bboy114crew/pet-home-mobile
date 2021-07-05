import React, { Component } from "react";
import {
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import LikeNumber from "./LikeNumber";
import PetServices from "../../../../services/PetServices";
import ListPopup from "./ListPopup";
import MessageServices from "../../../../services/MessageServices";

const SCREEN_WIDTH = Dimensions.get("window").width;

class AnimatedOptionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isLiked: false,
    };
  }

  componentDidMount() {
    this._requestIsLiked();
  }

  _requestLike = async () => {
    this._setLoading(true);
    try {
      const { item, userData } = this.props;
      await PetServices.like(item._id, userData._id);
      await this._requestIsLiked();
      await this.likeNumber._requestGetLikeNumber();
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _requestIgnore = async () => {
    try {
      const { item, userData } = this.props;
      await PetServices.ignore(item._id, userData._id);
      this.props.onIgnore(item);
    } catch (error) {
      throw error;
    }
  };

  _requestIsLiked = async () => {
    this._setLoading(true);
    try {
      const { item, userData } = this.props;
      const userId = await PetServices.isLiked(item._id, userData._id);
      this.setState({ isLiked: userId === userData._id });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _setLoading = loading => {
    this.setState({ loading });
  };

  render() {
    const { index, animatedValue, item, viewableItem } = this.props;

    const animateScale = animatedValue.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      outputRange: [0.1, 1, 0.1],
    });

    return (
      <Animated.View
        style={{
          overflow: "visible",
          width: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          transform: [
            {
              scale: animateScale,
            },
          ],
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => this.props.onReload()}
        >
          <Image
            source={require("../../../../assets/icons/ic_reload.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={this._requestIgnore}
        >
          <Image
            source={require("../../../../assets/icons/ic_delete.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          disabled={this.state.loading}
          onPress={this._requestLike}
        >
          <LikeNumber item={item} ref={ref => (this.likeNumber = ref)} />
          <Image
            source={
              !!this.state.isLiked
                ? require("../../../../assets/icons/ic_liked.png")
                : require("../../../../assets/icons/ic_like.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => this.listPopup.show()}
        >
          {viewableItem === index ? (
            <ListPopup
              userData={this.props.userData}
              item={item}
              ref={ref => (this.listPopup = ref)}
              toast={this.props.toast}
            />
          ) : null}
          <Image
            source={require("../../../../assets/icons/ic_heart.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={async () => {
            try {
              const users = [
                {
                  user: this.props.userData._id,
                },
                {
                  user: item.ownerId._id,
                },
              ];
              const data = await MessageServices.createConversation(users);
              this.props.onChatPress(data);
            } catch (error) {
              throw error;
            }
          }}
        >
          <Image
            source={require("../../../../assets/icons/ic_talk.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    overflow: "visible",
    backgroundColor: "#FFF",
  },
  icon: {
    resizeMode: "cover",
    width: 18,
    height: 18,
  },
});

export default AnimatedOptionBar;
