import React, { Component } from 'react'
import { connect } from 'react-redux'
import {reduxForm} from 'redux-form'
import { filter, fetch } from '../palette/paletteActions'
import {saveProperties,selectProperties, selectItem, saveMap, changeName, addItem, itemPointSelected } from './mapActions'

import Editor from '../../ui/Editor'

const mapStateToProps = state => ({
    palette: state.palette.listFilterd,
    filterText: state.palette.filter,
    selectedItem: state.map.selectedItem,
    currentSelected: state.map.currentSelected,
    map: state.map.map,
    mapName: state.map.mapName,
    mapSensors: state.map.mapSensors,
    selectedProperty: state.map.selectedProperty
})
const mapDispatchToProps = ({
    selectItem,
    filter,
    saveMap,
    changeName,
    addItem,
    itemSelected: itemPointSelected,
    selectProperties,
    saveProperties
})
export default reduxForm({ form: 'PropertiesForm' })(connect(mapStateToProps, mapDispatchToProps)(Editor))


