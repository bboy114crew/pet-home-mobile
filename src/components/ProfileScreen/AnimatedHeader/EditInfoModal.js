import React, { Component } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Button,
  Text,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Spinner,
  Form,
  Item,
  Input,
} from "native-base";
import ImageServices from "../../../services/ImageServices";
import UserServices from "../../../services/UserServices";
import { login } from "../../../redux/actions/AuthActions";
import { connect } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class EditInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      editType: undefined,
      photos: [],
      selectedPhoto: -1,
      loading: false,
      newName: undefined,
    };
  }

  setModalVisible = (modalVisible, editType) => {
    this.setState({
      modalVisible,
      editType,
    });
  };

  _getPhotos = () => {
    CameraRoll.getPhotos({
      first: 1000,
      assetType: "Photos",
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(e => {
        console.log(e);
      });
  };

  _editInfo = () => {
    const { editType } = this.state;
    if (editType !== 3) {
      this._requestChangeImage();
    }
    if (editType === 3) {
      this._requestChangeName();
    }
  };

  _setLoading = loading => {
    this.setState({ loading });
  };

  _requestChangeName = async () => {
    const { newName } = this.state;
    const { userData } = this.props;
    this._setLoading(true);
    try {
      await UserServices.editInfo(userData._id, {
        appName: newName,
      });
      const user = await UserServices.findUser(userData._id);
      this.props.login(user);
      this.setModalVisible(false);
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _requestChangeImage = async () => {
    const { userData } = this.props;
    const { photos, selectedPhoto, editType } = this.state;
    this._setLoading(true);
    try {
      const selectedImage = photos[selectedPhoto].node.image;
      const uploadImage = await ImageServices.uploadImage(selectedImage);
      if (editType === 1) {
        await UserServices.editInfo(userData._id, {
          background: uploadImage.url,
        });
      }
      if (editType === 2) {
        await UserServices.editInfo(userData._id, {
          avatar: uploadImage.url,
        });
      }
      const user = await UserServices.findUser(userData._id);
      this.props.login(user);
      this.setModalVisible(false);
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _renderImageList = () => {
    const { selectedPhoto } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {this.state.photos.map((p, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              onPress={() =>
                this.setState({
                  selectedPhoto: selectedPhoto === i ? -1 : i,
                })
              }
            >
              <Image
                source={{ uri: p.node.image.uri }}
                style={{
                  width: SCREEN_WIDTH / 3 - 4,
                  height: SCREEN_WIDTH / 3 - 4,
                  marginBottom: 2,
                  marginTop: 2,
                }}
              />
              {selectedPhoto !== -1 && selectedPhoto === i ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF90",
                  }}
                >
                  <Icon name="md-checkmark" style={{ color: "#2ecc71" }} />
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  _renderChangeName = () => {
    return (
      <View
        style={{
          margin: 15,
          marginLeft: 0,
        }}
      >
        <Form>
          <Item>
            <Input
              placeholder="Nhập tên mới"
              onChangeText={text => this.setState({ newName: text })}
            />
          </Item>
        </Form>
      </View>
    );
  };

  render() {
    const { editType, loading, newName, selectedPhoto } = this.state;

    if (editType === 1 || editType === 2) {
      this._getPhotos();
    }

    let btnDisable = true;

    if (newName !== undefined) {
      btnDisable = false;
    }

    if (selectedPhoto !== -1) {
      btnDisable = false;
    }

    return (
      <Modal
        transparent={false}
        visible={this.state.modalVisible}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
          }}
        >
          <Header>
            <Left>
              <Button transparent onPress={() => this.setModalVisible(false)}>
                <Text>Bỏ qua</Text>
              </Button>
            </Left>
            <Right>
              <Button
                transparent
                onPress={this._editInfo}
                disabled={btnDisable}
              >
                <Text>Thay đổi</Text>
              </Button>
            </Right>
          </Header>
          {editType !== 3 ? this._renderImageList() : this._renderChangeName()}
          {loading ? (
            <View
              style={{
                flex: 1,
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF95",
              }}
            >
              <Spinner color="#2f3542" />
            </View>
          ) : null}
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      dispatch(login(userData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    withRef: true,
  }
)(EditInfoModal);
