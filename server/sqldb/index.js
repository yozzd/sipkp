/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
    Sequelize: Sequelize,
    sequelize: new Sequelize(config.sequelize.database, config.sequelize.user, config.sequelize.password, config.sequelize.options)
};

// Insert models below
db.Outbox = db.sequelize.import('../api/outbox/outbox.model');
db.Inbox = db.sequelize.import('../api/inbox/inbox.model');
db.Eceran = db.sequelize.import('../api/eceran/eceran.model');
db.Grosir = db.sequelize.import('../api/grosir/grosir.model');
db.Produsen = db.sequelize.import('../api/produsen/produsen.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;