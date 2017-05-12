import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const sites = createReducer({
    list: [],
    active: {}
}, {
    [types.SET_SITE_LIST](state, action) {
        // console.log(action);
        return {
            list: action.sites,
            active: {},
        };
    },
    [types.CHANGE_ACTIVE_SITE](state, action) {
        return {
            list: state.list,
            active: action.site,
        };
    },
});
