import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import Loader from './modules/app/Loader'

const LoadableOtherComponent = Loadable({
    loader: () => import('./modules/app/App'),
    loading: () => <Loader />,
});


ReactDOM.render(
    <LoadableOtherComponent />
    ,
    document.getElementById('app')
);

