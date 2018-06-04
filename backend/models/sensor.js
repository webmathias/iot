const Types = require('mongoose').SchemaTypes;
const mongoose = require('mongoose');

const Sensor = mongoose.Schema({
    name:{type:Types.String},
    value:{type:Types.Number},
    data:{type:Types.Date},
})
module.exports = mongoose.model('Sensor', Sensor);