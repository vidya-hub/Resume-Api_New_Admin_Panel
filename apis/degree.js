var degreeModel = require("../models/degree");

module.exports.fnGetAllDegree = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        degreeModel.find({}).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response);
            } else {
                console.log('Server error --> fnGetAllDegree --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetAllDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnGetActiveDegree = function (req, res, next) {
    var response = {
        status: 'error',
        msg: 'Something happened wrong, please try again after sometime.',
        data: {
        },
        method: req.url.split('/')[req.url.split('/').length - 1]
    }
    try {
        degreeModel.find({ status: 1 }).exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response)
            } else {
                console.log('Server error --> fnGetAllDegree --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnGetAllDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnAddDegree = function (req, res, next) {
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
            degreeModel.findOne({ title: title }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        degreeModel(degreeData).save({ lean: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Degree is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnAddDegree --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Degree is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnAddDegree --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnAddDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnUpdateDegree = function (req, res, next) {
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
            degreeModel.findOne({ title: title, _id: { $ne: id } }).exec(function (e1, result) {
                if (!e1) {
                    if (!(result && result._id)) {
                        degreeModel.findByIdAndUpdate(id, degreeData, { new: true }, function (e2, savedResult) {
                            if (!e2) {
                                response.status = 'success';
                                response.msg = 'Degree is saved in database.';
                                response.data = savedResult;
                                res.json(response);
                            } else {
                                console.log('Server error --> fnUpdateDegree --> e2', e2);
                                res.json(response);
                            }
                        })
                    } else {
                        response.msg = 'Degree is already available in database.';
                        res.json(response);
                    }
                } else {
                    console.log('Server error --> fnUpdateDegree --> e1', e1);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }

    } catch (e) {
        console.log('Server error --> fnUpdateDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnActiveDegree = function (req, res, next) {
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
            degreeModel.findByIdAndUpdate(id, { status: 1 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Degree is activated.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnActiveDegree --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnActiveDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnDisableDegree = function (req, res, next) {
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
            degreeModel.findByIdAndUpdate(id, { status: 0 }, { new: true }, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Degree is deactivated.';
                    response.data = result;
                    res.json(response)
                } else {
                    console.log('Server error --> fnDisableDegree --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnDeleteDegree = function (req, res, next) {
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
            degreeModel.findByIdAndRemove(id, function (e1, result) {
                if (!e1) {
                    response.status = 'success';
                    response.msg = 'Degree is deleted.';
                    response.data = result;
                    res.json(response);
                } else {
                    console.log('Server error --> fnDisableDegree --> e', e);
                    res.json(response);
                }
            })
        } else {
            response.msg = "Invalid Parameters.";
            res.json(response);
        }
    } catch (e) {
        console.log('Server error --> fnDisableDegree --> e', e);
        res.json(response);
    }
}

module.exports.fnSearchDegree = function (req, res, next) {
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

        degreeModel.find({ title: new RegExp(searchString, 'i') }).limit(20).lean().exec(function (e1, result) {
            if (!e1) {
                response.msg = '';
                response.status = 'success';
                response.data = result;
                res.json(response)
            } else {
                console.log('Server error --> fnSearchDegree --> e1', e1);
                res.json(response);
            }
        })
    } catch (e) {
        console.log('Server error --> fnSearchDegree --> e', e);
        res.json(response);
    }
}