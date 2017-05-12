import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { TabNavigator, StackNavigator } from 'react-navigation';
import { ScrollView, View, StyleSheet, TextInput, TouchableHighlight, Alert, Text } from 'react-native';
import { Tile, List, ListItem, Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import Service from '../lib/service'
import * as Globals from '../lib/global'

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      secure: true,
    }
  }

  changePassword() {
    if (this.state.password == '') {
      Alert.alert('You must supply a new password');
      return;
    }
    Service.changeUserPassword(this.props, this.props.sites.active, this.props.users.currentUser.UserId, this.state.password, (data) => {
      Alert.alert('Password changed');
      this.props.navigation.dispatch({ type: 'Navigation/BACK'});
    }, (err) => {
      Alert.alert('Password could not be changed');
    });
  }

  render() {
    var site = this.props.navigation.state.params.Site;
    return (
      <View style={styles.container}>
        <View style={styles.helpDiv}>
          <Text style={styles.help}>
            IMPORTANT
          </Text>
          <Text style={styles.help}>
            Keep in mind that the password must meet the criteria set for the
            website (length, complexity, etc) and must not have been used recently
            (password history) 
            by the same user. If the update fails it is probably due to one of these
            factors.
          </Text>
        </View>
        <View style={styles.passwordDiv}>
          <View style={styles.inputDiv}>
            <TextInput
              style={styles.input}
              value={this.state.password}
              onChangeText={(text) => {this.setState({password: text})}}
              placeholder='New Password'
              onSubmitEditing={()=>{this.changePassword()}}
              secureTextEntry={this.state.secure}
            />
          </View>
          <TouchableHighlight onPress={() => {
                var s = !this.state.secure;
                this.setState({secure:s});
                }}>
            <View>
              <Icon name='remove-red-eye' size = {20} color = "#ccc" />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonDiv}>
          <Button style={styles.button}
            title="CANCEL"
            onPress={() => this.props.navigation.dispatch({ type: 'Navigation/BACK'})}
          />
          <Button style={styles.button}
            title="CHANGE"
            onPress={() => this.changePassword()}
          />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
      users: state.users,
      sites: state.sites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    
  },
  helpDiv: {
    justifyContent: 'center',    
  },
  help: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20
  },
  passwordDiv: {
    flexDirection:'row', 
    height:52, 
    backgroundColor:'#fff', 
    paddingLeft: 10,
    paddingRight: 10,
    margin: 15,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
  },
  inputDiv: {
    flex:1,
    height:50
  },
  input: {
    height: 50,
    fontSize: 20,
  },
  buttonDiv: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1
  }
});