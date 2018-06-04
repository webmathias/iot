const WebSocket = require('ws'); 
const sensorName = '1232';
// const ws = new WebSocket('ws://cesuscmobile.azurewebsites.net/api/sensor/ws/'+sensorName, {
// const ws = new WebSocket('ws://localhost:8080/api/ws/status?sensors=[%22123%22]', {
 const ws = new WebSocket('ws://webmathias-com-br.umbler.net/api/ws/status?sensors=[%22123%22]', {
                        // wss://cesuscmobile.azurewebsites.net/api/sensor/wsstatus?sensors=[%22LIGHT%22]
        perMessageDeflate: false
});


ws.on('open', function open() {
    console.log("Conectado Enviando informação de teste");
   // ws.send('5');
});

ws.on('message', function incoming(data) {
    console.log("Mensagem");
    console.log(data);
});

ws.on('error', function incoming(err) {
    console.log("Error:", err);
});

ws.on('close', function incoming(err) {
    console.log("CLOSE:", err);
});