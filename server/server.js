var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8088,
    bodyParser  = require('body-parser');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );


/* ROUTES */
app.post('/api/login', require('./routes/api/ApiLogin.js'));


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