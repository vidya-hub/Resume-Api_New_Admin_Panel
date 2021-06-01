var summaryModel = require("../models/summary");

module.exports.fnGetAllSummary = function (req, res, next) {
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
            summaryModel.find({jobtitle:jobtitleId}).populate('jobtitle', '').exec(function (e1, result) {
                if (!e1) {
                    response.msg = '';
                    response.status = 'success';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnGetAllSummary --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnGetAllSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveSummary = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        summaryModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveSummary --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnAddSummary = function (req, res, next) {
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
      
        if (title && jobtitleId  && expFlag.length > 0) {

            var summaryData = {
                title: title,
                jobtitle: jobtitleId,
                expFlag:expFlag
            }
            summaryModel.find({ title: title, jobtitle: jobtitleId }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        summaryModel(summaryData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'summary is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddSummary --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'summary is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddSummary --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateSummary = function (req, res, next) {
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

            var summaryData = {
                title: title,
                jobtitle: jobtitleId,
                expFlag:expFlag
            }
            summaryModel.find({ title: title, jobtitle: jobtitleId, _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        summaryModel.findByIdAndUpdate(id, summaryData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'summary is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateSummary --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'summary is already available in database.';
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

module.exports.fnActiveSummary = function (req, res, next) {
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
            summaryModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'summary is activated.';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnActiveSummary --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableSummary = function (req, res, next) {
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
            summaryModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'summary is deactivated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDisableSummary --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteSummary = function (req, res, next) {
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
            summaryModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'summary is deleted.';
                    response.data = result;
                    res.json(response);

                } else {
                    console.log('Server error --> fnDeleteSummary --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteSummary --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchSummary = function (req, res, next) {
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
       
        summaryModel.find({ title: new RegExp(searchString, 'i') ,jobtitle: jobtitleId, expFlag:expFlag  }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response)
            } else {
                console.log('Server error --> fnSearchSummary --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchSummary --> e', e);
        res.json(response);
    }
}