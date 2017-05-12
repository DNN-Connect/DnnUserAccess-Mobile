import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const roles = createReducer({ 
    groups: [], 
    currentRoleGroupId: -1,
    currentRoles: []
 }, {
    [types.SET_ROLE_GROUPS](state, action) {
        return {
            groups: action.roleGroups,
            currentRoles: [],
            currentRoleGroupId: -1,
        }
    },
    [types.SET_ROLES](state, action) {
        return {
            groups: state.groups,
            currentRoles: action.roles,
            currentRoleGroupId: action.roleGroupId
        }
    },
});
