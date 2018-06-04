import axios from 'axios'
import { BASE_URL } from '../../utils/config'
export const SELECT_ITEM = "SELECT_ITEM" 
export const ADD_ITEM_ON_MAP = "ADD_ITEM_ON_MAP"
export const POINT_SELECTED = "POINT_SELECTED"
export const SAVE_PROPERTIES = "SAVE_PROPERTIES"
export const SELECT_EDIT_PROPERTIES = "SELECT_EDIT_PROPERTIES"
export const SAVEMAP = "SAVEMAP"
export const CHANGE_NAME = "CHANGE_NAME"

export const selectItem = (item) => ({
    type: SELECT_ITEM,
    payload: item
})

export const saveMap = (map) => ({
    type: SAVEMAP,
    payload: map._id?axios.post(BASE_URL + "/map", map):axios.put(BASE_URL + "/map", map)
})

export const addItem = (item, x, y) => ({
    type: ADD_ITEM_ON_MAP,
    payload: { item: item, x: x, y: y }
})

export const itemPointSelected = (x,y)=>({
    type: POINT_SELECTED,
    payload: {x:x, y:y}
})
export const saveProperties = (values) => ({
    type:SAVE_PROPERTIES,
    payload: values
})
export const selectProperties = (prop) => ({
    type:SELECT_EDIT_PROPERTIES,
    payload: prop
})
export const changeName = (name) =>({
    type:CHANGE_NAME,
    payload: name
})
 