var accomplishmentsModel = require("../models/accomplishments");

module.exports.fnGetAllAccomplishments = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
            accomplishmentsModel.find().exec(function (e1, result) {
                if (!e1) {
                    response.msg = '';
                    response.status = 'success';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnGetAllAccomplishments --> e1', e1);
                    res.json(response);
                }
            })
    } catch (e) {
        console.log('Server error --> fnGetAllAccomplishments --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveAccomplishments = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        accomplishmentsModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response)
            } else {
                console.log('Server error --> fnGetActiveAccomplishments --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveAccomplishments --> e', e);
        res.json(response);
    }
}

module.exports.fnAddAccomplishments = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var title = req.body.title;
        title = (title && typeof title === 'string') ? title.trim() : null;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') && JSON.parse(expFlag)? JSON.parse(expFlag) : [];
        if (title && expFlag.length > 0) {

            var accomplishmentsData = {
                title: title,
                expFlag:expFlag
            }
            accomplishmentsModel.find({ title: title }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        accomplishmentsModel(accomplishmentsData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Accomplishments is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddAccomplishments --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Accomplishments is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddAccomplishments --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddAccomplishments --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateAccomplishments = function (req, res, next) {
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
        title = (title && typeof title === 'string') ? title.trim() : null;
        id = (id && typeof id === 'string') ? id.trim() : null;
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') && JSON.parse(expFlag)? JSON.parse(expFlag) : [];
        
        if (title && id && expFlag.length > 0) {

            var accomplishmentsData = {
                title: title,
                expFlag:expFlag
            }
            accomplishmentsModel.find({ title: title,  _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        accomplishmentsModel.findByIdAndUpdate(id, accomplishmentsData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Accomplishments is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateSummary --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Accomplishments is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateSummary --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnActiveAccomplishments = function (req, res, next) {
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
            accomplishmentsModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Accomplishments is activated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnActiveAccomplishments --> e', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveAccomplishments --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableAccomplishments = function (req, res, next) {
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
            accomplishmentsModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Accomplishments is deactivated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDisableAccomplishments --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableAccomplishments --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteAccomplishments = function (req, res, next) {
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
            accomplishmentsModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Accomplishments is deleted.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDeleteAccomplishments --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteAccomplishments --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchAccomplishments = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        var searchString = req.body.searchString;
        searchString = (searchString && typeof searchString === 'string') ? searchString.trim() : '';
        var expFlag = req.body.expFlag;
        expFlag = (expFlag && typeof expFlag === 'string') ? expFlag: "1" ;
       
        accomplishmentsModel.find({ title: new RegExp(searchString, 'i') , expFlag:expFlag  }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnSearchAccomplishments --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchAccomplishments --> e', e);
        res.json(response);
    }
}