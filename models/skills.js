var mongoose = require('mongoose');

var skills = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    jobtitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job_title_data'
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
var skills = module.exports = mongoose.model('skills_data', skills);