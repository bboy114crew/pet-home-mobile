import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Left,
  Right,
  Body,
  Title,
} from "native-base";
import CustomHeader from "../CustomComponents/CustomHeader";
import BackgroundImage from "../CustomComponents/BackgroundImage";

export default class extends Component {
  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  _navigate = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <Container>
        <BackgroundImage imageName="bg4" />
        <CustomHeader
          title="Đăng nhập"
          buttonLeft="menu"
          actionLeft={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <Content contentContainerStyle={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this._dismissKeyboard}
            style={styles.body}
          >
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.icon}
            />
            <Text style={styles.textDescription}>
              Ngôi nhà chung cho thú cưng
            </Text>
            <Form>
              <Item style={styles.item} floatingLabel>
                <Label style={styles.label}>Số điện thoại</Label>
                <Input style={styles.input} placeholderTextColor="#EC466A" />
              </Item>
              <Item style={styles.item} floatingLabel>
                <Label style={styles.label}>Mật khẩu</Label>
                <Input
                  style={styles.input}
                  placeholderTextColor="#EC466A"
                  secureTextEntry
                  returnKeyType="go"
                />
              </Item>
            </Form>
            <TouchableOpacity style={styles.btnForget}>
              <Text style={styles.textForget}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._navigate} style={styles.btnLogin}>
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegister}>
              <Text style={styles.textRegister}>Đăng ký tài khoản</Text>
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
    color: "#a29bfe",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
