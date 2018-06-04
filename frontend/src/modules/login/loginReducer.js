import {LOGIN} from './loginActions';
export default (state = {isLoged: true, error: ''}, action) => {
    if(!action.payload) return state;
    switch (action.type) {
        case LOGIN:
            if (action.payload.status || (action.payload.response && action.payload.response.status)) {
                switch (action.payload.status || action.payload.response.status) {
                    case 200:
                        return {...state, isLoged: true, error: ''}
                    case 401:
                        return {...state, isLoged: false, error: 'Usuário ou senha invalidos'}
                }
            }
            return {...state, isLoged: false, error: 'Erro ao tentar acessar o servidor'}
        default:
            return state;
    }
}