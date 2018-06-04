import { CHANGE_NAME, SELECT_ITEM, ADD_ITEM_ON_MAP, POINT_SELECTED, SAVE_PROPERTIES, SELECT_EDIT_PROPERTIES } from './mapActions'
let map = [];
let mapSize = 10;
let temp = new Array(mapSize)
for (let i = 0; i < mapSize; i++) {
    map.push(new Array(mapSize));
}
const DEFAULT_STATE = {
    selectedItem: null,
    map: map,
    mapSensors: [
        // {
        //     sensor: id,
        //     slice: id,
        //     name: String
        // }
    ],
    mapName: "",
    currentSelected: null,
    selectedProperty: null
}

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case SELECT_ITEM:
            return { ...state, selectedItem: payload }
            break;
        case ADD_ITEM_ON_MAP:
            let temp = [...state.map]
            temp[payload.x][payload.y].push(payload.item)
            if (payload.item.type === 'SENSOR' || payload.item.type === 'ATUADOR') {
                return {
                    ...state,
                    map: temp,
                    mapSensors:
                        [
                            ...state.mapSensors,
                            {
                                slice: payload.item.id,
                                sensor: '',
                                position: { x: payload.x, y: payload.y }
                            }
                        ]
                }
            }
            return { ...state, map: temp }
        case POINT_SELECTED:
            return { ...state, currentSelected: payload }
        case SAVE_PROPERTIES:
            // TODO: Fazer estado baseado na sel
            return {
                ...state, mapSensors: state.mapSensors.map(s => {
                    if (s.slice == state.selectedProperty.slice && s.position == state.selectedProperty.position) {
                        return {
                            ...s,
                            name: payload.name,
                            sensor: payload.sensor
                        }
                    }
                    return s;
                }),
                selectedProperty: null
            }
        case SELECT_EDIT_PROPERTIES:
            return { ...state, selectedProperty: payload }
            break;
        case CHANGE_NAME:
            return { ...state, mapName: payload }
            break;
        default:
            return state
            break;
    }
}