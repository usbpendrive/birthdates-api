'use strict';

require('dotenv').config();
const config = require('./app/config/configs')();
const restify = require('restify');
const versioning = require('restify-url-semver');
const joi = require('joi');

const serviceLocator = require('./app/config/di');
const validator = require('./app/lib/validator');
const handler = require('./app/lib/error_handler');
const routes = require('./app/routes/routes');
const logger = serviceLocator.get('logger');

const server = restify.createServer({
    name: config.app.name,
    version: ['1.0.0'],
    formatters: {
        'application/json': require('./app/lib/jsend')
    }
});

const Database = require('./app/config/database');
new Database(config.mongo.user, config.mongo.password, config.mongo.host, config.mongo.name);

server.pre(restify.pre.sanitizePath());
server.pre(versioning({prefix: '/'}));

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

server.use(
    restify.plugins.bodyParser({
        mapParams: false
    })
);

server.use(validator.paramValidation(logger, joi));
handler.register(server);
routes.register(server, serviceLocator);

server.listen(config.app.port, () => {
    console.log(`${config.app.name} Server is running on port - ${config.app.port}`);
});
