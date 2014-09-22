/**
 *
 */

var db = null;

module.exports = {
    setDb:function(dbConnection){
        db = dbConnection;
    },
    handler:function(req, res) {
        var login = req.body.login,
            password = req.body.password,
            crypto = require('crypto');




        //var FIXTURES_USERDB = {
        //    test:{password:'test', authToken:'e047ce130f68e6505525c04ecdaef51556e7cd1a'},
        //    alpha:{password:'test', authToken:'6555d43414e7c46fea59002b6e5546a0d448c613'}
        //};

        if(login && password){
            db.getUserByLogin({login:login, password:password},function(err,data){
                console.log('tmp',err,data);
                if(err){
                    res.statusCode = 401;
                    res.send({errorCode:res.statusCode});
                } else {
                    if (data.length === 1) {
                        var user = data[0],
                            sessionToken = crypto.createHash('sha1')
                            .update(login+password+'salt'+(+new Date))
                            .digest('hex');

                        db.updateAuthToken({id:user.id,authToken:sessionToken});

                        res.send({sessionToken:sessionToken});
                    } else {
                        res.statusCode = 401;
                        res.send({errorCode:res.statusCode});
                    }
                }
            });
        } else {
            res.statusCode = 401;
            res.send({errorCode:res.statusCode});
        }
    }
};