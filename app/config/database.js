'use strict';

const serviceLocator = require('../lib/service_locator');
const logger = serviceLocator.get('logger');

class Database {
    constructor(user, password, host, name) {
        this.mongoose = serviceLocator.get('mongoose');
        this._connect(user, password, host, name);
    }

    _connect(user, password, host, name) {
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(`mongodb://${user}:${password}@${host}/${name}`);
        const {connection} = this.mongoose;
        connection.on('connected', () =>
            logger.info('Database Connection was successful')
        );
        connection.on('error', (err) =>
            logger.info('Database connection Failed' + err)
        );
        connection.on('disconnected', () =>
            logger.info('Database Connection Disconnected')
        );
        process.on('SIGINT', () => {
            connection.close();
            logger.info('Database connection was closed due to NodeJS process termination');
            process.exit(0);
        });

        require('../models/Users');
    }
}

module.exports = Database;