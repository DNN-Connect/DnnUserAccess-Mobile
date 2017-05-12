import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {TabNavigator, StackNavigator} from 'react-navigation';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import Camera from 'react-native-camera';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { FormLabel, FormInput } from 'react-native-elements';
import Service from '../lib/service';

class AddSite extends Component {
  refs = {
    popup: PopupDialog
  }

  constructor(props) {
    super(props);
    this.state = {
      link: { Host: 'unknown' },
      loggingIn: false,
      password: ""
    }
  }

  authenticate() {
    var that = this;
    this.refs.popup.dismiss();
    Service.authenticate(this.state.link.Host, this.state.link.Scheme, this.state.link.Username, this.state.password, (jwt) => {
      that.props.addSite(this.state.link, jwt);
      that.props.navigation.dispatch({ type: 'Navigation/BACK' });
    }, (err) => {
      Alert.alert("Login unsuccessful");
    });
  }

  changePassword(pw) {
    this.setState({
      password: pw
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={(e) => this.barCodeRead(e)}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={() => this.props.navigation.dispatch({ type: 'Navigation/BACK' })}>Cancel</Text>
        </Camera>
        <PopupDialog
          dialogTitle={<DialogTitle title={"Log in " + this.state.link.PortalName} />}
          height={200}
          ref="popup"
          actions={[
            <DialogButton
              text="Authenticate"
              onPress={() => {
                this.authenticate();
              }}
              key="btnAuth"
            />,
          ]}>
          <View>
            <FormLabel>Password</FormLabel>
            <FormInput 
             onChangeText={(text) => { this.setState({password: text}); }} 
             autoCorrect={false} placeholder="Your password" secureTextEntry={true} value={this.state.password} />
          </View>
        </PopupDialog>
      </View>
    );
  }

  barCodeRead(e) {
    if (!this.state.loggingIn) {
      var appLink = JSON.parse(e.data);
      this.setState({
        link: appLink,
        loggingIn: true
      }, () => {
        this.refs.popup.show();
      });
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSite);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
