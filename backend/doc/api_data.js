define({ "api": [
  {
    "type": "get",
    "url": "/api/sensor/",
    "title": "Add",
    "description": "<p>Add new Sensor Value</p>",
    "group": "Sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Sensor name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "value",
            "description": "<p>Sensor current value.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "Sensor",
    "name": "GetApiSensor"
  },
  {
    "type": "get",
    "url": "/api/sensor/list",
    "title": "List",
    "description": "<p>List Sensors name</p>",
    "group": "Sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Sensor name (optional).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "Sensor",
    "name": "GetApiSensorList"
  },
  {
    "type": "get",
    "url": "/api/sensor/values",
    "title": "Values",
    "description": "<p>List Sensor values</p>",
    "group": "Sensor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Sensor name.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "Sensor",
    "name": "GetApiSensorValues"
  },
  {
    "type": "get",
    "url": "/api/slice/",
    "title": "List",
    "description": "<p>List Slices</p>",
    "group": "Slice",
    "version": "0.0.0",
    "filename": "api/slice.js",
    "groupTitle": "Slice",
    "name": "GetApiSlice"
  },
  {
    "type": "put",
    "url": "/api/slice/",
    "title": "Add",
    "description": "<p>Add New Slice</p>",
    "group": "Slice",
    "version": "0.0.0",
    "filename": "api/slice.js",
    "groupTitle": "Slice",
    "name": "PutApiSlice"
  },
  {
    "type": "get",
    "url": "/api/sensor/disable/:sensor",
    "title": "Disable",
    "description": "<p>Send Information to disable sensor</p>",
    "group": "WebSocketSensor",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "String",
            "description": "<p>OK Message sent to sensor</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "String",
            "description": "<p>ERROR Sensor offline</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "WebSocketSensor",
    "name": "GetApiSensorDisableSensor"
  },
  {
    "type": "get",
    "url": "/api/sensor/enable/:sensor",
    "title": "Enable",
    "description": "<p>Send Information to enable sensor</p>",
    "group": "WebSocketSensor",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "String",
            "description": "<p>OK Message sent to sensor</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "String",
            "description": "<p>ERROR Sensor offline</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "WebSocketSensor",
    "name": "GetApiSensorEnableSensor"
  },
  {
    "type": "get",
    "url": "/api/sensor/status/",
    "title": "ConnectedSensors",
    "description": "<p>List current connected sensor</p>",
    "group": "WebSocketSensor",
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "WebSocketSensor",
    "name": "GetApiSensorStatus"
  },
  {
    "type": "get",
    "url": "/api/sensor/status/:sensor",
    "title": "StatusSensor",
    "description": "<p>Get sensor status information</p>",
    "group": "WebSocketSensor",
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "WebSocketSensor",
    "name": "GetApiSensorStatusSensor"
  },
  {
    "type": "ws",
    "url": "/api/sensor/ws/:sensor",
    "title": "WebSocket",
    "description": "<p>Connection endpoint to websocket</p>",
    "group": "WebSocketSensor",
    "examples": [
      {
        "title": "NodeJS",
        "content": "const WebSocket = require('ws'); \nconst sensorName = '123';\nconst ws = new WebSocket(''ws://cesuscmobile.azurewebsites.net/api/sensor/ws/'+sensorName, {\n    perMessageDeflate: false\n});\nws.on('open', function open() {\n    console.log(\"Conectado Enviando informação de teste\");\n    ws.send('5');\n});\nws.on('message', function incoming(data) {\n    console.log(\"Mensagem\");\n    console.log(data);\n});\nws.on('error', function incoming(err) {\n    console.log(\"Error:\", err);\n});",
        "type": "json"
      },
      {
        "title": "Arduino",
        "content": "//Source: https://github.com/krohling/ArduinoWebsocketClient\n// Precisa ser checado no arduino\nbyte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };\nchar server[] = \"cesuscmobile.azurewebsites.net/api/sensor/ws/123\";\nWebSocketClient client;\nvoid setup() {\n  Serial.begin(9600);\n  Ethernet.begin(mac);\n  client.connect(server);\n  client.setDataArrivedDelegate(dataArrived);\n  // Enviando dado de exemplo\n  client.send(\"5\");\n}\nvoid loop() {\n  client.monitor();\n}\nvoid dataArrived(WebSocketClient client, String data) {\n  // Recebendo dado, tratar para ligar ou desligar o sensor\n  Serial.println(\"Data Arrived: \" + data);\n}",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "groupTitle": "WebSocketSensor",
    "name": "WsApiSensorWsSensor"
  },
  {
    "type": "ws",
    "url": "/api/sensor/ws/:sensor",
    "title": "WebSocket",
    "description": "<p>Connection endpoint to websocket</p>",
    "version": "0.0.0",
    "filename": "api/sensors.js",
    "group": "_home_mathias_Data_Disciplinas_CESUSC_AulaAberta_backend_api_sensors_js",
    "groupTitle": "_home_mathias_Data_Disciplinas_CESUSC_AulaAberta_backend_api_sensors_js",
    "name": "WsApiSensorWsSensor"
  }
] });
