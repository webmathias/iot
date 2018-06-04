const Types = require('mongoose').SchemaTypes;
const mongoose = require('mongoose');

const Slice = mongoose.Schema({
    name: { type: Types.String, require: true },
    type: { type: Types.String, require: true },
    images: [
        {
            status: { type: Types.Number },
            image: { type: Types.Buffer }
        }
    ],
    width: { type: Types.Number, default: 1 }
})
module.exports = mongoose.model('Slice', Slice);