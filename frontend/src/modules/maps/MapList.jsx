import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, fetchMaps,selectMap } from './mapsActions' 
import MapList from '../../ui/MapList'

const mapStateToProps = (state) => ({
    list: state.maps.list
})
const mapDispatchToProps = ({
    fetchMaps,
    selectMap 
})
export default connect(mapStateToProps, mapDispatchToProps)(MapList);