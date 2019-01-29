var seq = require('../models/seq');
var players = seq.import('../models/players');
var games = seq.import('../models/games');
var results = seq.import('../models/results');
var _ = require('underscore');
var fs = require('fs');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config');

//var email_path = './views/email_template.html'
var email_path = '/home/ec2-user/api/ritfgcapi/views/email_template.html'

results.belongsTo(games, {foreignKey: 'game_ID'});
results.belongsTo(players, {foreignKey: 'player_ID'});
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

exports.GetGameTopThreeResults = function(req, res) {
    results.findAll({
        where: {
            game_ID: req.params.game_ID
        },
        include: [games, players]
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

exports.sendEmail = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var comment = req.body.comment;

    var model = {
        name: name,
        email: email,
        comment: comment
    }

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
            user: config.smtp_user,
            pass: config.smtp_pass
        }
    }));

    var mailOptions = {
        from: email,
        to: 'jgreaves62@gmail.com',
        subject: 'RIT FGC Contact Message',
        html: getHtmlMessage(model)
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            console.log(err);
            return err;
        }

        console.log(info.response);
        return res.status(200).send({
            message: info.response
        })
    });

}

function getHtmlMessage(model) {
    var html = fs.readFileSync(email_path, 'utf8');
    var template = _.template(html);

    return template(model);
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};