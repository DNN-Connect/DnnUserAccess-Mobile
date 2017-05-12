import * as types from './types'
import Api from '../lib/api'
import Service from '../lib/service'
import * as RoleActions from './roles'

export function loadUsers(context, site, searchText, orderByField, sortOrder, pageIndex, pageSize) {
    return (dispatch, getState) => {
        dispatch(setUsersLoading(pageIndex));
        Service.searchUsers(context, site, searchText, orderByField, sortOrder, pageIndex, pageSize, (data, site) => {
            if (pageIndex == 0) {
                dispatch(setUsersToState(data.data, data.TotalCount));
            } else {
                dispatch(addUsersToState(data.data, data.TotalCount));
            }
        })
    }
}

export function loadUser(context, site, userId) {
    return (dispatch, getState) => {
        Service.getUser(context, site, userId, (data) => {
            dispatch(setUser(data));
        });
        Service.getUserRoles(context, site, userId, -1, (data) => {
            dispatch(RoleActions.setRoles(-1, data));
        });
    }
}

export function setUser(user) {
    return {
        type: types.SET_USER,
        user: user
    }
}

export function addUsersToState(users, total) {
    return {
        type: types.ADD_USERS,
        users: users,
        total: total
    }
}

export function setUsersToState(users, total) {
    return {
        type: types.SET_USER_LIST,
        users: users,
        total: total
    }
}

export function setUsersLoading(pageIndex) {
    return {
        type: types.SET_USERS_LOADING,
        page: pageIndex,
    }
}

export function changeUserProperty(context, site, userId, propertyName, newValue) {
    return (dispatch, getState) => {
        var state = getState();
        Service.changeUserProp(context, site, userId, propertyName, newValue, (data) => {
            dispatch(setUser(data));
        });
    }
}
