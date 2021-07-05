import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Keyboard,
} from "react-native";
import { Button, Icon, Container, Content, Form, Textarea } from "native-base";
import { ImagePicker } from "expo";
import CustomHeader from "../CustomComponents/CustomHeader";
import PostCategories from "./PostCategories";
import GalleryModal from "../CustomComponents/GalleryModal";
import PhotoItem from "./PhotoItem";
import PostServices from "../../services/PostServices";
import ToastModal from "../CustomComponents/ToastModal";

import { connect } from "react-redux";
import { addPost, editPost } from "../../redux/actions/PostActions";
import { setLoading } from "../../redux/actions/UIActions";

class AddPostTab extends Component {
  constructor(props) {
    super(props);
    const postData = props.postData;
    this.state = {
      images: !postData ? [] : postData.images,
      loading: false,
      postCategories: [],
      title: !postData ? "" : postData.title,
      category: !postData ? null : { _id: postData.typeId },
      status: 1,
    };
    this.uploadImages = !postData ? [] : postData.images;
    this.baseState = this.state;
  }

  componentDidMount() {
    this._getCategories();
  }

  _getCategories = async () => {
    try {
      this.setState({ loading: true });
      const rs = await PostServices.getPostCategories();
      this.setState({
        loading: false,
        postCategories: rs,
      });
    } catch (er) {
    }
  };

  _onSubmitPicture = images => {
    let tmp = this.state.images;
    tmp = tmp.concat(images);
    this.setState({
      images: tmp,
    });
  };

  _snapPicture = async () => {
    const { Permissions } = Expo;
    const res = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);
    if (res.some(permission => permission.status === "granted")) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        result = {
          ...result,
          _id: Date.now(),
        };
        let tmpImages = this.state.images;
        tmpImages.push(result);
        this.setState({
          images: tmpImages,
        });
      }
    } else {
      throw new Error("Camera roll permission not granted");
    }
  };

  _removeImageItem = item => {
    const tmpImages = this.state.images.filter(img => {
      return item._id !== img._id;
    });
    this.setState({
      images: tmpImages,
    });
    this.uploadImages = this.uploadImages.filter(img => {
      return item._id !== img._id;
    });
  };

  _onSelectCategory = category => {
    this.setState({
      category,
    });
  };

  _uploadImageCallback = image => {
    this.uploadImages.push(image);
  };

  _requestCreatePost = async () => {
    const { toast, type, postData, setLoading } = this.props;

    const validate = await this._validate();
    if (validate === false) return;

    setLoading(true);

    try {
      const { title, category, status } = this.state;
      const images = this.uploadImages.map(img => {
        return {
          url: img.url,
          publicId: img.public_id,
          width: img.width,
          height: img.height,
        };
      });
      const ownerId = this.props.userData._id;
      const typeId = category._id;
      if (type === "edit") {
        const data = {
          postId: postData._id,
          updateOptions: [
            {
              propName: "title",
              value: title,
            },
            {
              propName: "typeId",
              value: category._id,
            },
            {
              propName: "status",
              value: status,
            },
            {
              propName: "images",
              value: images,
            },
          ],
        };
        const rs = await PostServices.editPost(data);
        const editedPost = await PostServices.getPostById(rs._id);
        this.props.editPost(editedPost);
        this.props.socket.emit("editPost", editedPost)
        if (this.props.onEditSuccess) {
          this.props.onEditSuccess(editedPost);
        }
        setLoading(false);
        toast({ message: "Sửa bài viết thành công", duration: 4000 });
      } else {
        const data = { title, images, typeId, status, ownerId };
        const rs = await PostServices.createPost(data);
        const newPost = await PostServices.getPostById(rs._id);
        this.props.addPost(newPost);
        toast({ message: "Đăng bài viết thành công", duration: 3000 });
        setLoading(false);
        this.props.navigation.navigate("Home");
      }

      this.uploadImages = [];
      this.setState(
        {
          ...this.baseState,
          images: [],
          postCategories: this.state.postCategories,
          category: null,
        },
        () => {
          if (type === "edit") {
            this.props.closeModal();
          }
        }
      );
    } catch (error) {
      setLoading(false);
      toast({ message: "Có lỗi xảy ra", duration: 3000 });
      throw error;
    }
  };

  _validate = async () => {
    const { title, category, images } = this.state;

    const { toast, type, setLoading } = this.props;
    if (title.trim().length === 0) {
      if (type === "edit") {
        this.toastModal.show("Hãy viết 1 chút gì đó");
      }
      toast({ message: "Hãy viết 1 chút gì đó", duration: 3000 });
      return false;
    }
    if (category === null) {
      if (type === "edit") {
        this.toastModal.show("Bạn chưa chọn loại bài viết");
      }
      toast({ message: "Bạn chưa chọn loại bài viết", duration: 3000 });
      return false;
    }
    if (category) {
      setLoading(true);
      try {
        const postCategory = await PostServices.getPostCategoryById(
          category._id
        );
        if (postCategory.deletionFlag === true) {
          if (type === "edit") {
            this.toastModal.show(
              "Loại bài viết bạn chọn hiện không khả dụng. Vui lòng chọn lại"
            );
          }
          toast({
            message:
              "Loại bài viết bạn chọn hiện không khả dụng. Vui lòng chọn lại",
            duration: 3000,
          });
          setLoading(false);
          return false;
        }
      } catch (error) {}
      setLoading(false);
    }
    if (images.length === 0) {
      if (type === "edit") {
        this.toastModal.show("Hãy thêm ít nhất 1 ảnh nào");
      }
      toast({ message: "Hãy thêm ít nhất 1 ảnh nào", duration: 3000 });
      return false;
    }
    if (this.uploadImages.length !== images.length) {
      if (type === "edit") {
        this.toastModal.show("Ảnh của bạn đang upload");
      }
      toast({ message: "Ảnh của bạn đang upload", duration: 3000 });
      return false;
    }
    return true;
  };

  render() {
    const { userData, type } = this.props;
    const { postCategories, images } = this.state;
    return (
      <Container>
        <CustomHeader
          title="Tạo bài viết"
          buttonLeft={type === "edit" ? "md-close" : "menu"}
          actionLeft={() => {
            if (type === "edit") {
              this.props.closeModal();
            } else {
              this.props.navigation.openDrawer();
            }
          }}
          buttonRight="md-add"
          actionRight={() => {
            Keyboard.dismiss();
            this._requestCreatePost();
          }}
        />
        <Content>
          <View style={styles.infoBar}>
            <View style={styles.avatarContainer}>
              {userData ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: userData.avatar,
                  }}
                />
              ) : null}
            </View>
            <Text style={styles.textUsername}>
              {userData ? userData.appName : ""}
            </Text>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.settingContainer}
              onPress={() =>
                this.props.toast({ message: "hello", duration: 3000 })
              }
            >
              <Icon name="md-settings" style={styles.settingIcon} />
            </TouchableOpacity> */}
          </View>
          <PostCategories
            categories={postCategories}
            onItemPress={this._onSelectCategory}
            selectedCategoryId={
              this.state.category ? this.state.category._id : ""
            }
          />
          <View style={styles.formContainer}>
            <Form>
              <Textarea
                bordered
                placeholder="Hãy viết gì đó nào..."
                rowSpan={(Dimensions.get("screen").height - 100) / 50}
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
            </Form>
          </View>
          <View>
            <FlatList
              horizontal
              keyExtractor={item => item._id}
              extraData={images}
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
              data={images}
            />
          </View>
          <View style={styles.optionContainer}>
            <Button transparent onPress={this._snapPicture}>
              <Icon name="md-camera" />
            </Button>
            <GalleryModal
              onSubmit={this._onSubmitPicture}
              maxNumber={10 - images.length}
            />
          </View>
        </Content>
        <ToastModal ref={ref => (this.toastModal = ref)} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  infoBar: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 36,
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginLeft: 10,
    marginRight: 4,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  textUsername: {
    fontWeight: "bold",
    flex: 1,
  },
  settingContainer: {
    marginRight: 10,
  },
  settingIcon: {
    fontSize: 20,
    color: "#B5B5B5",
  },
  formContainer: {
    margin: 10,
  },
  optionContainer: {
    height: 50,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

const mapStateToProps = state => {
  return {
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => {
      dispatch(addPost(post));
    },
    editPost: post => {
      dispatch(editPost(post));
    },
    setLoading: loading => {
      dispatch(setLoading(loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostTab);
