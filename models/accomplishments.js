var mongoose = require('mongoose');

var accomplishments = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    expFlag: [
        {
            type: String,
            default: "0"
        }
    ],
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
var accomplishments = module.exports = mongoose.model('accomplishments_data', accomplishments);