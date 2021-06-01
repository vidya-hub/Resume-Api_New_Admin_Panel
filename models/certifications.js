var mongoose = require('mongoose');

var certifications = mongoose.Schema({
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
var certifications = module.exports = mongoose.model('certifications_data', certifications);

// Certifications