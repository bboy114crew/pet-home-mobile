import React, { Component } from "react";
import { View, Modal } from "react-native";
import {
  Left,
  Right,
  Header,
  Button,
  Text,
  Body,
  Title,
  Item,
  Input,
  Form,
  Container,
  Content,
} from "native-base";
import { Rating } from "react-native-elements";
import ToastModal from "../ToastModal";
import LocationServices from "../../../services/LocationServices";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/UIActions";

class LocationReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      rating: 0,
      reviewMessage: "",
    };
  }

  setModalVisible = modalVisible => {
    this.setState({ modalVisible, rating: 0, reviewMessage: "" });
  };

  _requestSendReview = async () => {
    try {
      const { locationId, userData } = this.props;
      const { rating, reviewMessage } = this.state;
      if (!this._validate()) return;
      const rv = {
        locationId,
        reviewerId: userData._id,
        message: reviewMessage,
        ratingStar: rating,
      };
      const result = await LocationServices.addReview(rv);
      console.log(result);
      if (result._id) {
        this.props.toast({
          message: "Đánh giá địa điểm thành công",
          duration: 3000,
        });
      } else {
        this.props.toast({ message: result, duration: 3000 });
      }
      this.setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  _validate = () => {
    const { rating, reviewMessage } = this.state;
    if (rating === 0) {
      this.toastModal.show("Vui lòng chọn điểm đánh giá");
      return false;
    }
    if (reviewMessage.length === 0) {
      this.toastModal.show("Vui lòng điền nội dung đánh giá");
      return false;
    }
    return true;
  };

  render() {
    return (
      <Modal
        transparent={false}
        visible={this.state.modalVisible}
        animationType="slide"
      >
        <ToastModal ref={ref => (this.toastModal = ref)} />
        <Container
          style={{
            flex: 1,
          }}
        >
          <Header>
            <Left>
              <Button
                small
                transparent
                onPress={() => this.setModalVisible(false)}
              >
                <Text>Hủy</Text>
              </Button>
            </Left>
            <Body>
              <Title>Viết đánh giá</Title>
            </Body>
            <Right>
              <Button
                small
                transparent
                onPress={() => this._requestSendReview()}
              >
                <Text>Gửi</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Text>{`${this.state.rating}/5 điểm`}</Text>
              <Rating
                style= {{marginTop: 10}}
                startingValue={0}
                imageSize={30}
                onFinishRating={rating => this.setState({ rating })}
              />
            </View>
            <Form
              style={{
                marginRight: 15,
              }}
            >
              <Item>
                <Input
                  placeholder="Nội dung"
                  value={this.state.reviewMessage}
                  onChangeText={text => this.setState({ reviewMessage: text })}
                />
              </Item>
            </Form>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    toast: toast => {
      dispatch(toggle(toast));
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
)(LocationReviewModal);
