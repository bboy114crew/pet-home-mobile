import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import CustomHeader from "../CustomComponents/CustomHeader";
import BackgroundImage from "../CustomComponents/BackgroundImage";

export default class extends Component {
  render() {
    return (
      <Container>
        <BackgroundImage imageName="bg3" />
        <CustomHeader
          buttonLeft="arrow-back"
          actionLeft={() => {
            this.props.navigation.goBack();
          }}
          title="Đăng ký"
        />
        <Content contentContainerStyle={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={styles.body}
          >
            <Form>
              <Item style={styles.item} floatingLabel>
                <Label style={styles.label}>Số điện thoại</Label>
                <Input style={styles.input} placeholderTextColor="#EC466A" />
              </Item>
              <Item style={styles.item} floatingLabel>
                <Label style={styles.label}>Tên hiển thị</Label>
                <Input style={styles.input} placeholderTextColor="#EC466A" />
              </Item>
              <Item style={styles.item} floatingLabel>
                <Label style={styles.label}>Mật khẩu</Label>
                <Input style={styles.input} placeholderTextColor="#EC466A" />
              </Item>
              <Item style={styles.item} floatingLabel>
                <Label style={styles.label}>Nhập lại mật khẩu</Label>
                <Input style={styles.input} placeholderTextColor="#EC466A" />
              </Item>
            </Form>
            <Text style={styles.textDescription}>
              Chúng tôi sẽ gửi mã xác thực đến số điện thoại mà bạn đăng ký.
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {}}
              style={styles.btnLogin}
            >
              <Text style={styles.textLogin}>Đăng ký</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexGrow: 1,
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  },
  body: {
    marginLeft: 40,
    marginRight: 40,
  },
  icon: {
    width: "40%",
    resizeMode: "contain",
    height: "30%",
    alignSelf: "center",
  },
  textDescription: {
    color: "#636e72",
    marginTop: 20,
  },
  item: {
    borderBottomColor: "#EC466A",
    marginLeft: 0,
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    color: "#EC466A",
  },
  input: {
    textAlign: "center",
    color: "#EC466A",
  },
  btnForget: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  btnLogin: {
    height: 50,
    width: "100%",
    borderRadius: 50 / 2,
    backgroundColor: "#EC466A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  textLogin: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  btnRegister: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textRegister: {
    color: "#FFA1B9",
  },
  textForget: {
    color: "#8FA3B3",
  },
});
