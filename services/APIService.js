var seq = require('../models/seq');
var semesters = seq.import('../models/semesters');
var games = seq.import('../models/games');
var players = seq.import('../models/players');
var placements = seq.import('../models/placements');
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
        include:[{
            model: placements,
            where: {
                semester_ID: req.params.semester_ID
            }
        }]
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
            semester_ID: req.params.semester_ID,
            game_ID: req.params.game_ID,
            player_ID: req.params.player_ID
        }
    }).then(p => {
        if(!p) {
            return res.status(400).send({
                message: "No results found!"
            })
        }

        return res.status(200).send({
            placements: p
        })
    })
}

exports.getTopThreeResults = function(req, res) {
    results.findAll({
        include:{
            model: placements,
            where: {
                semester_ID: req.params.semester_ID,
                game_ID: req.params.game_ID
            },
            include:{
                model: players
            }
        }
    }).then(r => {
        if(!r) {
            return res.status(400).send({
                message: "No results found!"
            })
        }
        var totals = {};
        var placements = {};
        r.forEach(item => {
            if(totals[item.placement.player.player_Handle] == null) {
                totals[item.placement.player.player_Handle] = item.ranbat_score;
            }
            else {
                totals[item.placement.player.player_Handle] = totals[item.placement.player.player_Handle] + item.ranbat_score;
            }
            
            var places = [item.placement.tour_1, item.placement.tour_2, item.placement.tour_3, item.placement.tour_4, item.placement.tour_5, item.placement.tour_6, item.placement.tour_7, item.placement.tour_8, item.placement.tour_9, item.placement.tour_10, item.placement.tour_11, item.placement.tour_12, item.placement.tour_13, item.placement.tour_14, item.placement.tour_15, item.placement.tour_16];
            
            var places_clean = places.filter(function(e){return e})
            var avg_place = places_clean.reduce((a, b) => (a + b)) / places_clean.length;
            
            placements[item.placement.player.player_Handle] = [places, avg_place];
        })
        
        var keys_sorted = Object.keys(totals).sort(function(a,b){return totals[b]-totals[a]})

        var final_obj = {};
        keys_sorted.forEach(key => {
            final_obj[key] = [totals[key], placements[key]];
        })

        return res.status(200).send({
            results: final_obj
        })
    })
}