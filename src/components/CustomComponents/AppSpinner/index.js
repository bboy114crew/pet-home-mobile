import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Spinner } from "native-base";

class AppSpinner extends Component {
  render() {
    const { appLoading } = this.props;
    if (!appLoading) return null;
    return (
      <View style={styles.container}>
        <Spinner color="#2f3542" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF95",
  },
});

const mapStateToProps = state => {
  return {
    appLoading: state.ui.appLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSpinner);
