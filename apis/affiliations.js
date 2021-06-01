var affiliationsModel = require("../models/affiliations");

module.exports.fnGetAllAffiliations = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
            affiliationsModel.find().exec(function (e1, result) {
                if (!e1) {
                    response.msg = '';
                    response.status = 'success';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnGetAllAffiliations --> e1', e1);
                    res.json(response);
                }

            })
    } catch (e) {
        console.log('Server error --> fnGetAllAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveAffiliations = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        affiliationsModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveAffiliations --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnAddAffiliations = function (req, res, next) {
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
       
        if (title  && expFlag.length > 0) {

            var affiliationsData = {
                title: title,
                expFlag:expFlag
            }
            affiliationsModel.findOne({ title: title}).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        affiliationsModel(affiliationsData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Affiliations is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddAffiliations --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Affiliations is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddAffiliations --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateAffiliations = function (req, res, next) {
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

            var affiliationsData = {
                title: title,
                expFlag:expFlag
            }
            affiliationsModel.findOne({ title: title, _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        affiliationsModel.findByIdAndUpdate(id, affiliationsData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Affiliations is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateAffiliations --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Affiliations is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateAffiliations --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnActiveAffiliations = function (req, res, next) {
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
            affiliationsModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Affiliations is activated.';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnActiveAffiliations --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableAffiliations = function (req, res, next) {
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
            affiliationsModel.findByIdAndUpdate(id, { status: 0 }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Affiliations is deactivated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDisableAffiliations --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteAffiliations = function (req, res, next) {
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
            affiliationsModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Affiliations is deleted.';
                    response.data = result;
                    res.json(response);

                } else {
                    console.log('Server error --> fnDeleteAffiliations --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteAffiliations --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchAffiliations = function (req, res, next) {
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
        expFlag = (expFlag && typeof expFlag === 'string') ? expFlag: "1" ;

        affiliationsModel.find({ title: new RegExp(searchString, 'i') , expFlag:expFlag  }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnSearchAffiliations --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchAffiliations --> e', e);
        res.json(response);
    }
}