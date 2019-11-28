import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { listMarkerImage } from "../../../utils/fakeData";
import GoogleMap from "../../../services/GoogleMap";
const { Marker, Polyline, Callout, Circle } = MapView;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      selectLocation: null,
    };
    this.markers = {};
  }

  _getDirections = async (startLoc, destinationLoc) => {
    const result = await GoogleMap.getDirections(startLoc, destinationLoc);
    if (result) {
      this.setState({ coords: result });
      this.mapView.fitToCoordinates([startLoc, destinationLoc], {
        edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
        animated: true,
      });
    }
  };

  _onMapPress = event => {
    if (!event.nativeEvent.action) {
      const { onMapPress } = this.props;
      if (onMapPress) {
        onMapPress();
      }
    }
  };

  _onMarkerPress = locationItem => {
    const { onMarkerPress } = this.props;
    if (onMarkerPress) {
      onMarkerPress(locationItem);
    }
  };

  _onCalloutPress = locationItem => {
    const { onCalloutPress } = this.props;
    if (onCalloutPress) {
      onCalloutPress(locationItem);
    }
  };

  moveToCoordinate = coordinate => {
    this.mapView.animateToCoordinate(coordinate, 300);
  };

  showCallout = locationItem => {
    if (locationItem) {
      const marker = this.markers[locationItem._id];
      if (marker) {
        marker.showCallout();
      }
    }
  };

  hideCallout = locationItem => {
    if (locationItem) {
      const marker = this.markers[locationItem._id];
      if (marker) {
        marker.hideCallout();
      }
    }
  };

  startDirection = (startLocation, destinationLocation) => {
    this._getDirections(startLocation, destinationLocation);
  };

  clearDirection = () => {
    this.setState({
      coords: null,
    });
  };

  addSelectLocation = location => {
    this.setState({
      selectLocation: location,
    });
  };

  removeSelectLocation = () => {
    this.setState({
      selectLocation: null,
    });
  };

  render() {
    const { location, coords, selectLocation } = this.state;
    const { userLocation, locationData } = this.props;
    return (
      <MapView
        ref={ref => (this.mapView = ref)}
        onPress={this._onMapPress}
        showsUserLocation={true}
        // provider={"google"}
        style={styles.map}
        initialRegion={userLocation}
      >
        {selectLocation ? <Marker coordinate={selectLocation} /> : null}
        {locationData.map(marker => {
          return (
            <Marker
              ref={ref => (this.markers[marker._id] = ref)}
              coordinate={marker.coordinate}
              title={marker.name}
              key={marker._id}
              identifier={marker._id + ""}
              onPress={() => {
                this._onMarkerPress(marker);
              }}
            >
              <Callout
                onPress={() => {
                  this._onCalloutPress(marker);
                }}
              >
                <View
                  style={{
                    width: Dimensions.get("window").width / 2.5,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    lineBreakMode="tail"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {marker.name}
                  </Text>
                  <Text numberOfLines={3} lineBreakMode="tail">
                    {marker.description}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
        {coords ? (
          <Polyline
            coordinates={coords}
            strokeWidth={6}
            strokeColor="#00cc99"
          />
        ) : null}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
