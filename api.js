var express = require('express');
const https = require('https');
var config = require('./config');
var service = require('./services/APIService');
const app = express()
const port = 8443

app.get('/players', service.getPlayers);
app.get('/games', service.getGames);
app.get('/results', service.getAllResults);

//listen on port ending in 443 because of https
app.listen(port, () =>{
    console.log("Listening on port " + port);
})