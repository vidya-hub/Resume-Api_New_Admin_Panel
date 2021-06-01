var mongoose = require('mongoose');

var degreeSchema = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    updateTime: {
        type: Number,
    },
    addTime: {
        type: Number, default: () => Date.now()
    },
    status: {
        type: Number,
        default: 1
    }
});
var degreeSchema = module.exports = mongoose.model('degree_data', degreeSchema);