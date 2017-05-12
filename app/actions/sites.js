import * as types from './types'
import Api from '../lib/api'
import { AsyncStorage } from 'react-native';
import * as UserActions from './users';
import * as RoleActions from './roles';
import Service from '../lib/service';

export function addSite(link, jwt) {
    return (dispatch, getState) => {
        // add site to storage
        var newSiteList = [];
        getState().sites.list.forEach((s) => {
            if (s.Host != link.Host) {
                newSiteList.push(s);
            }
        });
        var newSite = {
            PortalName: link.PortalName,
            Host: link.Host,
            Scheme: link.Scheme,
            Username: link.Username,
            DisplayName: jwt.displayName,
            Token: jwt.accessToken,
            RefreshToken: jwt.renewalToken
        }
        newSiteList.push(newSite);
        AsyncStorage.setItem('sites', JSON.stringify(newSiteList));
        dispatch(setSiteList(newSiteList));
    }
}

export function deleteSite(site) {
    return (dispatch, getState) => {
        // add site to storage
        var newSiteList = [];
        getState().sites.list.forEach((s) => {
            if (s.Host != site.Host) {
                newSiteList.push(s);
            }
        });
        AsyncStorage.setItem('sites', JSON.stringify(newSiteList));
        dispatch(setSiteList(newSiteList));
    }
}

export function loadSites() {
    return (dispatch, getState) => {
        AsyncStorage.getItem('sites').then((value) => {
            if (value) {
                dispatch(setSiteList(JSON.parse(value)));
            }
        });
    }
}

export function setSiteList(sites) {
    return {
        type: types.SET_SITE_LIST,
        sites
    }
}

export function changeSite(context, site) {
    return (dispatch, getState) => {
        dispatch(changeActiveSite(site));
        Service.getRoleGroups(context, site, (data) => {
            dispatch(RoleActions.setRoleGroups(data));
        });
    }
}

export function updateJwt(site, jwt) {
    return (dispatch, getState) => {
        var newSiteList = [];
        getState().sites.list.forEach((s) => {
            if (s.Host != site.Host) {
                newSiteList.push(s);
            }
        });
        site.Token = jwt.accessToken;
        site.RefreshToken = jwt.renewalToken;
        newSiteList.push(site);
        AsyncStorage.setItem('sites', JSON.stringify(newSiteList));
        dispatch(setSiteList(newSiteList));
        dispatch(changeActiveSite(site));
        Service.getRoleGroups(getState(), site, (data) => {
            dispatch(RoleActions.setRoleGroups(data));
        });
        dispatch(UserActions.loadUsers(getState(), site, "", "DisplayName", "asc", 0, 20));
    }
}

export function changeActiveSite(site) {
    return {
        type: types.CHANGE_ACTIVE_SITE,
        site
    }
}
