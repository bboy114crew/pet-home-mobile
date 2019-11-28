// import React, { Component } from "react";
// import ReactNative, {
//   View,
//   Text,
//   PanResponder,
//   Animated,
//   TouchableOpacity,
//   Easing,
//   Dimensions,
//   Modal, 
//   UIManager
// } from "react-native";

// const AnimatedView = Animated.createAnimatedComponent(View);

// class LocationItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pan: new Animated.ValueXY(),
//     };
//     this._setPanResponder();
//     this.lastTap = null;
//   }

//   _setPanResponder = () => {
//     this.panResponder = PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) => {
//         if (this.props.isAnimated) {
//           return false;
//         }
//         if (
//           gestureState.dx < -30 ||
//           gestureState.dx > 30 ||
//           gestureState.dy < -10 ||
//           gestureState.dy > 10
//         ) {
//           this.props.onItemMove(false);
//           return true;
//         }
//         return false;
//       },
//       onPanResponderGrant: (evt, gestureState) => {
//         this.state.pan.setOffset({
//           x: this.state.pan.x._value,
//           y: this.state.pan.y._value,
//         });
//         this.state.pan.setOffset({ x: 0, y: 0 });
//       },
//       onPanResponderMove: Animated.event([
//         null,
//         {
//           dx: this.state.pan.x,
//           dy: this.state.pan.y,
//         },
//       ]),
//       onPanResponderRelease: (evt, gestureState) => {
//         console.log(gestureState.dx)
//         console.log(gestureState.dy)
//         this._returnPosition();
//       },
//       onPanResponderTerminate: () => {
//         this._returnPosition();
//       },
//     });
//   };

//   _returnPosition = () => {
//     Animated.timing(this.state.pan, {
//       toValue: { x: 0, y: 0 },
//       duration: 100,
//       Easing: Easing,
//       useNativeDriver: true,
//     }).start(() => {
//       this.props.onItemMove(true);
//     });
//   };

//   handleDoubleTap = () => {
//     const now = Date.now();
//     const DOUBLE_PRESS_DELAY = 300;
//     if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
//       console.log("double");
//     } else {
//       this.lastTap = now;
//       this.locationItem.measureInWindow((x, y, w, h) => {
//         console.log(x, y, w, h)
//       })
//     }
//   };

//   render() {
//     return (
//       <Animated.View
//         style={[
//           {
//             backgroundColor: "#c5c5c590",
//             marginLeft: 10,
//             marginRight: 10,
//             padding: 10,
//             borderRadius: 10,
//             transform: [
//               {
//                 translateX: this.state.pan.x,
//               },
//               {
//                 translateY: this.state.pan.y,
//               },
//             ],
//           },
//         ]}
//         {...this.panResponder.panHandlers}
//         ref = { ref => this.mView = ref}
//       >
//         {/* <Modal
//           visible={true}
//           transparent={false}
//         /> */}
//         <TouchableOpacity onPressOut={this.handleDoubleTap} ref={ref => this.locationItem = ref} >
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: "bold",
//               marginBottom: 4,
//             }}
//           >
//             Day la ten location
//           </Text>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//             }}
//           >
//             <View
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 10,
//                 backgroundColor: "#00cc99",
//                 marginRight: 4,
//               }}
//             />
//             <View
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 10,
//                 backgroundColor: "#00cc99",
//                 marginRight: 4,
//               }}
//             />
//             <View
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 10,
//                 backgroundColor: "#00cc99",
//                 marginRight: 4,
//               }}
//             />
//             <View
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 10,
//                 backgroundColor: "#00cc99",
//                 marginRight: 4,
//               }}
//             />
//             <View
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 10,
//                 backgroundColor: "#615c70",
//                 marginRight: 10,
//               }}
//             />
//             <Text style={{ fontSize: 12 }}>4.5/5 - Cách bạn 1.2Km</Text>
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   }
// }

// export default LocationItem;
