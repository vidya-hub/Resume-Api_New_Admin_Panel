var mongoose = require('mongoose');

var jobTitleSchema = mongoose.Schema({
    jobtitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job_title_data'
    },
    description: {
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
        type: Number,
        default: () => Date.now()
    },
    status: {
        type: Number,
        default: 1
    }
});
var jobTitleSchema = module.exports = mongoose.model('job_description_data', jobTitleSchema);