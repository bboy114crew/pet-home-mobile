import React, { Component } from "react";
import {
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  Alert,
  Text,
} from "react-native";
import EditItem from "./EditItem";
import CustomHeader from "../CustomHeader";
import EditModal from "./EditModal";
import PetServices from "../../../services/PetServices";
import { Icon } from "native-base";

class EditPetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPet: [],
      loading: false,
    };
  }

  componentDidMount() {
    this._requestGetPet();
  }

  _requestGetPet = async () => {
    this._setLoading(true);
    try {
      const { userData } = this.props;
      const result = await PetServices.getPetByOwner(userData._id);
      this.setState({ listPet: result });
    } catch (error) {
      throw error;
    }
    this._setLoading(false);
  };

  _setLoading = loading => {
    this.setState({
      loading,
    });
  };

  _onEditPress = petInfo => {
    this.editModal.setModalVisible(true, petInfo);
  };

  _onDeletePress = petInfo => {
    Alert.alert("Bạn có chắc muốn xóa Pet", undefined, [
      {
        text: "Không",
        style: "cancel",
      },
      {
        text: "Có",
        onPress: () => {
          try {
            PetServices.deletePet(petInfo._id);
            const tmp = this.state.listPet.filter(pet => pet !== petInfo);
            this.setState({ listPet: tmp });
          } catch (error) {
            throw error;
          }
        },
      },
    ]);
  };

  render() {
    const { listPet, loading } = this.state;
    const { userData } = this.props;
    return (
      <View
        style={{
          backgroundColor: "#2A2E40",
          flex: 1,
        }}
      >
        <EditModal
          ref={ref => (this.editModal = ref)}
          toast={this.props.toast}
          userData={userData}
          onReload={this._requestGetPet}
        />
        <CustomHeader
          title="Pet của bạn"
          buttonLeft="md-menu"
          buttonRight="md-add"
          actionRight={() => this.editModal.setModalVisible(true)}
          actionLeft={() => this.props.navigation.openDrawer()}
        />
        {listPet.length > 0 ? (
          <FlatList
            contentInset={{ bottom: 20 }}
            data={listPet}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <EditItem
                  pet={item}
                  onEditPress={this._onEditPress}
                  onDeletePress={this._onDeletePress}
                />
              );
            }}
            contentContainerStyle={{
              paddingLeft: 10,
              paddingRight: 10,
            }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={this._requestGetPet}
              />
            }
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#2A2E40",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  color: "#FFF",
                }}
              >
                {`Bạn chưa tạo Pet, ấn `}
              </Text>
              <Icon name="md-add" style={{ color: "#EC466A" }} />
              <Text style={{ color: "#FFF" }}>{` để tạo Pet ngay nào`}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default EditPetTab;
