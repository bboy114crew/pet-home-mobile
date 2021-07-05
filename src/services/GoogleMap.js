import Polyline from "@mapbox/polyline";
import * as Strings from "../constants/strings";
import axios from "axios";

var SearchCancelToken = axios.CancelToken;
var searchCancel;

const getDirections = async (startLoc, destinationLoc) => {
  try {
    const start = startLoc.latitude + ", " + startLoc.longitude;
    const destination =
      destinationLoc.latitude + ", " + destinationLoc.longitude;
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${destination}&key=${
        Strings.MAP_API_KEY
      }`
    );
    let respJson = await resp.json();
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });
    return coords;
  } catch (error) {
    throw error;
  }
};

const searchLocation = async (searchQuery, userLocation) => {
  try {
    if (searchCancel != undefined) {
      searchCancel();
    }
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json?",
      {
        cancelToken: new SearchCancelToken(c => {
          searchCancel = c;
        }),
        params: {
          query: searchQuery,
          location: userLocation.latitude + ", " + userLocation.longitude,
          radius: 10000,
          key: Strings.MAP_API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    if (axios.isCancel(error)) {
    } else {
      throw error;
    }
  }
};

export default {
  getDirections,
  searchLocation,
};
