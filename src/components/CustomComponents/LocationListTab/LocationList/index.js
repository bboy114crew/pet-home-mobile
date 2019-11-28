import React from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LocationListLargeItem from '../LocationListLargeItem'

export default class LocationList extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          ref={view => {
            this._scrollView = view;
          }}
          contentContainerStyle={this.props.contentContainerStyle}
          renderItem={this._renderItem}
          style={styles.container}
          data={data}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <LocationListLargeItem
        onPress={() => this._handlePressLocation(item)}
        item={item}
      />
    );
  }

  _handlePressLocation = item => {
    this.props.navigation.navigate("LocationDetail", {
      _id: item._id,
      ownerId: item.ownerId
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});