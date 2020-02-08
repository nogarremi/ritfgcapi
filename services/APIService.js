var seq = require('../models/seq');
var players = seq.import('../models/players');
var games = seq.import('../models/games');
var placements = seq.import('../models/placements');
var semesters = seq.import('../models/semesters');
var results = seq.import('../models/results');
var _ = require('underscore');
var fs = require('fs');
var config = require('../config');

results.belongsTo(placements, {foreignKey: 'placement_ID'});
placements.belongsTo(games, {foreignKey: 'game_ID'});
placements.belongsTo(players, {foreignKey: 'player_ID'});
placements.belongsTo(semesters, {foreignKey: 'semester_ID'});
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

exports.getSemesterResults = function(req, res) {
        results.findAll({
        where: {
            semester_ID: req.params.semester_ID
        }
    }).then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No results found!"
            })
        }

        return res.status(200).send({
            results: r
        })
    })
}

exports.getPlacementResults = function(req, res) {
    placements.findAll({
        where: {
            semester_ID: req.params.semester_ID
            game_ID: req.params.game_ID
            player_ID: req.params.player_ID
        },
        include: [games, players]
    }).then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No results found!"
            })
        }

        return res.status(200).send({
            results: r
        })
    })
}

exports.getTopThreeResults = function(req, res) {
    results.findAll({
        where: {
            semester_ID: req.params.semester_ID,
            game_ID: req.params.game_ID
        },
        include: [placements, games, players]
    }).then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No results found!"
            })
        }
        var totals = {};
        r.forEach(item => {
            if(totals[item.player.player_Handle] == null) {
                totals[item.player.player_Handle] = item.ranbat_score;
            }
            else {
                totals[item.player.player_Handle] = totals[item.player.player_Handle] + item.ranbat_score;
            }
        })
        
        var keys_sorted = Object.keys(totals).sort(function(a,b){return totals[b]-totals[a]})

        var final_obj = {};
        keys_sorted.forEach(key => {
            final_obj[key] = totals[key];
        })

        return res.status(200).send({
            results: final_obj
        })
    })
}