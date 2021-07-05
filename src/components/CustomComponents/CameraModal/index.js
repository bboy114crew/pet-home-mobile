import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Button,
  Icon,
  Container,
  Content,
  Form,
  Textarea,
  Footer,
} from "native-base";
import { Camera, Permissions } from "expo";
import CustomHeader from "../../CustomComponents/CustomHeader";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
    this.photos = [];
  }

  _setModalVisible = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    if (this.state.hasCameraPermission) {
      this.setState({ modalVisible: !this.state.modalVisible });
    }
  };

  _takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.photos.push(photo)
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            type={this.state.type}
            style={{
              flex: 1,
            }}
          >
            <CustomHeader
              buttonLeft="md-close"
              actionLeft={() => {
                this._setModalVisible();
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#FFF',
                position: 'absolute',
                width: 100,
                height: 40,
                bottom: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={this._takePicture}
            >
              <Text>Snap</Text>
            </TouchableOpacity>
          </Camera>
        </Modal>
        <Button transparent onPress={this._setModalVisible}>
          <Icon name="md-camera" />
        </Button>
      </View>
    );
  }
}
