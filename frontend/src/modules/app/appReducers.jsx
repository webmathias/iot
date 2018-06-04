import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import loginReducer from '../login/loginReducer'
import sensorReducer from '../sensor/sensorReducer'
import paletteReducer from '../palette/paletteReducer'
import mapReducer from '../editor/mapReducer'
import mapsReducer from '../maps/mapsReducer'
import {actions} from '../maps/mapsActions'
const menuReducer = (state = {
    currentUrl: '/'
}, action) => {
    switch (action.type) {
        case "CHANGE_PAGE":
            return Object.assign({}, { ...state }, { currentUrl: action.payload })
        case actions.FETCH_MAP_DETAIL + "_FULFILLED":
            return Object.assign({}, { ...state }, { currentUrl: '/mapas/detail' })
            break;
        default:
            return state
    }
};
export const goto = (url) => {
    return {
        type: "CHANGE_PAGE",
        payload: url,

    }
};
export default combineReducers({
    login: loginReducer,
    sensors: sensorReducer,
    palette: paletteReducer,
    map: mapReducer,
    maps: mapsReducer,
    form,
    menu: menuReducer
})