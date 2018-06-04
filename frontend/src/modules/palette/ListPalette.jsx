import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetch, remove, save } from './paletteActions'
import ListPalette from '../../ui/ListPalette'
const mapStateToProps = state => ({
    list: state.palette.list
})
const mapDispatchToProps = {
    fetch,
    remove,
    save
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPalette);