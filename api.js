const express = require('express'); // Runs a REST API
const serverless = require('serverless-http'); // Makes the REST API run without a webserver
const fs = require('fs'); // IDK Jason should write a comment here
const bodyParser = require('body-parser'); // IDK Jason should write a comment here 
var config = require('./config'); // This is our super secret info
var service = require('./services/APIService'); // Holder for all our awesome functions

// This holds our application
const app = express()

// IDK Jason should write a comment here
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// IDK Jason should write a comment here
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    if(req.method === 'OPTIONS'){
        res.status(204).send();
    }else{
        next();
    }
})

// API endpoints
// Essentially this is the ending of urls to reach our resources
app.get('/players', service.getPlayers);
app.get('/games', service.getGames);
app.get('/results', service.getAllResults);
app.get('/results/:semester_ID/', service.getSemesterResults);
app.get('/results/:semester_ID/:game_ID', service.getTopThreeResults);
app.get('/results/:semester_ID/:game_ID/:player_ID', service.getPlacementResults);

// Let serverless do its thing
module.exports.handler = serverless(app);