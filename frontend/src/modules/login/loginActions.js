import axios from 'axios'
import {BASE_URL} from '../../utils/config'

export const LOGIN = 'LOGIN';

export function login(values) {
    return {
        type: LOGIN,
        payload: axios.post(BASE_URL + '/login', values).then(res=>{
            instance.defaultConfig.headers.authorization = 'bearer '+res.data;
            return res;
        })
    }
}