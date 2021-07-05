import React, { Component } from "react";
import { Container, Icon, Tabs, Tab, TabHeading } from "native-base";
import "../CustomComponents/PostOptionModal";
import AddPostTab from "../CustomComponents/AddPostTab";
import SearchPostTab from "../CustomComponents/SearchPostTab";
import HomeTab from "../CustomComponents/HomeTab";
export default class extends Component {
  _onCreateDone = () => {
    this.tabs.goToPage(0);
  };

  render() {
    return (
      <Container>
        <Tabs
          ref={ref => (this.tabs = ref)}
          tabBarPosition="bottom"
          locked={true}
          tabBarUnderlineStyle={{ backgroundColor: "#EC466A" }}
          scrollWithoutAnimation
        >
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Icon name="ios-home-outline" style={{ color: "#EC466A" }} />
              </TabHeading>
            }
          >
            <HomeTab
              navigation={this.props.navigation}
              toast={this.props.toast}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Icon
                  name="ios-add-circle-outline"
                  style={{ color: "#EC466A" }}
                />
              </TabHeading>
            }
          >
            <AddPostTab
              navigation={this.props.navigation}
              userData={this.props.userData}
              toast={this.props.toast}
              onCreateDone={this._onCreateDone}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Icon name="ios-search" style={{ color: "#EC466A" }} />
              </TabHeading>
            }
          >
            <SearchPostTab
              navigation={this.props.navigation}
              userData={this.props.userData}
              toast={this.props.toast}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
