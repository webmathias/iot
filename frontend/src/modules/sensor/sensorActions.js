import { BASE_URL, BASE_WS_URL } from '../../utils/config';
import axios from 'axios';
export const FETCH_SENSORS = "FETCH_SENSORS";
export const INVALID_FILTER = "INVALID_FILTER";
export const SELECT_SENSOR = "SELECT_SENSOR";
export const SENSOR_UPDATE = "SENSOR_UPDATE";
export const CLOSE_CHART = "CLOSE_CHART";
export const WS_CONNECTED = "WS_CONNECTED";
export const WS_DISCONNECTED = "WS_DISCONNECTED";
export const closeChart = () => ({
    type: CLOSE_CHART
})
export const selectSensor = (sensorName) => ({
    type: SELECT_SENSOR,
    payload: axios.get(BASE_URL + '/sensor/values?name=' + sensorName)
})

export const fetchSensors = (filter) => {
    return {
        type: FETCH_SENSORS,
        payload: axios.get(`${BASE_URL}/sensor/list?name=${filter}&limit=10`)
    }
}
let wsStatus = undefined;
let lastConnection = [];
export const wsStatusStop = () => {
    if (wsStatus) {
        wsStatus.close();
    }
    return {
        type: WS_DISCONNECTED
    }
}
export const wsStatusStart = (dispatch, sensors) => {
    if (!sensors || sensors.length === 0) return;
    if(!Array.isArray(sensors)){
        sensors = [sensors];
    }
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
            type: WS_CONNECTED
        })

    }
    wsStatus.onmessage = msg => {
        console.log('message:', msg)
        dispatch({
            type: SENSOR_UPDATE,
            payload: JSON.parse(msg.data)
        })
    }
    wsStatus.onclose = (e) => {
        console.log("WS onclose:",e)
        lastConnection = [];
        dispatch({
            type: WS_DISCONNECTED
        })
    }
    wsStatus.onerror = (err) => {
        lastConnection = [];
        dispatch({
            type: WS_DISCONNECTED
        })
    }
}