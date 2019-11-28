import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Thumbnail, Text } from "native-base";
import ReadMoreText from "../../CustomComponents/ReadMoreText";
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { comment } = this.props;
    const date = new Date(comment.createdAt);
    return (
      <View ref={ref => (this.view = ref)} style={styles.container}>
        <View style={styles.avatar}>
          <Thumbnail
            square
            style={{ borderRadius: 5 }}
            small
            source={{ uri: comment.userCommentId.avatar }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.body}>
            <Text>
              <Text style={styles.name}>{comment.userCommentId.appName}</Text>
              <Text note style={styles.time}>
                {`  ${date.toLocaleTimeString()}`}
              </Text>
            </Text>
            <ReadMoreText numberOfLines={3}>
              <Text>{comment.content}</Text>
            </ReadMoreText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  avatar: {
    marginRight: 10,
    overflow: "hidden",
  },
  bodyContainer: {
    flex: 1,
  },
  body: {
    alignSelf: "flex-start",
    padding: 10,
    paddingTop: 4,
    borderRadius: 5,
    backgroundColor: "#EEEEEE",
  },
  name: {
    fontWeight: "500",
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
  },
});

export default Comment;
