var mongoose = require('mongoose');

var affiliations = mongoose.Schema({
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
var affiliations = module.exports = mongoose.model('affiliations_data', affiliations);