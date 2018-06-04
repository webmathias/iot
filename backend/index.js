const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
var bodyParser = require('body-parser');


const port = process.env.PORT || 8080;
const app = new express();
require('express-ws')(app);

app.use((req, res, next) => {
    console.log('Path: ', req.path)
    next();
})
app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        return res.status(500).send('Mongo not connected');
    }
    next()
})
app.use('/api/docs', express.static('./doc'));
app.use('/', express.static('./public'));
app.use('/api', require('./api/index'))
app.listen(port, () => {
    mongoose.connect(process.env.mongoURL || 'mongodb://localhost/webmathias',(err)=>{
            console.log(err);
    })

});
console.log("Server running at http://localhost:%d", port);
