import axios from 'axios'
import { BASE_URL } from '../../utils/config'
export const ADD_PALETTE = 'ADD_PALETTE';
export const REMOVE_PALETTE = 'REMOVE_PALETTE';
export const FETCH_PALETTE = 'FETCH_PALETTE';
export const FILTER_PALETTE = 'FILTER_PALETTE';

export const save = (values) => {
    const data = new FormData(values);
    data.append('values', JSON.stringify(values));

    const files = values.images.map((img, index) => {
        data.append('' + index + '', img.image[0]);
        console.log(img.image)
        return img.image[0];

    })
    console.log(files)
    return {
        type: ADD_PALETTE,
        payload: axios.put(BASE_URL + "/slice", data)
    }

}
export const fetch = () => {
    return {
        type: FETCH_PALETTE,
        payload: axios.get(BASE_URL + "/slice")
    }
}
export const remove = (id) => {
    return {
        type: REMOVE_PALETTE,
        payload: axios.delete(BASE_URL + "/slice/"+id)
    }
}

export const filter = (name)=> ({
    type: FILTER_PALETTE,
    payload: name
})