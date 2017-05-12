import * as types from './types'
import Api from '../lib/api'

export function setNetwork(status) {
    return {
        type: types.SET_NETWORK,
        network: status,
    }
}

