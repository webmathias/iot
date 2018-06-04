import React, {Component} from 'react'
import {Router, Route} from 'react-router';
import createHashHistory from 'history/createHashHistory';
import {connect} from 'react-redux'
import MenuApp from './AppMenu';
import {goto} from '../modules/app/appReducers';
import Login from '../modules/login/Login';
import SensorList from '../modules/sensor/SensorList';
import Editor from '../modules/editor/Editor'
import ListPalette from '../modules/palette/ListPalette'
import MapList from '../modules/maps/MapList'
import MapDetail from '../modules/maps/MapDetail';
const history = createHashHistory({
    queryKey: false
})
const routes = [
    {
        title: '',
        path: '/login',
        component: Login
    },{
        title: 'Sensores',
        path: '/sensor',
        component: SensorList
    },{
        title: 'Editor',
        path: '/editor',
        component: Editor
    },{
        title: 'Palette',
        path: '/palette/list',
        component: ListPalette
    }
    ,{
        title: 'Mapas',
        path: '/mapas/list',
        component: MapList
    }
    ,{
        title: 'Map Detail',
        path: '/mapas/detail',
        component: MapDetail,
        hide: true
    }
];
class RouterConfig extends Component {
    componentDidMount() {
        const {changeUrl, login} = this.props;
        if (!login) {
            changeUrl('/login')
        } else {
            changeUrl(history.location.pathname)
        }
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.currentUrl && nextProps.currentUrl != this.props.currentUrl){
            history.push(nextProps.currentUrl)
            // this.props.changeUrl(nextProps.currentUrl)
        }
        return true;
    }

    render() {
        const {changeUrl, login} = this.props;
        return (
            <Router history={history}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            {login ? <MenuApp routes={routes} changeUrl={changeUrl}/> : null}
                        </div>
                        <div className="col-10">
                            {routes.map((route, index) => <Route key={index} path={route.path}
                                                                 component={route.component}/>)}
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
const mapStateToProps = (state) => ({
    login: state.login.isLoged,
    currentUrl: state.menu.currentUrl
})
const mapDispatch = (dispatch) => ({
    changeUrl: (url) => {
        //history.push(url);
        dispatch(goto(url));
    }
});
export default connect(mapStateToProps, mapDispatch)(RouterConfig);
