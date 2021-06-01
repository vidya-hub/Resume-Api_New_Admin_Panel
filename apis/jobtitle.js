var jobTitleModel = require("../models/jobtitle");
var accomplishmentsModel = require("../models/accomplishments");
var affiliationsModel = require("../models/affiliations");
var certificationsModel = require("../models/certifications");
var jobDescriptionModel = require("../models/jobDescription");
var skillsModel = require("../models/skills");
var summaryModel = require("../models/summary");
var jobtitleModel = require("../models/jobtitle");
var fieldOfStudyModel = require("../models/fieldOfStudy");
var degreeModel = require("../models/degree");

var fs = require('fs')
module.exports.fnAddJobTitle = (req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var title = req.body.title;
        title = (title && typeof title === 'string') ? title.trim() : null;
        console.log(title)
        if (title) {
            jobTitleModel.findOne({ title: title }).exec(function(e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        var jobTitleData = {
                            title: title,
                            updateTime: new Date().getTime(),
                        }
                        jobTitleModel(jobTitleData).save({ lean: true }, function(e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'job title is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddJobTitle --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Job title is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddJobTitle --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnAddJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateJobTite = (req, res, next) => {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var title = req.body.title;
        var id = req.body.id;
        title = (title && typeof title === 'string') ? title.trim() : null;
        id = (id && typeof id === 'string') ? id.trim() : null;

        if (title && id) {
            jobTitleModel.findOne({ title: title, _id: { $ne: id } }).exec(function(e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        var jobTitleData = {
                            title: title,
                            updateTime: new Date().getTime(),
                        }
                        jobTitleModel.findByIdAndUpdate(id, jobTitleData).lean(true).exec(function(e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Job title is updated.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateJobTite --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Job title is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateJobTite --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnUpdateJobTite --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableJobTitle = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            jobTitleModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function(e1, result) {
                if (!e1) {
                    response.msg = "job title is disabled";
                    response.data = result;
                    response.status = 'success';
                    res.json(response)
                } else {
                    console.log('Server error --> fnDisableJobTitle --> e1', e1);
                    res.json(response);
                }
            })

        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnEnableJobTitle = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            jobTitleModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function(e1, result) {
                if (!e1) {
                    response.msg = "job title is enabled";
                    response.data = result;
                    response.status = 'success';
                    res.json(response)
                } else {
                    console.log('Server error --> fnEnableJobTitle --> e1', e1);
                    res.json(response);
                }
            })

        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnEnableJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteJobTitle = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            jobTitleModel.findByIdAndRemove(id, function(e1, result) {
                if (!e1) {
                    response.msg = "job title is deleted";
                    response.data = result;
                    response.status = 'success';
                    res.json(response)
                } else {
                    console.log('Server error --> fnDeleteJobTitle --> e1', e1);
                    res.json(response);
                }
            })

        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnGetJobTitle = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        jobTitleModel.find({}, '_id title status').lean(true).sort({ '_id': '-1' }).exec(function(e1, result) {
            if (!e1) {
                response.status = 'success';
                response.msg = '';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetJobTitle --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveJobTitle = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        jobTitleModel.find({ status: 1 }, '_id title', { lean: true }, function(e1, result) {
            if (!e1) {
                response.status = 'success';
                response.msg = '';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveJobTitle --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchJobTitle = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var searchString = req.body.searchString;
        searchString = (searchString && typeof searchString === 'string') ? searchString.trim() : '';
        var $query = { status: 1 };
        if (searchString) {
            $query['title'] = new RegExp(searchString, 'i')
        }
        jobTitleModel.find($query, '_id title', { lean: true }, function(e1, result) {
            if (!e1) {
                response.status = 'success';
                response.msg = '';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveJobTitle --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnAddMultipal = (req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('resumetital.txt', 'utf8')
        });
        var jobTitleData = []
        lineReader.on('line', function(line) {
            jobTitleData.push({ title: line })
        });
        lineReader.on('close', (e1, result) => {
            jobTitleModel.insertMany(jobTitleData, (e1, result) => {
                if (!e1) {
                    response.status = 'success';
                    response.msg = ''
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnAddMultipal --> e1', e1);
                    res.json(response);
                }
            })
        });
    } catch (e) {
        console.log('Server error --> fnAddMultipal --> e', e);
        res.json(response);
    }
}

module.exports.fnGetJobTitleWithSummary = async(req, res, next) => {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        jobTitleModel.find({}, '_id title status').lean(true).sort({ '_id': '-1' }).exec(async function(e1, result) {
            if (!e1) {
                const finalData = [];
                if (result && result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        let jobtitleId = result[i]._id;
                        let jobDescription = await jobDescriptionModel.countDocuments({ jobtitle: jobtitleId })
                        let skills = await skillsModel.countDocuments({ jobtitle: jobtitleId })
                        let summary = await summaryModel.countDocuments({ jobtitle: jobtitleId })
                        finalData.push({
                            jobDescription: jobDescription,
                            skills: skills,
                            summary: summary,
                            ...result[i]
                        })
                    }
                }
                response.status = 'success';
                response.msg = '';
                response.data = finalData;
                res.json(response);
            } else {
                console.log('Server error --> fnGetJobTitle --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetJobTitle --> e', e);
        res.json(response);
    }
}