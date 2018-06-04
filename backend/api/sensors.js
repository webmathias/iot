const express = require('express');
const Sensor = require('../models/sensor');

const router = express.Router();
require('express-ws')(router);

/**
 * @api {get} /api/sensor/ Add
 * @apiDescription Add new Sensor Value
 * 
 * @apiGroup Sensor
 *
 * @apiParam {String} name Sensor name.
 * @apiParam {Number} value Sensor current value.
 *
 */
router.get('/', (req, res) => {
    const name = req.query.name;
    const value = req.query.value;
    if (!name || !value) {
        return res.sendStatus(500);
    }
    var _new = new Sensor({
        name: name,
        value: value,
        data: new Date()
    });
    _new.save((err, saved) => {
        if (!saved || err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
        if (sensors[name]) {
            const ws = sensors[name];
            ws.send(value+"");
        }
    })
    sendStatusToListeners(name, value);
});

/**
 * @api {get} /api/sensor/list List
 * @apiDescription List Sensors name
 * 
 * @apiGroup Sensor
 *
 * @apiParam {String} name Sensor name (optional). 
 *
 */
router.get('/list', (req, res) => {
    var query = {};
    if (req.query.name) {
        query.name = new RegExp(req.query.name + '*', 'i')
    }
    Sensor.distinct("name", query, (err, list) => {
        res.json(list || []);
    })
});
/**
 * @api {get} /api/sensor/values Values
 * @apiDescription List Sensor values
 * 
 * @apiGroup Sensor
 *
 * @apiParam {String} name Sensor name. 
 *
 */
router.get('/values', (req, res) => {

    var query = {};
    if (req.query.name) {
        query.name = req.query.name
    } else {
        return res.json([]);
    }
 
    Sensor.find(query, {value:true, data: true}).sort('-data').limit(req.query.limit || 100).exec((err, list) => {
        res.json({ sensor: query.name, values: list || [] });
    })
});

/**
 * @api {get} /api/sensor/enable/:sensor Enable
 * @apiDescription Send Information to enable sensor
 * 
 * @apiGroup WebSocketSensor
 *
 * @apiSuccess (200) String OK Message sent to sensor
 * @apiError (500) String ERROR Sensor offline
 */
router.get('/enable/:sensor', (req, res) => {
    const sensor = req.params.sensor;
    if (sensors[sensor]) {
        const ws = sensors[sensor];
        ws.send('1');

        return res.sendStatus(200);
    }
    return res.sendStatus(500);


});

/**
 * @api {get} /api/sensor/disable/:sensor Disable
 * @apiDescription Send Information to disable sensor
 * 
 * @apiGroup WebSocketSensor
 * 
 * @apiSuccess (200) String OK Message sent to sensor
 * @apiError (500) String ERROR Sensor offline
 */
router.get('/disable/:sensor', (req, res) => {
    const sensor = req.params.sensor;
    if (sensors[sensor]) {
        const ws = sensors[sensor];
        ws.send('0');
        return res.sendStatus(200);
    }
    return res.sendStatus(500);
});

/**
 * @api {get} /api/sensor/status/:sensor StatusSensor
 * @apiDescription Get sensor status information
 * 
 * @apiGroup WebSocketSensor
 *
 */
router.get('/status/:sensor', (req, res) => {
    const sensor = req.params.sensor;
    if (sensors[sensor]) {
        // const ws = sensors[sensor];
        return res.send('Connected');
    }
    res.send('Disconnected');
});

/**
 * @api {get} /api/sensor/status/ ConnectedSensors
 * @apiDescription List current connected sensor
 * 
 * @apiGroup WebSocketSensor
 *
 */
router.get('/status/', (req, res) => {
    res.json(Object.keys(sensors));
});

/**
 * @api {ws} /api/sensor/ws/:sensor WebSocket
 * @apiDescription Connection endpoint to websocket
 * 
 * @apiGroup WebSocketSensor
 * @apiExample NodeJS
 * const WebSocket = require('ws'); 
 * const sensorName = '123';
 * const ws = new WebSocket(''ws://cesuscmobile.azurewebsites.net/api/sensor/ws/'+sensorName, {
 *     perMessageDeflate: false
 * });
 * ws.on('open', function open() {
 *     console.log("Conectado Enviando informação de teste");
 *     ws.send('5');
 * });
 * ws.on('message', function incoming(data) {
 *     console.log("Mensagem");
 *     console.log(data);
 * });
 * ws.on('error', function incoming(err) {
 *     console.log("Error:", err);
 * });
 *
 * @apiExample Arduino
 * //Source: https://github.com/krohling/ArduinoWebsocketClient
 * // Precisa ser checado no arduino
 * byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
 * char server[] = "cesuscmobile.azurewebsites.net/api/sensor/ws/123";
 * WebSocketClient client;
 * void setup() {
 *   Serial.begin(9600);
 *   Ethernet.begin(mac);
 *   client.connect(server);
 *   client.setDataArrivedDelegate(dataArrived);
 *   // Enviando dado de exemplo
 *   client.send("5");
 * }
 * void loop() {
 *   client.monitor();
 * }
 * void dataArrived(WebSocketClient client, String data) {
 *   // Recebendo dado, tratar para ligar ou desligar o sensor
 *   Serial.println("Data Arrived: " + data);
 * }
 */
const sensors = {};
router.ws('/ws/:sensor', function (ws, req) {
    const sensor = req.params.sensor;
    console.log('connected:', sensor);
    sensors[sensor] = ws;
    ws.on('message', function (msg) {
        console.log(msg);
        //   ws.send(msg);
        var _new = new Sensor({
            name: sensor,
            value: msg,
            data: new Date()
        });
        _new.save((err, saved) => {
            if (!saved || err) {
                console.log('Erro ao salvar valor no banco:', saved)
                return;
            }
        })
        sendStatusToListeners(sensor, msg);

    });
    ws.on('close', () => {
        delete sensors[sensor];
    });
    ws.on('disconnect', () => {
        delete sensors[sensor];
    });
    ws.on('error', () => {
        delete sensors[sensor];
    })
});
/**
 * @api {ws} /api/sensor/ws/:sensor WebSocket
 * @apiDescription Connection endpoint to websocket
 * 
 */
const listeners = {};
router.ws('/wsstatus', function (ws, req) {
    console.log('query:', req.query);
    const live = req.query['live'];
    if(live){
        ws.liveInfo = 1;
    }
    const listSensors = JSON.parse(req.query.sensors || '[]');
    console.log(listSensors)
    console.log(typeof listSensors);
    for (var i of listSensors) {
        console.log(i);
        if (!listeners[i])
            listeners[i] = []
        listeners[i].push(ws);
        
        sendCurrentValue(i);
    }
    console.log("Connectado: "+listSensors);
     
    
    ws.on('message', function (msg) {
    })
    ws.on('close', () => {
        for (var i of listSensors) {
            if (!listeners[i]) continue
            var index = listeners[i].indexOf(ws);
            if (index > -1) {
                listeners[i].splice(index, 1);
            }
            delete listeners[i];
        }
    });
    ws.on('disconnect', () => {
        for (var i of listSensors) {
            if (!listeners[i]) continue
            var index = listeners[i].indexOf(ws);
            if (index > -1) {
                listeners[i].splice(index, 1);
            }
            delete listeners[i];
        }
    });
    ws.on('error', () => {
        for (var i of listSensors) {
            if (!listeners[i]) continue
            var index = listeners[i].indexOf(ws);
            if (index > -1) {
                listeners[i].splice(index, 1);
            }
            delete listeners[i];
        }
    })
})
/***************** EXTRA FUNCIONS **********************/
const sendCurrentValue = (sensor) => {
    console.log("Sensor"+ sensor);
    Sensor.find({name:sensor}, {value:true}).sort('-data').limit(2).exec((err, list) => {
        console.log('list:' +list);
        console.log('error:' + err);
        if(!err && list && list[0]){
            sendStatusToListeners(sensor, list[0].value)   
        }
        
    })
}
const sendStatusToListeners = (sensor, value) => {
    try {
        if (listeners[sensor] && listeners[sensor].length) {
            console.log('enviando para: ', listeners[sensor].length);
            for (let ws of listeners[sensor]) {
                if(ws.liveInfo){
                    ws.send(parseFloat(value))        
                }else{
                    ws.send(JSON.stringify({ sensor: sensor, value: { value: parseFloat(value), data: new Date() } }))
                }
            }
        }
    } catch (error) {
        console.log("ERROR:", error);
    }

}
module.exports = router;