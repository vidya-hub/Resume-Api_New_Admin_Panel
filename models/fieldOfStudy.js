var mongoose = require('mongoose');

var fieldOfStudy = mongoose.Schema({
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
var fieldOfStudy = module.exports = mongoose.model('field_of_study_data', fieldOfStudy);