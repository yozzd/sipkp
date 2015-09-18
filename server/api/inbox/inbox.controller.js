'use strict';

var sqldb = require('../../sqldb');
var Inbox = sqldb.Inbox;

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

// Gets a list of Inboxs
exports.index = function (req, res) {
    Inbox.findAll()
        .then(responseWithResult(res))
        .catch(handleError(res));
};