import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { TabNavigator, StackNavigator } from 'react-navigation';
import { ScrollView, View, Alert } from 'react-native';
import { Tile, List, ListItem, Button, FormLabel, FormInput } from 'react-native-elements';
import Service from '../lib/service'
import * as Globals from '../lib/global'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }

  logInPressed() {
    var site = this.props.navigation.state.params.Site;
    var that = this;
    Service.authenticate(site.Host, site.Scheme, site.Username, this.state.password, (jwt) => {
      // console.log(jwt);
      site.Token = jwt.accessToken;
      site.RefreshToken = jwt.renewalToken;
      Globals.loggingIn = false;
      that.props.updateJwt(site, jwt);
      that.props.loadUsers(that.props, site, "", "DisplayName", "asc", 0, 20);
      that.props.navigation.dispatch({ type: 'Navigation/BACK', params: { Site: site } });
    }, (err) => {
      Globals.loggingIn = false;
      Alert.alert("Login unsuccessful");
    });
  }

  render() {
    var site = this.props.navigation.state.params.Site;
    // console.log(this.props);
    return (
      <View>
        <List>
          <ListItem
            title="Site"
            rightTitle={site.PortalName}
            hideChevron
          />
          <ListItem
            title="Url"
            rightTitle={site.Host}
            hideChevron
          />
          <ListItem
            title="Username"
            rightTitle={site.Username}
            hideChevron
          />
        </List>
        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCorrect={false} placeholder="Your password" secureTextEntry={true} value={this.state.password} />
        <Button
          title="LOG IN"
          onPress={() => this.logInPressed()}
         />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
