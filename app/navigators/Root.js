import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Sites from '../containers/Sites';
import Users from '../containers/Users';
import UserDetail from '../containers/UserDetail';
import UserRoles from '../containers/UserRoles';
import SetPassword from '../containers/SetPassword';
import AddSite from '../containers/AddSite';
import Login from '../containers/Login';

export default Root = StackNavigator({
    Sites: {
        screen: Sites,
        navigationOptions: {
            title: 'DNN User Access App'
        }
    },
    Users: {
        screen: Users,
        navigationOptions: {
        }
    },
    Details: {
        screen: UserDetail,
        navigationOptions: {
        }
    },
    Roles: {
        screen: UserRoles,
        navigationOptions: {
        }
    },
    SetPassword: {
        screen: SetPassword,
        navigationOptions: {
        }
    },
    AddSite: {
        screen: AddSite,
        navigationOptions: {
            title: 'Add Site'
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login'
        }
    }
}, {
});
