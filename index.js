var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var http = require('http');
var path = require('path');
var cors = require('cors');
var http = require('http'),
    fs = require('fs'),
    url = require('url');
var ipval = require("./helper/ipaddress.js");

// var ipval = require("./")

var debug = require('debug')('learn:server');
var AES_KEY = '6fnhkgo71s0caeqma6ojjftu4n1m1d85';
const expressLayouts = require('express-ejs-layouts')

var crypto = require("crypto-js");
var session = require('express-session')({
    secret: "@#$%^&*(LKJLKSALYUQWEMJQWN<MNQDKLJHSALKJDHAUISDIUDYSASHDAM<SD",
    saveUninitialized: false,
    resave: false
});
// var ipaddress = ipval.ipvalreturnwithoutport();
// var ipaddress =  ipaddressreturn();
// var mongoclient = 'mongodb://52.66.242.48:27017/resume_app_db'
var mongoclient = 'mongodb://localhost:27017/resume_app_db'

mongoclient = "mongodb+srv://resumeApp:B5emcpwPuWwiwZB3@resumeapp.xd4fr.mongodb.net/resume_app_db?retryWrites=true&w=majority"
mongoose.connect(mongoclient, { useNewUrlParser: true });
var route = require('./routes/route');
const port = 3001;
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(session);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', port);
var server = http.createServer(app, session);
app.set('view engine', 'ejs') // Setamos que nossa engine será o ejs
app.use(expressLayouts)

server.listen(port);
server.setTimeout(1500000);
server.on('error', function(error) {
    if (error.syscall != 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'require elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.on('listening', function() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
    console.log('Listening on port ' + bind);
    // mqttServ.on('ready', function () {
    // 	mqttServ.authenticate = authenticate;
    // 	mqttServ.authorizePublish = authorizePublish;
    // 	mqttServ.authorizeSubscribe = authorizeSubscribe;
    // })
});


mongoose.connection.once('open', function() {

    console.log('Database connection made successfully.');
    app.use('/uploads/', express.static(path.join(__dirname, 'uploads')));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //app.use(cookieParser());

    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'data')));
    app.use("/public", express.static(__dirname + "/public/"));
    app.use(express.static('ui'));
    app.post('/*', route);
    app.get('/*', route);
    app.get('*', (req, res) => {
        res.send(path.join(__dirname, 'ui'));
    });
    app.post('*', (req, res) => {
        res.send(path.join(__dirname, 'ui'));
    });
    app.use(function(req, res, next) {});

    if (app.get('env') == 'development') {
        app.use(function(res, req, next) {
            res.status(err.status || 500);
            res.rander('page_404.html');
        });
    }

    app.use(function(res, req, next) {
        console.log(err);
        res.status(err.status || 500);
        // res.json({asd:'asd1'})
        res.rander('page_404.html');
        next(err);
    });

    app.use(function(error, res, req, next) {
        // req.json({error:error})
        // req.status(500).json({ error: error.message })
        // next(err);
    });

});
mongoose.connection.on('error', function(err) {
    console.log('Database connection dropped, due to ' + err);
    // proecss.exit();
});