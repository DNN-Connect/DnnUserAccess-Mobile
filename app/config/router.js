import React from 'react';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import AddSite from '../screens/AddSite';
import Sites from '../screens/Sites';
import Users from '../screens/Users';
import UserDetail from '../screens/UserDetail';
import Me from '../screens/Me';
import Login from '../screens/Login';

export const UserStack = StackNavigator({
    Users: {
        screen: Users,
        navigationOptions: {
        }
    },
    Details: {
        screen: UserDetail,
        navigationOptions: {
            title: 'User'
        }
    }
});

export const SiteTabs = TabNavigator({
    Users: {
        screen: UserStack,
        navigationOptions: {
            tabBarLabel: 'Users',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>
        }
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel: 'Me',
            tabBarIcon: ({tintColor}) => <Icon name="account-circle" size={35} color={tintColor}/>
        }
    }
});

export const Root = StackNavigator({
    Sites: {
        screen: Sites,
        navigationOptions: {
            title: 'DNN Sites'
        }
    },
    Site: {
        screen: SiteTabs,
        navigationOptions: {
            title: 'Site'
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
    headerMode: 'none',
});
