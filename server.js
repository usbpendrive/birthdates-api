'use strict';

require('dotenv').config();
const config = require('./app/config/configs')();
const restify = require('restify');
const versioning = require('restify-url-semver');

const server = restify.createServer({
    name: config.app.name,
    version: ['1.0.0'],
    formatters: {
        'application/json': require('./app/lib/jsend')
    }
});

server.pre(restify.pre.sanitizePath());
server.pre(versioning({prefix: '/'}));

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

server.use(
    restify.plugins.bodyParser({
        mapParams: false
    })
);

server.listen(config.app.port, () => {
    console.log(`${config.app.name} Server is running on port - ${config.app.port}`);
});