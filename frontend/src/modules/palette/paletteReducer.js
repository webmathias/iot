import { ADD_PALETTE, FETCH_PALETTE, REMOVE_PALETTE, FILTER_PALETTE } from './paletteActions'
const DEFAULT_STATE = {
    list: [],
    listFilterd: [],
    loading: false,
    filter: ""
};


export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case ADD_PALETTE + '_FULFILLED':
            return {
                ...state,
                list: [...state.list, payload.data]
            };
            break;
        case REMOVE_PALETTE + '_FULFILLED':
            return {
                ...state,
                list: state.list.filter(e => e._id != payload.data._id)
            };
            break;

        case FETCH_PALETTE + '_FULFILLED':
            return { ...state, list: payload.data, loading: false, listFilterd: state.filter ? payload.data.filter(i => i.name.toLowerCase().indexOf(state.filter) >= 0) : payload.data };
            break;
        case FETCH_PALETTE + '_REJECTED':
            return { ...state, list: [], loading: true };
            break;
        case FETCH_PALETTE + '_PENDING':
            return { ...state, list: [], loading: true };
            break;
        case FILTER_PALETTE:
            return { ...state, filter: payload, listFilterd: payload ? state.list.filter(i => i.name.toLowerCase().indexOf(payload) >= 0) : state.list }
            break
        default:
            return state;
            break;
    }
}