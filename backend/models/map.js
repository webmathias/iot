const Types = require('mongoose').SchemaTypes;
const mongoose = require('mongoose');

const Maps = mongoose.Schema({
    name: { type: Types.String, require: true },
    map: [],
    mapSensors: [
        {
            slice: mongoose.Schema.Types.ObjectId,
            sensor: { type: Types.String, require: true },
            position: {
                x: { type: Types.Number, require: true },
                y: { type: Types.Number, require: true }
            },
            name: { type: Types.String, require: true }
        }
    ]
})
module.exports = mongoose.model('Maps', Maps);