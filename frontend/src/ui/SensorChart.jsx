import React, { Component } from 'react'; 
import $ from 'jquery';
import c3 from 'c3';
import '../css/c3.min.css'; 
import connectIconON from '../icons/ic_compare_arrows_green_24px.svg'
import connectIconOFF from '../icons/ic_compare_arrows_red_24px.svg'

class SensorChart extends Component {
    componentDidMount() {
        const { wsStatusStop } = this.props;
        if (this.modal && this.props.hasSelectedSensor) {
            $(this.modal).modal();
            $(this.modal).on('hidden.bs.modal', function (e) {
                wsStatusStop();
            })
        }
    }
    componentWillUnmount() {


    }
    componentDidUpdate() {
        console.log('SensorChart - componentDidUpdate')
        const { hasSelectedSensor, startMonitoring, selectedSensor } = this.props;
        const {sensor, values} = selectedSensor;
        if (this.modal && hasSelectedSensor) {
            $(this.modal).modal();

        }

        let data = [];
        if (values) {
            if (sensor !== '')
                startMonitoring(sensor)
            data = values.reduce((r, c) => {
                r[0].push(new Date(c.data));
                r[1].push(c.value);
                return r;
            }, [['x'], ['data1']]);
        }
        if (this.chartRef) {
            this.chartRef.load({
                columns: data
            });


        } else {
            this.chartRef = c3.generate({
                bindto: this.chart,
                size: {
                    height: 400,
                    width: 600
                },
                data: {
                    x: 'x',
                    columns: data
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%H:%M:%S'
                        }
                    }
                }
            });
        }

        setTimeout(e => this.chartRef.resize({ height: this.chart.clientHeight, width: this.chart.clientWidth }), 300);



    }

    render() {
        const { selectedSensor, wsConnection, startMonitoring } = this.props;
        const {sensor} = selectedSensor;
        return (<div className="modal  fade " ref={e => this.modal = e} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {wsConnection ? <img src={connectIconON} onClick={() => startMonitoring(sensor)} />
                            :<img src={connectIconOFF} onClick={() => startMonitoring(sensor)} />}
                            &nbsp; Sensor - {sensor ? sensor : 'Carregando...'}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div ref={e => this.chart = e} style={{ height: '400px' }}></div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default SensorChart