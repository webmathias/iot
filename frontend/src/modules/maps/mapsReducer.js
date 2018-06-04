import { actions } from './mapsActions'
const DEFAULT_STATE = {
    list: [],
    currentMap: {},
    messages: []
}

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case actions.FETCH_MAPS + "_FULFILLED":
            return { ...state, list: payload.data }
            break
        case actions.FETCH_MAP_DETAIL + "_FULFILLED":
            return { ...state, currentMap: payload.data }
            break;
        case actions.WS_CONNECTED:
            return { ...state, messages: [] }
            break;
        case actions.WS_DISCONNECTED:
            return { ...state, messages: [] }
            break;
        case actions.WS_MAP_MESSAGE:
            return { ...state, messages: [payload,...state.messages] }
            break;
        default:
            return state
    }
}