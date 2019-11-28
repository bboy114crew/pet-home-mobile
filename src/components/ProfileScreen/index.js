import React from "react";
import {
  View,
  FlatList,
  Animated,
  RefreshControl,
  ActionSheetIOS,
  Alert,
  AlertIOS,
  TouchableOpacity,
} from "react-native";
import { Container, List, ListItem, Button, Text } from "native-base";
import PostItem from "../CustomComponents/PostList/PostItem";
import AnimatedHeader from "./AnimatedHeader";
import PostOptionModal from "../CustomComponents/PostOptionModal";
import EditPostModal from "../CustomComponents/EditPostModal";

import PostServices from "../../services/PostServices";
import AnimatedOptionBar from "./AnimatedHeader/AnimatedOptionBar";

const animatedValue = new Animated.Value(0);
const AnimatedList = Animated.createAnimatedComponent(FlatList);

const BUTTON_HEIGHT = 45;
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      loading: false,
      tab: 0,
    };
  }

  componentDidMount() {
    this.requestGetByOwner();
  }

  _onChangeTab = tab => {
    this.setState({ tab });
  };

  requestGetByOwner = async () => {
    this._setLoading(true);
    try {
      const { userData } = this.props;
      const result = await PostServices.getPostByOwner(userData._id);
      this.setState({ postData: result });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _openModel = post => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Bỏ qua", "Sửa bài viết", "Xóa bài viết"],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          this.editPostModal.setModalVisible(true, post);
        }
        if (buttonIndex === 2) {
          Alert.alert(
            "Bạn có chắc muốn xóa bài viết này?",
            undefined,
            [
              {
                text: "Không",
                style: "cancel",
              },
              {
                text: "Có",
                onPress: () => {
                  PostServices.deletePost({ id: post._id });
                  const tmp = this.state.postData.filter(item => item !== post);
                  this.setState({ postData: tmp });
                },
              },
            ],
            {
              cancelable: true,
            }
          );
        }
      }
    );
  };

  _setLoading = loading => {
    this.setState({ loading });
  };

  render() {
    const { userData, toast } = this.props;
    return (
      <Container>
        <EditPostModal
          ref={ref => (this.editPostModal = ref)}
          userData={userData}
          toast={toast}
          onEditSuccess={post => {
            let tmp = this.state.postData;
            tmp[tmp.findIndex(item => item._id === post._id)] = post;
            this.setState({ postData: tmp });
          }}
        />
        <AnimatedHeader
          userData={userData}
          animatedValue={animatedValue}
          navigation={this.props.navigation}
        />
        <AnimatedList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: animatedValue,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={this.state.postData}
          renderItem={({ item }) => {
            return (
              <PostItem
                postData={item}
                optionPress={this._openModel}
                navigation={this.props.navigation}
                userData={this.props.userData}
              />
            );
          }}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: 280,
            padding: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.requestGetByOwner}
            />
          }
        />
      </Container>
    );
  }
}

export default ProfileScreen;
