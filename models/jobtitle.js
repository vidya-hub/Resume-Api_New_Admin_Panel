var mongoose = require('mongoose');

var jobTitleSchema = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    updateTime: {
        type: Number,
        default: () => Date.now()
    },
    addTime: {
        type: Number,
        default: () => Date.now()
    },
    status: {
        type: Number,
        default: 1
    }
});
var jobTitleSchema = module.exports = mongoose.model('job_title_data', jobTitleSchema);