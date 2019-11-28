import React, { Component } from "react";
import { View, Modal, StyleSheet, Dimensions, FlatList } from "react-native";
import {
  Form,
  Container,
  Content,
  Input,
  Label,
  Item,
  Textarea,
  Picker,
  Text,
} from "native-base";
import CustomHeader from "../CustomHeader";
import GalleryModal from "../GalleryModal";
import PhotoItem from "../../AddPostTab/PhotoItem";
import ToastModal from "../ToastModal";
import PetServices from "../../../services/PetServices";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: undefined,
      age: undefined,
      breed: undefined,
      branch: undefined,
      gender: undefined,
      description: undefined,
      images: [],
    };
    this.uploadImages = [];
    this.baseState = this.state;
  }

  setModalVisible = (visible, petInfo) => {
    this.petInfo = petInfo;
    this.setState({ modalVisible: visible });
    this.setState({
      name: petInfo ? petInfo.name : undefined,
      age: petInfo ? petInfo.age : undefined,
      breed: petInfo ? petInfo.breed : undefined,
      branch: petInfo ? petInfo.branch : undefined,
      gender: petInfo ? petInfo.gender : undefined,
      description: petInfo ? petInfo.description : undefined,
      images: petInfo ? petInfo.images : [],
    });
    this.uploadImages = petInfo ? petInfo.images : [];
  };

  _onSelectedImages = images => {
    let tmp = this.state.images;
    tmp = tmp.concat(images);
    this.setState({
      images: tmp,
    });
  };

  _removeImageItem = item => {
    let tmpImages = this.state.images.filter(img => {
      return img._id !== item._id;
    });
    this.setState({
      images: tmpImages,
    });
    this.uploadImages = this.uploadImages.filter(img => {
      return img._id !== item._id;
    });
  };

  _uploadImageCallback = image => {
    this.uploadImages.push(image);
  };

  _requestAddPet = async () => {
    if (this._validate()) {
      const ownerId = this.props.userData._id;
      const { name, age, breed, branch, gender, description } = this.state;
      const images = this.uploadImages.map(img => {
        return {
          url: img.url,
          publicId: img.public_id,
          width: img.width,
          height: img.height,
        };
      });
      if (!this.petInfo) {
        const pet = {
          ownerId,
          name,
          age,
          breed,
          branch,
          gender,
          description,
          images,
        };
        await PetServices.addPet(pet);
        this.props.toast({
          message: "Thêm pet thành công",
          duration: 3000,
          theme: "light",
        });
      } else {
        const petId = this.petInfo._id;
        const updateOptions = [
          {
            propName: "name",
            value: name,
          },
          {
            propName: "age",
            value: age,
          },
          {
            propName: "breed",
            value: breed,
          },
          {
            propName: "branch",
            value: branch,
          },
          {
            propName: "gender",
            value: gender,
          },
          {
            propName: "description",
            value: description,
          },
          {
            propName: "images",
            value: images,
          },
        ];
        const editData = { petId, updateOptions };
        await PetServices.editPet(editData);
        this.props.toast({
          message: "Sửa thông tin Pet thành công",
          duration: 3000,
          theme: "light",
        });
      }
      this.props.onReload();
      this.setState(this.baseState);
      this.setModalVisible(false);
    }
  };

  _validate = () => {
    const { name, age, breed, branch, gender, description } = this.state;
    if (!name) {
      this.toast.show("Hãy nhập tên của pet");
      return false;
    }
    if (!age) {
      this.toast.show("Hãy nhập tuổi của pet");
      return false;
    }
    if (!breed) {
      this.toast.show("Hãy chọn loài của pet");
      return false;
    }
    if (!branch) {
      this.toast.show("Hãy nhập giống của pet");
      return false;
    }
    if (!gender) {
      this.toast.show("Hãy chọn giới tính của pet");
      return false;
    }
    if (!description) {
      this.toast.show("Hãy giới thiệu một chút về pet");
      return false;
    }
    if (this.uploadImages.length === 0) {
      this.toast.show("Hãy thêm ảnh cho pet");
      return false;
    }
    return true;
  };

  render() {
    const { name, age, breed, branch, gender, description } = this.state;
    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
        animationType="slide"
      >
        <Container>
          <CustomHeader
            title="Đăng ký pet"
            buttonLeft="md-close"
            actionLeft={() => this.setModalVisible(false)}
            buttonRight={this.petInfo ? "md-checkmark" : "md-add"}
            actionRight={() => this._requestAddPet()}
          />
          <Content>
            <View
              style={{
                margin: 10,
              }}
            >
              <Form>
                <View style={styles.formItem}>
                  <Text note>Tên của Pet</Text>
                  <Input
                    style={{ paddingLeft: 16 }}
                    onChangeText={text => this.setState({ name: text })}
                    value={name ? name : ""}
                  />
                </View>
                <View style={styles.formItem}>
                  <Text note>Tuổi của Pet</Text>
                  <Input
                    style={{ paddingLeft: 16 }}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({ age: text })}
                    value={`${age ? age : ""}`}
                  />
                </View>
                <View style={styles.formItem}>
                  <Text note>Loài của Pet</Text>
                  <Picker
                    mode="dropdown"
                    placeholder=""
                    style={{ width: "100%" }}
                    selectedValue={this.state.breed}
                    onValueChange={value => this.setState({ breed: value })}
                  >
                    <Picker.Item label="Mèo" value="Mèo" />
                    <Picker.Item label="Chó" value="Chó" />
                    <Picker.Item label="Khác" value="Khác" />
                  </Picker>
                </View>
                <View style={styles.formItem}>
                  <Text note>Giống của Pet</Text>
                  <Input
                    style={{ paddingLeft: 16 }}
                    onChangeText={text => this.setState({ branch: text })}
                    value={branch ? branch : ""}
                  />
                </View>
                <View style={styles.formItem}>
                  <Text note>Giới tính của Pet</Text>
                  <Picker
                    mode="dropdown"
                    placeholder=""
                    style={{ width: "100%" }}
                    selectedValue={this.state.gender}
                    onValueChange={value => this.setState({ gender: value })}
                  >
                    <Picker.Item label="Cái" value="Cái" />
                    <Picker.Item label="Đực" value="Đực" />
                  </Picker>
                </View>
                <View style={styles.formItem}>
                  <Text note>Giới thiệu về Pet</Text>
                  <Input
                    style={{ paddingLeft: 16 }}
                    onChangeText={text => this.setState({ description: text })}
                    value={description ? description : ""}
                  />
                </View>
              </Form>
              <FlatList
                horizontal
                data={this.state.images}
                keyExtractor={item => (item._id ? item._id : item.uri)}
                extraData={this.state.images}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <PhotoItem
                      removeItem={this._removeImageItem}
                      item={item}
                      onUploadDone={this._uploadImageCallback}
                    />
                  );
                }}
              />
            </View>
            <GalleryModal
              onSubmit={this._onSelectedImages}
              maxNumber={10 - this.state.images.length}
            />
          </Content>
          <ToastModal ref={ref => (this.toast = ref)} />
        </Container>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  formItem: {
    borderBottomColor: "#B5B5B5",
    borderBottomWidth: 0.5,
    marginBottom: 6,
  },
});

export default EditModal;
