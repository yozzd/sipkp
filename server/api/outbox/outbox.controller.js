'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Outbox = sqldb.Outbox;

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

// Creates a new Outbox in the DB
exports.create = function (req, res) {
    Outbox.sync()
        .then(function () {
            return Outbox.destroy({
                where: {}
            })
        })
        .then(function () {
            var created = [];
            _.each(req.body.telp, function (value) {
                req.body.DestinationNumber = value.toString();
                req.body.TextDecoded = req.body.sms;
                req.body.CreatorID = 'Gammu';
                Outbox.create(req.body).then(function (outbox) {
                    created.push(outbox);
                });
            })
            return created;
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};