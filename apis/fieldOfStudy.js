var fieldOfStudyModel = require("../models/fieldOfStudy");

module.exports.fnGetAllFieldOfStudy = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        fieldOfStudyModel.find({}).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetAllFieldOfStudy --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetAllFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveFieldOfStudy = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        fieldOfStudyModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetActiveFieldOfStudy --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetActiveFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnAddFieldOfStudy = function (req, res, next) {
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
        if (title) {

            var degreeData = {
                title: title
            }
            fieldOfStudyModel.findOne({ title: title }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        fieldOfStudyModel(degreeData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Degree is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddFieldOfStudy --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Degree is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddFieldOfStudy --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateFieldOfStudy = function (req, res, next) {
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
        if (title && id) {

            var degreeData = {
                title: title
            }
            fieldOfStudyModel.find({ title: title, _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        fieldOfStudyModel.findByIdAndUpdate(id, degreeData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Degree is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateFieldOfStudy --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Degree is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateFieldOfStudy --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnActiveFieldOfStudy = function (req, res, next) {
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
            fieldOfStudyModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Degree is activated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnActiveFieldOfStudy --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableFieldOfStudy = function (req, res, next) {
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
            fieldOfStudyModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Degree is deactivated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDisableFieldOfStudy --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteFieldOfStudy = function (req, res, next) {
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
            fieldOfStudyModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Degree is deleted.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDeleteFieldOfStudy --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDeleteFieldOfStudy --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchFieldOfStudy = function (req, res, next) {
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

        fieldOfStudyModel.find({ title: new RegExp(searchString, 'i') }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnSearchFieldOfStudy --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchFieldOfStudy --> e', e);
        res.json(response);
    }
}