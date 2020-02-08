const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const bodyParser = require('body-parser')
var config = require('./config');
var service = require('./services/APIService');

const app = express()

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

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

app.get('/players', service.getPlayers);
app.get('/games', service.getGames);
app.get('/results', service.getAllResults);
app.get('/results/:semester_ID/', service.getSemesterResults);
app.get('/results/:semester_ID/:game_ID', service.getTopThreeResults);
app.get('/results/:semester_ID/:game_ID/:player_ID', service.getPlacementResults);

module.exports.handler = serverless(app);