var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8088,
    bodyParser  = require('body-parser'),
    //db          = require('burngame-db'),
    db          = require('./modules/db');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );


/* ROUTES */
var login = require('./routes/api/ApiLogin.js');
login.setDb(db);
app.post('/api/login', login.handler);


/* DEFAULTS AND STATICS*/
app.use('/', express.static(__dirname + '/public/'));
app.use(function(req, res){
    res.statusCode = 404;
    res.send({errorCode:res.statusCode});
});

/* START SERVER */
app.listen(port,function(){
    console.log('server magic on port '+port);
});