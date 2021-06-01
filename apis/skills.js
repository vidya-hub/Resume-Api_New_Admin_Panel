var skillsModel = require("../models/skills");

module.exports.fnGetAllSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var jobtitleId = req.body.jobtitleId;
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        if (jobtitleId) {
            skillsModel.find({jobtitle:jobtitleId}).populate('jobtitle', '').exec(function (e1, result) {
                if (!e1) {
                    response.msg = '';
                    response.status = 'success';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnGetAllSkills --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnGetAllSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        skillsModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveSkills --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnAddSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var title = req.body.title;
        var jobtitleId = req.body.jobtitleId;
        title = (title && typeof title === 'string') ? title.trim() : null;
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') && JSON.parse(expFlag)? JSON.parse(expFlag) : [];
      
        if (title && jobtitleId && expFlag.length > 0) {

            var skillsData = {
                title: title,
                jobtitle: jobtitleId,
                expFlag:expFlag
            }
            skillsModel.find({ title: title, jobtitle: jobtitleId }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        skillsModel(skillsData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Skill is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddSkills --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Skill is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddSkills --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var title = req.body.title;
        var id = req.body.id;
        var jobtitleId = req.body.jobtitleId;
        title = (title && typeof title === 'string') ? title.trim() : null;
        jobtitleId = (jobtitleId && typeof jobtitleId === 'string') ? jobtitleId.trim() : null;
        id = (id && typeof id === 'string') ? id.trim() : null;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') && JSON.parse(expFlag)? JSON.parse(expFlag) : [];
      
        if (title && id && expFlag.length > 0) {

            var skillsData = {
                title: title,
                jobtitle: jobtitleId,
                expFlag:expFlag
            }
            skillsModel.find({ title: title, jobtitle: jobtitleId, _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        skillsModel.findByIdAndUpdate(id, skillsData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Skill is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateSkills --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Skill is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateSkills --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnActiveSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            skillsModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Skill is activated.';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnActiveSkills --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            skillsModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Skill is deactivated.';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnDisableSkills --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var id = req.body.id;
        id = (id && typeof id === 'string') ? id.trim() : null;
        if (id) {
            skillsModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Skill is deleted.';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnDeleteSkills --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteSkills --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchSkills = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var searchString = req.body.searchString;
        var jobtitleId = req.body.jobtitleId;
        searchString = (searchString && typeof searchString === 'string') ? searchString.trim() : '';
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') ? expFlag: "1" ;
        
        skillsModel.find({ title: new RegExp(searchString, 'i') ,jobtitle: jobtitleId, expFlag:expFlag  }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response)
            } else {
                console.log('Server error --> fnSearchSkills --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchSkills --> e', e);
        res.json(response);
    }
}