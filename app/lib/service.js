import { Alert } from 'react-native';
import * as Globals from '../lib/global';

// fetch logger
/*
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};
*/

export default class Service {

    static authenticate(host, scheme, username, password, success, fail) {
        var url = `${scheme}://${host}/DesktopModules/JwtAuth/API/mobile/login`;
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({u: username, p: password}),
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json; charset=utf-8',
                'Cache-Control': 'no-cache'
            }
        })
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            }
            throw "Login failed";
        })
        .then((jwt) => {
            success(jwt);
        })
        .catch(function (err) {
            // console.log(err);
            if (fail) {
                fail(err);
            }
        });
    }

    static renewToken(context, site, expired, fail) {
        var url = `${site.Scheme}://${site.Host}/DesktopModules/JwtAuth/API/mobile/extendtoken`;
        if (Globals.renewingToken) return;
        Globals.renewingToken = true;
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({'rtoken': site.RefreshToken}),
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Authorization': 'Bearer ' + site.Token
            }
        })
        .then((response) => {
            Globals.renewingToken = false;
            if (response.status == 200) {
                return response.json();
            } else if (response.status == 401) {
                expired();
                throw 'Token expired';
            } else {
                throw 'Unexpected error';
            }
        })
        .then((jwt) => {
            context.updateJwt(site, jwt);
        })
        .catch(function (err) {
            // console.log(err);
            if (fail) {
                fail(err);
            }
        });
    }

    static getServiceUrl(site, action) {
        return `${site.Scheme}://${site.Host}/API/PersonaBar/UserAccess/${action}`;
    }
    static getQueryString(params) {
        var esc = encodeURIComponent;
        return Object
            .keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }

    static request(context, site, action, params, success, fail) {

        var method = params.method || 'GET';
        var qs = '';
        var body;
        var headers = params.headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + site.Token
        };

        if (params.data) {
            if (['GET', 'DELETE'].indexOf(method) > -1) 
                qs = '?' + this.getQueryString(params.data);
            else // POST or PUT
                body = JSON.stringify(params.data);
            }
        
        var url = this.getServiceUrl(site, action) + qs;
      
        fetch(url, {method, headers, body})
        .then((response) => {
            if (response.status == 200) {
                // console.log('In one go');
                return response.json();
            } else if (response.status == 401) {
                // console.log('Unauth 1');
                this.renewToken(context, site, () => {
                    // expired ...
                    // must log in again
                    if (!Globals.loggingIn) {
                        Globals.loggingIn = true;
                        context.navigation.navigate("Login", { Site: site });
                        Alert.alert("You must log in again");
                    }
                    throw "Must log in again";
                })
                throw "Trying to renew token";
            } else {
              Alert.alert('Request failed');
              throw ("Request failed");
            }
        })
        .then((json) => {
            // console.log(json);
            success(json);
        })
        .catch((err) => {
            // console.log(err);
            if (fail != undefined) {
                fail(err);
            }
        });
    }

    static searchUsers(context, site, searchText, orderByField, sortOrder, pageIndex, pageSize, success) {
        this.request(context, site, 'Search', {
            data: {
                searchText: searchText,
                orderByField: orderByField,
                sortOrder: sortOrder,
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        }, success);
    }

    static getUser(context, site, userId, success) {
        this.request(context, site, 'GetUser', { data: { userId: userId }}, success);        
    }

    static getRoleGroups(context, site, success) {
        this.request(context, site, 'RoleGroups', { data: {} }, (data) => {
            if (data.length > 0) {
                data.unshift({
                    RoleGroupID: -1,
                    RoleGroupName: "Global Roles"
                });
                data.unshift({
                    RoleGroupID: -2,
                    RoleGroupName: "All Roles"
                });
            }
            success(data);
        });
    }

    static getUserRoles(context, site, userId, roleGroupId, success) {
        this.request(context, site, 'Roles', { data: { userId: userId, roleGroupId: roleGroupId }}, success);        
    }

    static changeUserRole(context, site, userId, roleId, value, roleGroupId, success) {
        this.request(context, site, 'UserRole', { method: 'post', data: { 
            userId: userId, 
            roleId: roleId,
            value: value,
            roleGroupId: roleGroupId
        }}, success);        
    }

    static changeUserProp(context, site, userId, propertyName, value, success) {
        this.request(context, site, 'UserProperty', { method: 'post', data: { 
            userId: userId, 
            propertyName: propertyName,
            newValue: value,
        }}, success);        
    }

    static changeUserPassword(context, site, userId, newPassword, success, fail) {
        this.request(context, site, 'SetPw', { method: 'post', data: { 
            userId: userId, 
            npw: newPassword,
        }}, success, fail);
    }

}