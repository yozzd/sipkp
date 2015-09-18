/**
 * Grosir model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Grosir = require('../../sqldb').Grosir;
var GrosirEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GrosirEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Grosir.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    GrosirEvents.emit(event + ':' + doc._id, doc);
    GrosirEvents.emit(event, doc);
    done(null);
  }
}

module.exports = GrosirEvents;
