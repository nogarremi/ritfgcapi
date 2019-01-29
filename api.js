var express = require('express');
const https = require('https');
var config = require('./config');
var bodyParser = require('body-parser')
var service = require('./services/APIService');


const app = express()
const port = 8080

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//Handling pre-flight requests
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
app.get('/results/:game_ID', service.GetGameTopThreeResults);
app.post('/email', service.sendEmail);

//listen on port ending in 443 because of https
app.listen(port, () =>{
    console.log("Listening on port " + port);
})