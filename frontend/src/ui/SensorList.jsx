import React, { Component, Fragment } from 'react'  
import SensorChart from './SensorChart'; 
import chartIcon from '../icons/ic_show_chart_black_24px.svg'

const SensorItem = ({sensor, onClick}) => (<div onClick={onClick} className="list-group-item list-group-item-action">
<img src={chartIcon}/> ::. {sensor}</div>)

class SensorList extends Component {
    componentDidMount() {
        const { fetchSensors } = this.props;
        console.log(this.props);
        fetchSensors();
    }
    render() {
        const { list, fetchSensors, selectSensor,hasSelectedSensor } = this.props;
        return (
            <Fragment>
                <div className="container">
                    <div className="form-group">
                        <input type="email" className="form-control" onChange={e => { fetchSensors(e.target.value) }} placeholder="Sensor Name" />
                        <small id="emailHelp" className="form-text text-muted">Minimun 1 characters</small>
                    </div>
                    <div className="list-group">
                        {list.map((sensor, index) => <SensorItem onClick={e => selectSensor(sensor)} key={index} sensor={sensor}/>)}
                    </div>
                </div>
                {hasSelectedSensor?<SensorChart {...this.props} />:null}
                
            </Fragment>
        )
    }
};
export default SensorList