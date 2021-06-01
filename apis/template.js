module.exports.fnOutputResume = function (req, res, next) {
    var responce = {
        status: 'error',
        msg: 'Something happened wrong try again after some times.',
        data: {}
    };
    try {
        res.render('../resume1');
    } catch (e) {
        console.log('Server error --> fnOutputResume --> e', e);
        res.json(response);
    }
}