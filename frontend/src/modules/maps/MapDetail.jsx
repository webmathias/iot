import React, { Component } from 'react'
import { connect } from 'react-redux'  
import { wsStatusStart, wsStatusStop } from './mapsActions'
import MapDetail from '../../ui/MapDetail'

const mapsStateToProps = (state) => ({
    currentMap: state.maps.currentMap,
    messages: state.maps.messages
})
const mapDispatchToProps = dispatch=>({
    startMonitoring: (sensors) => {
        console.log('startMonitoring:',sensors);
        wsStatusStart(dispatch, sensors)
    },
    wsStatusStop,
})
export default connect(mapsStateToProps, mapDispatchToProps)(MapDetail)