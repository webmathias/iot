import { connect } from 'react-redux'; 
import { wsStatusStart, wsStatusStop, closeChart } from './sensorActions'; 

import SensorChart from '../components/SensorChart'
const mapStateToProps = state => ({
    title: state.sensors.selectedSensor.sensor,
    values: state.sensors.selectedSensor.values,
    hasSelectedSensor: state.sensors.hasSelectedSensor,
    wsConnection: state.sensors.wsConnection
});
const mapDispatchToProps = dispatch => ({
    startMonitoring: (sensor) => {
        wsStatusStart(dispatch, [sensor])
    },
    wsStatusStop,
    closeChart: () => { dispatch(closeChart()) }
})
export default connect(mapStateToProps, mapDispatchToProps)(SensorChart);