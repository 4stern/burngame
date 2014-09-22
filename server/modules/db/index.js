module.exports=(function(){
    var dbName      = "burngame",
        db          = null,

        mysql       = require('mysql'),
        connection  = mysql.createConnection({
            host     : 'localhost',
            user     : 'burngame',
            password : 'burngame',
            database : dbName
        });
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    function addUser(params,callback){
        var data = {
            username: params.username,
            email: params.email,
            login: params.login,
            password: params.password
        };
        connection.query('INSERT INTO users SET ?', data, function(err, rows) {
            if (err) {
                console.error('error adding : ', err);
                return;
            }

            console.log('added',rows);
        });
    }

    function updateAuthToken(params,callback){
        connection.query('UPDATE users SET authtoken=? WHERE id=?', [params.authToken,params.id], function(err, rows) {
            if (err) {
                console.error('error adding : ', err);
                return;
            }

            console.log('added',rows);
        });
    }


    function getUserById(params, callback){
        if(params.id){
            connection.query('SELECT * FROM users WHERE id= ?', params.id, function(err, rows) {
                if (err) {
                    console.error('error', err);
                    callback(err,null);
                    return;
                }
                callback(err, rows);
            });
        } else {

        }
    }

    function getUserByLogin(params, callback){
        if(params.login && params.password){
            var query = connection.query('SELECT * FROM users WHERE login=? AND password=?', [params.login, params.password], function(err, rows) {
                if (err) {
                    console.error('error', err);
                    if(callback){
                        callback(err,null);
                    }
                    return;
                }
                if(callback){
                    callback(err, rows);
                }
            });
            console.log(query.sql);
        } else {
            if(callback){
                callback({message:"params failed", description:"params failed"}, null);
            }
        }
    }

    //addUser({
    //    username: 'user2',
    //    email: 'user2@test.de',
    //    login: 'user2login',
    //    password: 'user2password'
    //},function(){
    //
    //});
    //getUserById({id:1},function(err,data){
    //    console.log(err,data);
    //});

    return {
        'addUser'           : addUser,
        'getUserById'       : getUserById,
        'getUserByLogin'    : getUserByLogin,
        'updateAuthToken'   : updateAuthToken
    };
})();