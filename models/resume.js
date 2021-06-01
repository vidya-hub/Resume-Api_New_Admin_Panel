var mongoose = require('mongoose');

var resumeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users_data'
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    jobTitle:{ 
        type:String,
        default: ''
    },
    jobTitleId:{ 
        type:String,
        default: '' 
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    zipCode: {
        type: String,
        default: ''
    },
    phoneNo: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: ''
    },
    links: [{
        type: String,
        default: ''
    }],
    additionalContacts: [
        {
            key: {
                type: String,
                default: ''
            },
            value: {
                type: String, default: ''
            }
        }
    ],
    
    professionalSummary: { type: String, },
    summary: [{ type: String, }],
    skills: [
        {
            type: String,
            default: ''
        }
    ],
    workHistory: [
        {
            jobTitle: { type: String, default: '' },
            employer: { type: String, default: '' },
            city: { type: String, default: '' },
            country: { type: String, default: '' },
            
            state: { type: String, default: '' },
            startDate: { type: Number },
            endDate: { type: Number },
            currentlyWorkHere: { type: Boolean, default: false },
            responsibility:[{type:String}],
            environment:[{type:String}]
        }
    ],
    education: [
        {
            schoolName: { type: String, default: '' },
            schoolLocation: { type: String, default: '' },
            degree: { type: String, default: '' },
            state: { type: String, default: '' },
            fieldOfStudy: { type: String },
            graduationMonth: { type: String },
            graduationYear: { type: Number },
           
        }
    ],
    refrences:[
        {
            name:{type:String},
            position:{type:String},
            phone:{type:String},
            email:{type:String}
        }
    ],
    certifications: [
        {
            type: String,
            default: ''
        }
    ],
    accomplishments: [
        {
            type: String,
            default: ''
        }
    ],
    affiliations: [
        {
            type: String,
            default: ''
        }
    ],
    additionalInformation: [
        {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        }
    ],
    objectives:[{type:String}],
    environment:[{type:String}],
    additionalDetails:[
        {
            key: {
                type: String,
                default: ''
            },
            value: {
                type: String, default: ''
            }
        }
    ],
    expFlag: { type: String },
    birthDate: { type: String },
    resumeDate: { type: Number, default: () => Date.now() },
    resumeType: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
});
// var resumeModel = module.exports = mongoose.model('resume_data', resumeSchema);
var resumeModel = module.exports = mongoose.model('resume_new_data', resumeSchema);
