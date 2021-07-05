import React, { Component } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import PostServices from "../../../services/PostServices";
import { getPost } from "../../../redux/actions/PostActions";

class PostCategories extends Component {
  state = {
    categories: [{ name: "Tất cả", _id: "all" }],
    selectedCategoryId: "all",
  };

  async componentDidMount() {
    try {
      const rs = await PostServices.getAllPostCategories();
      this.setState({ categories: this.state.categories.concat(rs) });
    } catch (error) {
      throw error;
    }
  }

  _onItemPress = item => {
    this.setState({ selectedCategoryId: item._id });
    this.props.getPost(item._id);
  };

  _renderItem = ({ item }) => {
    const { selectedCategoryId } = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          this._onItemPress(item);
        }}
        style={[
          styles.item,
          {
            borderColor:
              selectedCategoryId === item._id ? "#EC466A" : "#615c70",
            backgroundColor:
              selectedCategoryId === item._id ? "#EC466A" : "#FFFFFF",
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: selectedCategoryId === item._id ? "#FFFFFF" : "#615c70",
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.categories}
        keyExtractor={item => item._id}
        extraData={this.state.selectedCategoryId}
        showsHorizontalScrollIndicator={false}
        renderItem={this._renderItem}
        style={{
          marginBottom: 10,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 32,
    borderRadius: 16,
    margin: 10,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: type => {
      dispatch(getPost(type));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCategories);
