'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session');

// Constants
var session;
var PORT = 8080;

// App
var app = express();

app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/img', express.static(__dirname + '/assets/img'));
app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/font', express.static(__dirname + '/assets/fonts'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(sessions({
    secret:'&^s4A52eEzs*/976*3234$#',
    resave:false,
    saveUninitialized: true
}));

app.get('/', function (req, resp) {
    session = req.session;
    if(session.uniqueID){
        resp.redirect('/redirects');
    }
    resp.sendFile('./views/login.html', {root: __dirname});
});

app.get('/login', function (req, resp) {
    session = req.session;
    if(session.uniqueID){
        resp.redirect('/redirects');
    }
    resp.sendFile('./views/login.html', {root: __dirname});
});

app.post('/login', function(req, resp){
    session = req.session;
    output  = {};

    if(req.body.username =='test' && req.body.password == '1234'){
        session.uniqueID = req.body.username;
        //resp.redirect('/redirects');
        output.status = true;
    }
    else{
        //resp.redirect('/redirects');
        output.status = false;
        output.message = 'Please check your username or password.';
    }

    resp.end(JSON.stringify(output));

});

app.get('/logout',function(req, resp){
    req.session.destroy();
    resp.redirect('/login');
});

app.get('/success', function(req, resp){
    session = req.session;
    if(session.uniqueID != 'test'){
        resp.send('Unauthorized access');
    }
    resp.sendFile('./views/success.html', {root: __dirname});
});

app.get('/redirects',function(req, resp){
    session = req.session;
    if(session.uniqueID){
        resp.redirect('/success');
    }else{
        resp.send('Password is not correct' + ' <a href="/logout">Go back</a>');

    }
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
