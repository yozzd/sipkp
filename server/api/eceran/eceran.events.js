/**
 * Eceran model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Eceran = require('../../sqldb').Eceran;
var EceranEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EceranEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Eceran.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EceranEvents.emit(event + ':' + doc._id, doc);
    EceranEvents.emit(event, doc);
    done(null);
  }
}

module.exports = EceranEvents;
