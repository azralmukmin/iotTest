var mongoose = require('mongoose');

var Temperature = mongoose.model('dbtemperaturetests', {
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    }
});

module.exports = {Temperature}