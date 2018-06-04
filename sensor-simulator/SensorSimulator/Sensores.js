/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    Slider,
    Switch,
    View,
    ScrollView,
    StatusBar,
    NativeModules,
    DeviceEventEmitter,
    Image
} from 'react-native';

const lightON = require('./icons/lightON.png')
const lightOFF = require('./icons/lightOFF.png')

let SensorModule = NativeModules.SensorModule;
const sensors_type = [
    {
        name: 'ACELEROMETER',
        type: SensorModule.ACELEROMETER
    },
    {
        name: 'LIGHT',
        type: SensorModule.LIGHT
    },
    {
        name: 'AMBIENT_TEMPERATURE',
        type: SensorModule.AMBIENT_TEMPERATURE
    },
    {
        name: 'GYROSCOPE',
        type: SensorModule.GYROSCOPE
    },
    {
        name: 'MAGNETIC_FIELD',
        type: SensorModule.MAGNETIC_FIELD
    },
    {
        name: 'PROXIMITY',
        type: SensorModule.PROXIMITY
    },
    {
        name: 'GRAVITY',
        type: SensorModule.GRAVITY
    },
    {
        name: 'STEP_DETECTOR',
        type: SensorModule.STEP_DETECTOR
    },
    {
        name: 'STEP_COUNTER',
        type: SensorModule.STEP_COUNTER
    }
]
class Sensores extends Component {
    static navigationOptions = {
        title: 'Sensores',
    };
    constructor(props) {
        super(props);
        this.state = {}
        this.ws = {}
    }
    componentDidMount() {

        DeviceEventEmitter.addListener(
            'SensorChanged',
            (data) => {
                let newState = {}
                let name = sensors_type.find(sensor => sensor.type == data.type).name;
                newState[name] = data.values;
                this.setState(newState);
                if (data.values && this.ws[name] && this.ws[name].readyState === this.ws[name].OPEN)
                    this.ws[name].send(data.values[0].toFixed(2))
            });
        this.startLight('LIGHT001')
    }
    componentWillUnmount() {
        this.stopLight('LIGHT001')
        SensorModule.stopSensor(SensorModule.ACELEROMETER)

    }
    startLight(sensor) {
        let newState = {}
        newState[sensor] = []
        this.setState(newState);
        this.ws[sensor] = new WebSocket('ws://webmathias-com-br.umbler.net/api/sensor/ws/' + sensor, {
            perMessageDeflate: false
        });


        this.ws[sensor].onopen = () => {
            console.log("Conectado");
            this.ws[sensor].send('0')
        };

        this.ws[sensor].onmessage = (msg) => {
            console.log("Mensagem");
            console.log(msg.data);
            newState[sensor] = { active: parseInt(msg.data) };
            this.setState(newState);

        };

        this.ws[sensor].onclose = (err) => {
            console.log("Close", sensor);
            delete this.ws[sensor];
        };
    }
    stopLight(sensor) {
        let newState = {}
        newState[sensor] = undefined;
        this.setState(newState);
        this.ws[sensor].close()
    }
    start(sensor) {
        SensorModule.startSensor(sensor.type);
        let newState = {}
        newState[sensor.name] = []
        this.setState(newState);
        this.ws[sensor.name] = new WebSocket('ws://webmathias-com-br.umbler.net/api/sensor/ws/' + sensor.name, {
            perMessageDeflate: false
        });


        this.ws[sensor.name].onopen = () => {
            console.log("Conectado Enviando informação de teste");
        };

        this.ws[sensor.name].onmessage = (data) => {
            console.log("Mensagem");
            console.log(data);
        };

        this.ws[sensor.name].onclose = (err) => {
            console.log("Close", sensor.name);
            delete this.ws[sensor.name];
        };
    }
    stop(sensor) {
        let newState = {}
        newState[sensor.name] = undefined;
        this.setState(newState);
        SensorModule.stopSensor(sensor.type)
        this.ws[sensor.name].close()
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"

                />
                <ScrollView>
                    <Text style={styles.h1}>Sensores</Text>

                    {sensors_type.map(sensor => {
                        return <View style={styles.sensor} key={sensor.type}>

                            <Switch value={this.state[sensor.name] ? true : false}
                                onValueChange={e => {
                                    this.state[sensor.name] ? this.stop(sensor) : this.start(sensor)
                                }} />
                            <Text>{sensor.name}</Text>
                            {this.state[sensor.name] ? (
                                <Text>
                                    : {(this.state[sensor.name][0] || 0).toFixed(2)}
                                </Text>
                            ) : null}
                        </View>

                    })}
                    <Text style={styles.h1}>Atuadores</Text>
                    <View style={styles.sensor}>
                        {this.state['LIGHT001'] && this.state['LIGHT001'].active ? (
                            <Image source={lightON} />
                        ) : (
                                <Image source={lightOFF} />
                            )}

                        <Text>LIGHT001</Text>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    sensor: {
        flexDirection: 'row',
        padding: 5,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});
export default Sensores