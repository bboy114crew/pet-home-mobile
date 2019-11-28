import React from 'react';
import {
  InteractionManager,
  Platform,
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { MapView, Circle } from 'expo';
import Layout from '../../../../constants/layout';
export class MapCard extends React.Component {
  state = {
    shouldRenderMap: false,
    shouldRenderOverlay: true,
  };

  componentDidMount() {
    this._isMounted = true;

    InteractionManager.runAfterInteractions(() => {
      this._isMounted && this.setState({ shouldRenderMap: true });
      setTimeout(() => {
        this._isMounted && this.setState({ shouldRenderOverlay: false });
      }, 700);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={[styles.card, styles.mapContainer]}>
        {this._maybeRenderMap()}
        {this._maybeRenderOverlay()}
      </View>
    );
  }

  _maybeRenderOverlay() {
    if (!this.state.shouldRenderOverlay) {
      return;
    }

    if (this.state.shouldRenderMap) {
      return (
        <View
          style={[
            styles.map,
            {
              backgroundColor: '#f9f5ed',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            },
          ]}
        />
      );
    } else {
      return <View style={[styles.map, { backgroundColor: '#f9f5ed' }]} />;
    }
  }

  _maybeRenderMap() {
    if (!this.state.shouldRenderMap) {
      return;
    }
    const { lat, long, name } = this.props;
    return (
      <MapView
        cacheEnabled={Platform.OS === 'android'}
        style={styles.map}
        loadingBackgroundColor="#f9f5ed"
        loadingEnabled={false}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}>
        <MapView.Circle
          center={{
            latitude: lat,
            longitude: long,
          }}
          radius={65}
          strokeWidth={2}
          strokeColor="#3399ff"
          fillColor="#80bfff"
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 200,
    width: Layout.window.width - 20,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: "#CACACA",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  mapContainer: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
  },
});