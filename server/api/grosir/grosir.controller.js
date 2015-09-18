'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var moment = require('moment');
moment.locale('id');

var Grosir = sqldb.Grosir;

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

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        return entity.updateAttributes(updates)
            .then(function (updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.destroy()
                .then(function () {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Grosirs
exports.index = function (req, res) {
    Grosir.findAll()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Grosir from the DB
exports.show = function (req, res) {
    Grosir.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Grosir in the DB
exports.create = function (req, res) {
    req.body.receiveddate = new Date(req.body.tanggal);
    req.body.receivedtime = new Date().toLocaleTimeString();
    Grosir.findAll()
        .then(function (grosir) {
            return _.find(grosir, function (value) {
                return value.sender === req.body.sender && moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(req.body.tanggal)).format('YYYY-MM-DD');
            })
        })
        .then(function (find) {
            if (_.isUndefined(find)) {
                return Grosir.create(req.body).then(function (created) {
                    return created;
                });
            } else {
                throw 'Data untuk tanggal "' + moment(new Date(req.body.tanggal)).format('DD MMMM YYYY') + '" sudah terdaftar di database';
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
};

// Updates an existing Grosir in the DB
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Grosir.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Grosir from the DB
exports.destroy = function (req, res) {
    Grosir.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};