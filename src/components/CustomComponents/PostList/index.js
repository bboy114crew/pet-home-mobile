import React, { PureComponent } from "react";
import {
  FlatList,
  View,
  Text,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { Spinner } from "native-base";
import PostItem from "./PostItem";
import { getPost, deletePost } from "../../../redux/actions/PostActions";
import { connect } from "react-redux";

class PostList extends PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.getPost("all");
  }

  _optionPress = post => {
    const { optionPress } = this.props;
    if (optionPress) {
      optionPress(post);
    }
  };

  _setLoading = loading => {
    this.setState({
      loading,
    });
  };

  _renderItem = ({ item }) => {
    return (
      <PostItem
        postData={item}
        optionPress={this._optionPress}
        navigation={this.props.navigation}
        userData={this.props.userData}
      />
    );
  };

  render() {
    const { loading, postData, postType } = this.props.postState;

    console.log((">>> post data ", postData))

    if (loading) {
      return (
        <View style={styles.background}>
          <Spinner color="#615c70" />
        </View>
      );
    }
    if (postData.length === 0) {
      return (
        <View style={styles.background}>
          <Text>Không có bài viết</Text>
        </View>
      );
    }
    return (
      <FlatList
        onScroll={this.props.onScroll}
        scrollEventThrottle={200}
        showsVerticalScrollIndicator={false}
        data={postData}
        extraData={postData}
        renderItem={this._renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{
          marginLeft: 10,
          marginRight: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => this.props.getPost(postType)}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = state => {
  return {
    postState: state.post,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: type => {
      dispatch(getPost(type));
    },
    deletePost: post => {
      dispatch(deletePost(post));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
