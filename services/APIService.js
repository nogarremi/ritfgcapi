var seq = require('../models/seq');
var players = seq.import('../models/players');
var games = seq.import('../models/games');
var results = seq.import('../models/results');

exports.getPlayers = function(req, res) {
    players.findAll()
    .then(p => {
        if(!p) {
            return res.status(400).send({
                message: "No Players found!"
            })
        }

        return res.status(200).send({
            players: p
        })
    })
}

exports.getGames = function(req, res) {
    games.findAll()
    .then(g => {
        if(!g) {
            return res.status(400).send({
                message: "No Games found!"
            })
        }

        return res.status(200).send({
            games: g
        })
    })
}

exports.getAllResults = function(req, res) {
    results.findAll()
    .then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No Games found!"
            })
        }

        return res.status(200).send({
            results: r
        })
    })
}