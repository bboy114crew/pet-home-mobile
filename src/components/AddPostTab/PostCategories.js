import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class PostCategories extends Component {
  
  _onItemPress = category => {
    const { onItemPress } = this.props;
    if (onItemPress) {
      onItemPress(category);
    }
  };

  render() {
    const { categories } = this.props;
    const { selectedCategoryId } = this.props;
    return (
      <View style={styles.container}>
        {categories.map(category => {
          return (
            <View key={category._id}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this._onItemPress(category);
                }}
                style={[
                  styles.item,
                  {
                    borderColor:
                      selectedCategoryId === category._id
                        ? "#EC466A"
                        : "#615c70",
                    backgroundColor:
                      selectedCategoryId === category._id
                        ? "#EC466A"
                        : "#FFFFFF",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        selectedCategoryId === category._id
                          ? "#FFFFFF"
                          : "#615c70",
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    height: 32,
    borderRadius: 16,
    margin: 10,
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

export default PostCategories;
