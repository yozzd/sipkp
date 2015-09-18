/**
 * Produsen model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Produsen = require('../../sqldb').Produsen;
var ProdusenEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProdusenEvents.setMaxListeners(0);

// Model events
var events = {
    'afterCreate': 'save',
    'afterUpdate': 'save',
    'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
    var event = events[e];
    Produsen.hook(e, emitEvent(event));
}

function emitEvent(event) {
    return function (doc, options, done) {
        ProdusenEvents.emit(event + ':' + doc._id, doc);
        ProdusenEvents.emit(event, doc);
        done(null);
    }
}

module.exports = ProdusenEvents;