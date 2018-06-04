import axios from 'axios'
import {BASE_URL, BASE_WS_URL} from '../../utils/config'
export const actions = {
    FETCH_MAPS:'FETCH_MAPS',
    SELECT_MAP:'SELECT_MAP',
    FETCH_MAP_DETAIL: 'FETCH_MAP_DETAIL',
    WS_MAP_MESSAGE: 'WS_MAP_MESSAGE',
    WS_CONNECTED: "WS_CONNECTED",
    WS_DISCONNECTED: "WS_DISCONNECTED"

}

export const fetchMaps = (filter)=>({
    type: actions.FETCH_MAPS,
    payload: axios.get(BASE_URL+"/map")
})
export const selectMap = (id)=>({
    type: actions.FETCH_MAP_DETAIL,
    payload: axios.get(BASE_URL+"/map/"+id)
})




let wsStatus = undefined;
let lastConnection = [];
export const wsStatusStop = () => {
    if (wsStatus) {
        wsStatus.close();
    }
}
export const wsStatusStart = (dispatch, sensors) => {
    if (!sensors || sensors.length === 0) return;
    if (wsStatus) {

        if (sensors.length == lastConnection.length && sensors.every((v, i) => v === lastConnection[i])) {
            console.log("Mesmo", lastConnection);
            return;
        }
        console.log("Não é o mesmo Fechando conexão", lastConnection);
        wsStatus.close();
    }
    wsStatus = new WebSocket(BASE_WS_URL + "?sensors=" + JSON.stringify(sensors));
    wsStatus.onopen = s => {
        console.log('onopen ws');
        lastConnection = sensors;
        dispatch({
            type: actions.WS_CONNECTED
        })

    }
    wsStatus.onmessage = msg => {
        console.log('message:', msg)
        dispatch({
            type: actions.WS_MAP_MESSAGE,
            payload: JSON.parse(msg.data)
        })
    }
    wsStatus.onclose = (e) => {
        console.log("WS onclose:",e)
        lastConnection = [];
        dispatch({
            type: actions.WS_DISCONNECTED,
            payload: e
        })
    }
    wsStatus.onerror = (err) => {
        lastConnection = [];
        dispatch({
            type: actions.WS_DISCONNECTED,
            payload: err
        })
    }
}