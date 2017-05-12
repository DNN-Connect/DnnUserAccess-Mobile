import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const users = createReducer({
    list: [],
    total: 0,
    loading: false,
    loadingFirstPage: false,
    currentUser: {}
}, {
    [types.SET_USER_LIST](state, action) {
        return {
            list: action.users,
            total: action.total,
            loading: false,
            loadingFirstPage: false,
            currentUser: state.currentUser,
        };
    },
    [types.ADD_USERS](state, action) {
        var newState = state.list.slice();
        newState = newState.concat(action.users);
        return {
            list: newState,
            total: action.total,
            loading: false,
            loadingFirstPage: false,
            currentUser: state.currentUser,
        };
    },
    [types.SET_USERS_LOADING](state, action) {
        return {
            list: state.list,
            total: state.total,
            loading: action.page == 0 ? false : true,
            loadingFirstPage: action.page == 0 ? true : false,
            currentUser: state.currentUser,
        };
    },
    [types.SET_USER](state, action) {
        return {
            list: state.list,
            total: state.total,
            loading: state.loading,
            loadingFirstPage: state.loadingFirstPage,
            currentUser: action.user,
        };
    },
    [types.MUST_LOGIN](state, action) {
        return {
            list: state.list,
            total: state.total,
            loading: false,
            loadingFirstPage: false,
            currentUser: state.currentUser,
        };
    },
});
