import React, { Component, Fragment } from 'react'
import { fetchSensors, selectSensor, wsStatusStart, wsStatusStop } from './sensorActions';
import { connect } from 'react-redux'; 

import SensorList from '../../ui/SensorList';

const mapStateToProps = (state) => ({
    list: state.sensors.list,
    currentFilter: state.sensors.currentFilter,
    hasSelectedSensor: state.sensors.hasSelectedSensor,
    wsConnection: state.sensors.wsConnection,
    selectedSensor: state.sensors.selectedSensor

});
const mapDispatchToProps = (dispatch) => ({
    fetchSensors: (filter = '') => dispatch(fetchSensors(filter)),
    selectSensor: selected => dispatch(selectSensor(selected)),
    startMonitoring: e=>wsStatusStart(dispatch, e),
    wsStatusStop: wsStatusStop
})

export default connect(mapStateToProps, mapDispatchToProps)(SensorList);