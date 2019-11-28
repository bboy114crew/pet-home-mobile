// import React, { Component } from "react";
// import { View, Text, FlatList } from "react-native";

// import Photo from "./Photo";

// class PhotoList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedPhotos: [],
//     };
//   }

//   _onItemPress = (type, photo) => {
//     let tmp = this.state.selectedPhotos;
//     if (type === "add") {
//       tmp.push(photo);
//     } else {
//       tmp = tmp.filter(img => img.id !== photo.id);
//     }
//     this.setState({
//       selectedPhotos: tmp,
//     });
//     console.log(this.state.selectedPhotos)
//   };

//   _renderItem = ({ item }) => {
//     return (
//       <Photo
//         item={item}
//         number={this.state.selectedPhotos.length}
//         onItemPress={this._onItemPress}
//       />
//     );
//   };

//   render() {
//     const { photos } = this.props;
//     return (
//       <FlatList
//         numColumns={3}
//         data={photos}
//         renderItem={this._renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{
//           justifyContent: "space-around",
//         }}
//       />
//     );
//   }
// }

// export default PhotoList;
