var certificationsModel = require("../models/certifications");

module.exports.fnGetAllCertifications = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
            certificationsModel.find().exec(function (e1, result) {
                if (!e1) {
                    response.msg = '';
                    response.status = 'success';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnGetAllCertifications --> e1', e1);
                    res.json(response);
                }
            })
    } catch (e) {
        console.log('Server error --> fnGetAllCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveCertifications = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        certificationsModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveCertifications --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnAddCertifications = function (req, res, next) {
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

            var certificationsData = {
                title: title,
                expFlag:expFlag
            }
            certificationsModel.findOne({ title: title }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        certificationsModel(certificationsData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Certifications is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddCertifications --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Certifications is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddCertifications --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateCertifications = function (req, res, next) {
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

            var certificationsData = {
                title: title,
                expFlag:expFlag
            }
            certificationsModel.find({ title: title,  _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        certificationsModel.findByIdAndUpdate(id, certificationsData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Certifications is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateCertifications --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Certifications is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateCertifications --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnActiveCertifications = function (req, res, next) {
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
            certificationsModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Certifications is activated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnActiveCertifications --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableCertifications = function (req, res, next) {
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
            certificationsModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Certifications is deactivated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDisableCertifications --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteCertifications = function (req, res, next) {
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
            certificationsModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Certifications is deleted.';
                    response.data = result;
                    res.json(response);

                } else {
                    console.log('Server error --> fnDeleteCertifications --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteCertifications --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchCertifications = function (req, res, next) {
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
        certificationsModel.find({ title: new RegExp(searchString, 'i') , expFlag:expFlag  }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnSearchCertifications --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchCertifications --> e', e);
        res.json(response);
    }
}