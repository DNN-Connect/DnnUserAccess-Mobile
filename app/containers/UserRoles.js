import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {TabNavigator, StackNavigator} from 'react-navigation';
import { ScrollView, View, Text, Picker, TextInput, FlatList, StyleSheet } from 'react-native';
import { Tile, List, ListItem, Button, Icon } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker'
import SettingsList from 'react-native-settings-list';

class UserRoles extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({ 
   title: navigation.state.params.User.DisplayName + ' Roles',
  });

  componentDidMount() {
  }

  changeRoleGroup(newGroupId) {
    this.props.changeRoleGroup(this.props, this.props.sites.active, newGroupId);
  }

  changeRoleStatus(role) {
    var newStatus = role.Status == 1 ? false : true;
    this.props.changeUserRoleStatus(this.props, this.props.sites.active, this.props.users.currentUser.UserId, role.RoleID, newStatus, this.props.roles.currentRoleGroupId);
  }

  render() {
    var user = this.props.users.currentUser;
    var roleGroupName = "";
    var roleGroups = this.props.roles.groups.map((g) => {
      if (g.RoleGroupID == this.props.roles.currentRoleGroupId) {
        roleGroupName = g.RoleGroupName;
      }
      return {label: g.RoleGroupName, key: g.RoleGroupID};
    });
    var roles = this.props.roles.currentRoles.map((r) => {
      return (<SettingsList.Item 
        title={r.RoleName}
        key={r.RoleID}
        hasNavArrow={false}
        hasSwitch={true}
        switchState={!!r.Status}
        switchOnValueChange={() => this.changeRoleStatus(r)}
      />);
    });
    return (
      <View style={styles.container}>
        <View style={styles.pickerDiv}>
          <ModalPicker
            data={roleGroups}
            initValue="Select something yummy!"
            onChange={(option)=> this.changeRoleGroup(option.key, option.label)}
            >
            <View style={styles.pickerBox}>
              <Icon name='keyboard-arrow-down' color='#666' size={24} />
              <Text style={styles.pickerText}>{roleGroupName}</Text>
            </View>
          </ModalPicker>
        </View>
        <View style={styles.rolesDiv}>
          <SettingsList borderColor='#ccc'>
            {roles}
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
    sites: state.sites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoles);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerDiv: {
    height: 50,
  },
  pickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1, 
    borderColor:'#ccc',
    backgroundColor: '#fff',
    margin:5, 
    paddingLeft: 8,
    height:40,
    borderRadius: 8,
  },
  pickerText: {
    fontSize: 20,
    color: '#666',
    //width: 200,
    //alignSelf: 'stretch',
    marginLeft: 10,
  },
  rolesDiv: {},
})