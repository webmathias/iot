
const BASE_URL = window.location.host === 'localhost:3000' ? 'http://localhost:8080/api' : '/api';
const BASE_WS_URL = window.location.host === 'localhost:3000' ?
    'ws://localhost:8080/api/sensor/wsstatus' :
    'ws://' + window.location.host + '/api/sensor/wsstatus';
// const BASE_WS_URL = 'wss://cesuscmobile.azurewebsites.net/api/sensor/wsstatus';
const getImageURL = (id, value=0) => {
    return BASE_URL + '/slice/' + id + "/imageByValue/" + value;
}
export { BASE_URL, BASE_WS_URL, getImageURL };