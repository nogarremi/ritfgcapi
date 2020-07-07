var seq = require('../models/seq'); // Connects to our database
var semesters = seq.import('../models/semesters'); // Sequelized version of semesters
var games = seq.import('../models/games'); // Sequelized version of semesters
var players = seq.import('../models/players'); // Sequelized version of players
var placements = seq.import('../models/placements'); // Sequelized version of placements
var results = seq.import('../models/results'); // Sequelized version of results
var _ = require('underscore'); // IDK Jason should write a comment here
var fs = require('fs'); // IDK Jason should write a comment here
var config = require('../config'); // This is our super secret info

// Our connections between the tables
results.belongsTo(placements, {foreignKey: 'placement_ID'});
placements.belongsTo(games, {foreignKey: 'game_ID'});
placements.belongsTo(players, {foreignKey: 'player_ID'});
placements.belongsTo(semesters, {foreignKey: 'semester_ID'});

// Get the players
exports.getPlayers = function(req, res) {
    // SELECT * FROM players
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

// Get all the games
exports.getGames = function(req, res) {
    // SELECT * FROM games
    games.findAll()
    .then(g => {
        if(!g) {
            return res.status(400).send({
                message: "No Games found!"
            })
        }

        // Send data as is
        return res.status(200).send({
            games: g
        })
    })
}

// Get all the results
exports.getAllResults = function(req, res) {
    // SELECT * FROM placements
    placements.findAll()
    .then(p => {
        if(!p) {
            return res.status(400).send({
                message: "No Games found!"
            })
        }

        // Send data as is
        return res.status(200).send({
            placements: p
        })
    })
}

// Get results based on the semester
exports.getSemesterResults = function(req, res) {
    // SELECT * FROM placements WHERE placements.semester_ID = %s
    placements.findAll({
        where: {
            semester_ID: req.params.semester_ID
        }
    }).then(p => {
        if(!p) {
            return res.status(400).send({
                message: "No results found!"
            })
        }
        
        // Send data as is
        return res.status(200).send({
            placements: p
        })
    })
}

// Get the tournament game's placings for a person
exports.getPlacementResults = function(req, res) {
    // SQL statement
    /* 
     * SELECT * FROM placements WHERE placements.semester_ID = %s AND placements.game_ID = %s AND placements.player_ID = %s;
     */
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
        
        // Send data as is
        return res.status(200).send({
            placements: p
        })
    })
}

// This method name is bad
// This method returns a map[player name] = [points, [placings, average]]
exports.getTopThreeResults = function(req, res) {
    // This is basically a sql statement
    /* 
     * SELECT * FROM results INNER JOIN placements ON placements.placement_ID = results.placement_ID
     * INNER JOIN players ON players.player_ID = placements.player_ID
     * WHERE placements.semester_ID = %s AND placements.game_ID = %s;
     */
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
        var totals = {}; // Map for sorting by points
        var placements = {}; // Map for everyting else, so that the sorting doesn't mess up
        
        // forEach result get the ranbat points and placements
        r.forEach(item => {
            // IDK Jason should write a comment here
            if(totals[item.placement.player.player_Handle] == null) {
                totals[item.placement.player.player_Handle] = item.ranbat_score;
            }
            else {
                totals[item.placement.player.player_Handle] = totals[item.placement.player.player_Handle] + item.ranbat_score;
            }
            
            // All the tournament placements
            var places = [item.placement.tour_1, item.placement.tour_2, item.placement.tour_3, item.placement.tour_4, item.placement.tour_5, item.placement.tour_6, item.placement.tour_7, item.placement.tour_8, item.placement.tour_9, item.placement.tour_10, item.placement.tour_11, item.placement.tour_12, item.placement.tour_13, item.placement.tour_14, item.placement.tour_15, item.placement.tour_16];
            
            // Remove the nulls
            var places_clean = places.filter(function(e){return e});
            // Averages the version with the no nulls
            var avg_place = places_clean.reduce((a, b) => (a + b)) / places_clean.length;
            
            placements[item.placement.player.player_Handle] = [places, avg_place];
        })
        
        // Sorts the points
        var keys_sorted = Object.keys(totals).sort(function(a,b){return totals[b]-totals[a]})

        // Put all the data together
        var final_obj = {};
        keys_sorted.forEach(key => {
            final_obj[key] = [totals[key], placements[key]];
        })

        // Send the data out
        return res.status(200).send({
            results: final_obj
        })
    })
}