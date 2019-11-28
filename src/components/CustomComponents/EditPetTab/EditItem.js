import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Card, Thumbnail, Text, Button } from "native-base";

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onEditPress = () => {
    const { pet } = this.props;
    this.props.onEditPress(pet);
  };

  _onDeletePress = () => {
    const { pet } = this.props;
    this.props.onDeletePress(pet);
  };

  render() {
    const { pet } = this.props;

    return (
      <Card>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ margin: 10 }}>
            <Thumbnail circular large source={{ uri: pet.images[0].url }} />
          </View>
          <View
            style={{
              flex: 1,
              marginRight: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text
                style={{ flex: 1, marginLeft: 6, marginRight: 6, fontSize: 12 }}
              >
                {`Tên: ${pet.name}`}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginLeft: 6,
                  marginRight: 6,
                  fontSize: 12,
                }}
              >
                {`Loài: ${pet.breed}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text
                style={{ flex: 1, marginLeft: 6, marginRight: 6, fontSize: 12 }}
              >
                {`Giống: ${pet.branch}`}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginLeft: 6,
                  marginRight: 6,
                  fontSize: 12,
                }}
              >
                {`Giới tính: ${pet.gender}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text
                style={{ flex: 1, marginLeft: 6, marginRight: 6, fontSize: 12 }}
              >
                {`Tuổi: ${pet.age}`}
              </Text>
            </View>
            <Text
              style={{
                flex: 1,
                marginLeft: 6,
                marginRight: 6,
                fontSize: 12,
                marginTop: 10,
              }}
            >
              {`Giới thiệu: ${pet.description}`}
            </Text>
            <View
              style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <Button
                transparent
                style={{ marginRight: 10 }}
                onPress={this._onEditPress}
              >
                <Icon name="md-create" />
              </Button>
              <Button transparent>
                <Icon
                  name="md-trash"
                  style={{ color: "#EC466A" }}
                  onPress={this._onDeletePress}
                />
              </Button>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

export default EditItem;
