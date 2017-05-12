import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {TabNavigator, StackNavigator} from 'react-navigation';
import { ScrollView, View, Text, Picker, TextInput, FlatList, StyleSheet } from 'react-native';
import { Tile, List, ListItem, Button, Icon } from 'react-native-elements';
import SettingsList from 'react-native-settings-list';

class UserDetail extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({ 
   title: navigation.state.params.User.DisplayName
  });

  componentDidMount() {
    this.props.loadUser(this.props, this.props.navigation.state.params.Site, this.props.navigation.state.params.User.UserId);
    if (this.props.roles.groups.length == 0) {
      this.props.loadRoleGroups(this.props, this.props.navigation.state.params.Site);
    }
  }

  changeUserProp(propName, newValue) {
    this.props.changeUserProperty(this.props, this.props.navigation.state.params.Site, this.props.navigation.state.params.User.UserId, propName, newValue);
  }

  render() {
    // console.log(this.props);
    var user = this.props.users.currentUser;
    return (
      <View style={styles.container}>
        <View style={styles.nameDiv}>
          <List>
            <ListItem
              title="Email"
              key="Email"
              leftIcon={{name: 'contact-mail'}}
              subtitle={user.Email}
              hideChevron
            />
            <ListItem
              title="Username"
              key="Username"
              leftIcon={{name: 'account-box'}}
              subtitle={user.Username}
              hideChevron
            />
          </List>
        </View>
        <View style={styles.settingsDiv}>
          <SettingsList borderColor='#ccc'>
            <SettingsList.Item
              title="Authorized"
              icon={<View style={styles.iconDiv}><Icon name='verified-user' color='#ccc' size={24} /></View>}
              hasNavArrow={false}
              hasSwitch={true}
              switchState={!!user.Authorised}
              switchOnValueChange={() => this.changeUserProp('authorised', !user.Authorised)}
            />
            <SettingsList.Item
              title="Deleted"
              icon={<View style={styles.iconDiv}><Icon name='delete' color='#ccc' size={24} /></View>}
              hasNavArrow={false}
              hasSwitch={true}
              switchState={!!user.IsDeleted}
              switchOnValueChange={() => this.changeUserProp('isdeleted', !user.IsDeleted)}
            />
            <SettingsList.Item
              title="Locked Out"
              icon={<View style={styles.iconDiv}><Icon name='lock' color='#ccc' size={24} /></View>}
              hasNavArrow={false}
              hasSwitch={true}
              switchState={!!user.LockedOut}
              switchOnValueChange={() => this.changeUserProp('lockedout', !user.LockedOut)}
            />
            <SettingsList.Item
              title="Update Password"
              icon={<View style={styles.iconDiv}><Icon name='spellcheck' color='#ccc' size={24} /></View>}
              hasNavArrow={false}
              hasSwitch={true}
              switchState={!!user.UpdatePassword}
              switchOnValueChange={() => this.changeUserProp('updatepassword', !user.UpdatePassword)}
            />
            <SettingsList.Item
              title="Set Password"
              icon={<View style={styles.iconDiv}><Icon name='security' color='#ccc' size={24} /></View>}
              hasNavArrow={true}
              onPress={() => this.props.navigation.navigate('SetPassword', { User: user })}
            />
            <SettingsList.Item
              title="Roles"
              icon={<View style={styles.iconDiv}><Icon name='group' color='#ccc' size={24} /></View>}
              hasNavArrow={true}
              onPress={() => this.props.navigation.navigate('Roles', { User: user })}
            />
          </SettingsList>
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
    roles: state.roles,
    users: state.users,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconDiv: {
    paddingTop: 14,
    paddingLeft: 10,
  },
  nameDiv: {
    marginBottom: 10,
  },
  settingsDiv: {},
  settings: {
    borderColor: '#eee'
  },
})