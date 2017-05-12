import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const app = createReducer({
    network: false
}, {
    [types.SET_NETWORK](state, action) {
        var newValue = true;
        switch (action.network.toUpperCase()) {
            case "NONE":
                newValue = false;
        }
        return {
            network: newValue,
        };
    },
});
