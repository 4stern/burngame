/**
 *
 */
module.exports = function(req, res) {
    var login = req.body.login,
        password = req.body.password,
        crypto = require('crypto');

    var FIXTURES_USERDB = {
        test:'test',
        alpha:'test'
    };

    if(login && password){

        if( FIXTURES_USERDB[login] && FIXTURES_USERDB[login]===password){
            var sessionToken = crypto.createHash('sha1').update(login+password+'salt'+(+new Date)).digest('hex');
            res.send({sessionToken:sessionToken});
        } else {
            res.statusCode = 401;
            res.send({errorCode:res.statusCode});
        }
    } else {
        res.statusCode = 401;
        res.send({errorCode:res.statusCode});
    }
};