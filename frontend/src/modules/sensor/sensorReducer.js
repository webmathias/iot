
import { 
    FETCH_SENSORS, 
    INVALID_FILTER, 
    SELECT_SENSOR, 
    SENSOR_UPDATE, 
    CLOSE_CHART, 
    WS_CONNECTED, 
    WS_DISCONNECTED } from './sensorActions';
const EMPTY_SENSOR = {
    sensor: '',
    values: []
};
const DEFAULT_STATE = {
    list: [],
    selectedSensor: EMPTY_SENSOR,
    hasSelectedSensor: false,
    wsConnection: false,
    limit: 100
};
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case WS_CONNECTED:
            return { ...state, wsConnection: true }
            break
        case WS_DISCONNECTED:
            return { ...state, wsConnection: false,hasSelectedSensor:false, selectedSensor: EMPTY_SENSOR }
            break
        case FETCH_SENSORS + '_FULFILLED':
            return Object.assign({}, state, { list: action.payload.data });
            break;
        case INVALID_FILTER:
            return Object.assign({}, state, { list: [] });
            break;
        case SENSOR_UPDATE:
            const data = action.payload;
            console.log(data)
            if (state.selectedSensor && state.selectedSensor.values && state.selectedSensor.sensor == data.sensor) {
                const newselectedSensor = Object.assign(
                    state.selectedSensor,
                    { values: [data.value, ...state.selectedSensor.values] })
                    if(newselectedSensor.values.length> state.limit){
                        newselectedSensor.values.splice(state.limit, newselectedSensor.values.length-state.limit)
                    }
                return Object.assign({}, state, { selectedSensor: newselectedSensor })
            }
            return state;
            break;
        case SELECT_SENSOR + '_FULFILLED':
            return Object.assign({}, state, { selectedSensor: action.payload.data });
            break;
        case SELECT_SENSOR + '_REJECTED':
            return Object.assign({}, state, { selectedSensor: EMPTY_SENSOR, hasSelectedSensor: false });
            break;
        case SELECT_SENSOR + '_PENDING':
            return Object.assign({}, state, { selectedSensor: EMPTY_SENSOR, hasSelectedSensor: true });
            break;
        case CLOSE_CHART:
            return Object.assign({}, state, { selectedSensor: EMPTY_SENSOR, hasSelectedSensor: false });
        default:
            return state;
    }
}