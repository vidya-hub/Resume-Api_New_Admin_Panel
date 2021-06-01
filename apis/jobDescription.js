var jobDescriptionModel = require("../models/jobDescription");

module.exports.fnAddJobDescription = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var description = req.body.description;
        var jobtitleId = req.body.jobtitleId;
        description = (description && typeof description === 'string') ? description.trim() : null;
        
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') && JSON.parse(expFlag)? JSON.parse(expFlag) : [];
        
        if (description && jobtitleId&& expFlag.length > 0) {
            jobDescriptionModel.findOne({ description: description, jobtitle: jobtitleId }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        var jobDescriptionData = {
                            description: description,
                            jobtitle: jobtitleId,
                            expFlag:expFlag,
                            updateTime: new Date().getTime(),
                        }
                        jobDescriptionModel(jobDescriptionData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'job description is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddJobDescription --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Job title is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddJobDescription --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnAddJobDescription --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateJobDescription = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var description = req.body.description;
        var jobtitleId = req.body.jobtitleId;
        var id = req.body.id;
        description = (description && typeof description === 'string') ? description.trim() : null;
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        id = (id && typeof id === 'string') ? id.trim() : null;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') && JSON.parse(expFlag)? JSON.parse(expFlag) : [];
        
        if (description && id && expFlag.length > 0) {
            jobDescriptionModel.findOne({ description: description, jobtitle: jobtitleId, _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        var jobDescriptionData = {
                            description: description,
                            updateTime: new Date().getTime(),
                            expFlag:expFlag
                        }
                        jobDescriptionModel(jobDescriptionData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Job description is updated.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateJobDescription --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Job title is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateJobDescription --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnUpdateJobDescription --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableJobDescription = function (req, res, next) {
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
            jobDescriptionModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.msg = "job description is disabled";
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

module.exports.fnEnableJobDescription = function (req, res, next) {
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
            jobDescriptionModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.msg = "job description is enabled";
                    response.data = result;
                    response.status = 'success';
                    res.json(response)
                } else {
                    console.log('Server error --> fnEnableJobDescription --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnEnableJobDescription --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteJobDescription = function (req, res, next) {
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
            jobDescriptionModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.msg = "job description is deleted";
                    response.data = result;
                    response.status = 'success';
                    res.json(response)
                } else {
                    console.log('Server error --> fnDeleteJobDescription --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteJobDescription --> e', e);
        res.json(response);
    }
}

module.exports.fnGetJobDescription = function (req, res, next) {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var jobtitleId = req.body.jobtitleId;
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        if (jobtitleId) {
            jobDescriptionModel.find({ jobtitle: jobtitleId }, '_id description status', { lean: true })
                .populate('jobtitle', '_id title').exec(function (e1, result) {
                    if (!e1) {
                        response.status = 'success';
                        response.msg = '';
                        response.data = result;
                        res.json(response);
                    } else {
                        console.log('Server error --> fnGetJobDescription --> e1', e1);
                        res.json(response);
                    }
                })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnGetJobDescription --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveJobDescription = function (req, res, next) {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        jobDescriptionModel.find({ status: 1 }, '_id description', { lean: true }, function (e1, result) {
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

module.exports.fnGetJobAsPerJobTitle = function (req, res, next) {
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var jobtitleId = req.body.jobtitleId;
        var page = req.body.page;
        var dataPerPage = req.body.dataPerPage;
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        dataPerPage = dataPerPage ? dataPerPage : 20;
        page = page ? page : 0;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') ? expFlag: "1" ;
       
        if (jobtitleId) {

            jobDescriptionModel.find({ jobtitle: jobtitleId,expFlag:expFlag }, '_id description')
                .sort({ updateTime: -1 })
                .limit(dataPerPage)
                .skip(dataPerPage * page)
                .exec(function (e1, result) {
                    if (!e1) {
                        var data = [];
                        for (let index = 0; index < result.length; index++) {
                            data.push(result[index].toObject())
                            data[index]['title'] = result[index]['description'];
                            delete data[index]['description']
                            console.log(index);
                            // console.log(result[index]['description'])
                        }
                        console.log(result[0]['title'])
                        
                        response.msg = '';
                        response.status = 'success';
                        response.data = data;
                        res.json(response)
                    } else {
                        console.log('Server error --> fnGetJobAsPerJobTitle --> e1', e1);
                        res.json(response);
                    }
                })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnGetJobAsPerJobTitle --> e', e);
        res.json(response);
    }
}

module.exports.fnGetObjective = (req,res,next) =>{
    
    var response = {
        status: "error",
        msg: 'Something happened wrong, please try again after sometime.',
        data: {},
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try{
        response.status = "success";
        response.msg = "";
        response.data = [
            {
                "_id": "5e78417b3d161a040a364fb5",
                "title": "To perform the task assigned to me with the best of my ability and to work dedicatedly towards the success of the organization.",
                "status": 1,
                "addTime": 1584939387256,
                "__v": 0
            }
        ]
        res.json(response);
    }catch(e){
        console.log('Server error --> fnGetObjective --> e', e);
        res.json(response);
    }
}