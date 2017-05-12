import * as types from './types'
import Api from '../lib/api'
import { AsyncStorage } from 'react-native';
import * as UserActions from './users';
import Service from '../lib/service';

export function changeRoleGroup(context, site, roleGroupId) {
    return (dispatch, getState) => {
        var state = getState();
        Service.getUserRoles(context, site, state.users.currentUser.UserId, roleGroupId, (data) => {
            dispatch(setRoles(roleGroupId, data));
        });
    }
}

export function changeUserRoleStatus(context, site, userId, roleId, status, roleGroupId) {
    return (dispatch, getState) => {
        var state = getState();
        Service.changeUserRole(context, site, userId, roleId, status, roleGroupId, (data) => {
            dispatch(setRoles(roleGroupId, data));            
        });
    }
}

export function loadRoleGroups(context, site) {
    return (dispatch, getState) => {
        Service.getRoleGroups(context, site, (data) => {
            dispatch(setRoleGroups(data));
        });
    }
}

export function setRoleGroups(roleGroups) {
    return {
        type: types.SET_ROLE_GROUPS,
        roleGroups,
    }
}

export function setRoles(roleGroupId, roles) {
    return {
        type: types.SET_ROLES,
        roleGroupId: roleGroupId,
        roles: roles,
    }
}
