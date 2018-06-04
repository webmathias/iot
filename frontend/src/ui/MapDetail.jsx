import React, { Component } from 'react' 
import Map from './Map'
import {getImageURL} from '../utils/config'
class MapsDetail extends Component {
    componentDidMount(){
        this.checkConnections()
    }
    UNSAFE_componentWillUpdate(nextProps){
        if(this.props.messages.length != nextProps.messages.length && nextProps.messages.length > 0){   
            const changed = nextProps.messages[0]
            const sensor = this.props.currentMap.mapSensors.filter(s=>s.sensor == changed.sensor);
            sensor.map(s => {
                this.mapRef.getWrappedInstance().updateSliceImage(
                    getImageURL(s.slice,changed.value.value),
                    s.position.x,
                    s.position.y,s.slice)
                return
            })
            
        }
        
       
    }
    componentWillUnmount(){
        const {wsStatusStop} = this.props
        wsStatusStop();
    }
    checkConnections(){
        const {startMonitoring, wsStatusStop, currentMap} = this.props;
        if(this.monitoring){
            wsStatusStop()
        }
        if(currentMap && currentMap.mapSensors){
            startMonitoring(currentMap.mapSensors.map(s => s.sensor));
            this.monitoring = true;
        }
        
    }
    
    render() {
        const { currentMap, messages } = this.props
        const { name = '', map = [] } = currentMap;
        return <div>
            <h1>{name}</h1>
            <Map ref={el=>this.mapRef = el} map={map}></Map>
            Mensagens:
            {messages.map((m, index)=>(
                <div key={index}>
                <p>{m.sensor}:{m.value.value}&nbsp;<small>{m.value.data}</small></p>
                </div>
            ))}
        </div>
    }
}

export default MapsDetail